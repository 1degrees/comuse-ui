/*
 * @Author: Yue·jian
 * @Date: 2021-02-26 18:34:08
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-04-14 11:04:43
 * @Description: 文件用途描述
 */

/* 校验策略 */
export const CHECK_STRATEGY = {
    require: (val: any, option?: any) => {
        console.log(option)
        if (Array.isArray(val)) {
            return !!val.length;
        } else if (typeof val === 'boolean' || typeof val === 'number') {
            return true;
        } else {
            return !!val;
        }
    },
    number: (val: any, option?: any) => {
        console.log(option)
        return val !== undefined ? typeof val === 'number' : true;
    },
    length: (val: string, option?: any) => {
        let { max, min } = option;
        let rs = true;
        if (val) {
            if (max) {
                rs = rs && val.length <= max;
            }
            if (min) {
                rs = rs && val.length >= min;
            }
        }
        return rs;
    },
    time: (val: string, option?: any) => {
        console.log(option)
        const reg = /^(\d*-){0,1}(\d*-){0,1}(\d*\s){0,1}(\d{1,2}:){0,1}(\d{1,2}:){0,1}(\d{1,2})$/;
        return val ? reg.test(val) : true;
    },
    isFace: (val: string, option?: any) => {
        console.log(option)
        const reg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;
        return val ? reg.test(val) : true;
    },
    isSymbol: (val: string, option?: any) => {
        console.log(option)
        const reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
        return val ? reg.test(val) : true;
    },
};

/* 校验策略枚举 */
export type IStrategyKey = keyof typeof CHECK_STRATEGY;

/* 
 *  @function 用于校验表单提交的数据
 *  @params(data)  校验规则
 *  @params(rules) 校验规则
 */
export function checkValids(data: any, rules: any): any[] {
    const vailds: any[] = [];
    function valid(keys: string[], data: any, rules: any) {
        type IKeys = keyof typeof rules;
        // eslint-disable-next-line guard-for-in
        for (let key in rules) {
            const _rules = rules[key as IKeys];
            // 判断是否是校验规则
            if (Array.isArray(_rules)) {
                for (let rule of _rules) {
                    let { type, callback, match, msg, ...options } = rule;
                    let kk = [...keys, key].join('.');
                    let val: any;
                    try {
                        // eslint-disable-next-line no-eval
                        val = eval(`data.${kk}`);
                    } catch (e) {
                        console.warn(`表单字段 data.${kk} 不存在，无法校验`);
                        return;
                    }
                    if (type) {
                        let func = CHECK_STRATEGY[type as IStrategyKey];
                        if (!func) {
                            console.warn('无匹配的校验规则');
                        } else if (!func(val, options)) {
                            vailds.push(msg);
                            return;
                        }
                    } else if (match && match instanceof RegExp) {
                        if (!match.test(val)) {
                            vailds.push(msg);
                            return;
                        }
                    } else if (callback) {
                        let err = callback(val);
                        if (err) {
                            vailds.push(err);
                            return;
                        }
                    }
                }
            } else {
                /* 递归校验子属性 */
                valid([...keys, key], data, _rules);
            }
        }
    }
    valid([], data, rules);
    return vailds;
}
