/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-param-reassign */
/*
 * @Author: Yue·jian
 * @Date: 2021-01-14 11:04:29
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-01-15 16:35:22
 * @Description: 文件用途描述
 */
import { IOption, IValues } from './types';

/*
 * @function 根据选中节点 深度遍历查找所有的父节点-逆序
 * @param options 树形数据
 * @param option 选中节点
 */
export function findParents(
    options: IOption[],
    option: IOption,
    parents?: IOption[],
    rs?: IOption[]
) {
    parents = parents || [];
    rs = rs || [];
    for (let i = 0; i < options.length; i++) {
        const item = options[i];
        const ps = [...parents, item] as IOption[];
        if (option.label === item.label && option.value === item.value) {
            rs.push(...ps);
            break;
        } else if (item.children && item.children.length) {
            findParents(item.children, option, ps, rs);
        }
    }
    return rs;
}

/*
 * @function 根据value 深度遍历查找树形数据中的 option
 * @param options 树形数据
 * @param value 数值
 */
export function findOptionByValue(options: IOption[], value: IValues, rs?: IOption[]) {
    rs = rs || [];
    for (let i = 0; i < options.length; i++) {
        const item = options[i];
        if (Array.isArray(value) && value.includes(item.value)) {
            rs.push(item);
        } else if (value === item.value) {
            rs.push(item);
        } else if (item.children && item.children.length) {
            findOptionByValue(item.children, value, rs);
        }
    }
    return rs;
}

/*
 * @function 根据选中节点 单层遍历查找是否存在节点
 * @param options 树形数据
 * @param option 选中节点
 */
export function includeBy(options: IOption[], option: IOption) {
    let flag = false;
    for (let i = 0; i < options.length; i++) {
        const item = options[i];
        if (option.label === item.label && option.value === item.value) {
            flag = true;
            break;
        }
    }
    return flag;
}
