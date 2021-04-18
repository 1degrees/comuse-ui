/*
 * @Author: Yue·jian
 * @Date: 2020-07-03 11:09:04
 * @LastEditors: Yue·jian
 * @LastEditTime: 2020-07-06 10:22:04
 * @Description: 用于pluto拦截loading状态管理并合并前置pluto配置，
 * 这里由于Pluto不支持动态添加拦截只能采用合并的方式解决多拦截器问题
 */
import * as _ from 'lodash';
import { IinterceptorsMgr } from './type';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
/**
 * 合并拦截器函数
 * @param {IinterceptorsMgr} obj1
 * @param {IinterceptorsMgr} obj2
 * @returns {IinterceptorsMgr}
 */
function mergeInterceptor(obj1: IinterceptorsMgr, obj2: IinterceptorsMgr): IinterceptorsMgr {
    const interceptor: IinterceptorsMgr = {
        request: {
            onFulfilled: (config: AxiosRequestConfig) => {
                if (obj1?.request?.onFulfilled) {
                    obj1?.request?.onFulfilled(config);
                }
                if (obj2?.request?.onFulfilled) {
                    obj2?.request?.onFulfilled(config);
                }
                return Promise.resolve(config);
            },
            onRejected: (error: AxiosError) => {
                if (obj1?.request?.onRejected) {
                    obj1?.request?.onRejected(error);
                }
                if (obj2?.request?.onRejected) {
                    obj2.request.onRejected(error);
                }
                return Promise.reject(error);
            }
        },
        response: {
            onFulfilled: (response: AxiosResponse) => {
                if (obj1?.response?.onFulfilled) {
                    obj1?.response?.onFulfilled(response);
                }
                if (obj2?.response?.onFulfilled) {
                    obj2?.response?.onFulfilled(response);
                }
                return Promise.resolve(response);
            },
            onRejected: (error: AxiosError) => {
                if (obj1?.response?.onRejected) {
                    obj1?.response?.onRejected(error);
                }
                if (obj2?.response?.onRejected) {
                    obj2.response.onRejected(error);
                }
                return Promise.reject(error);
            }
        }
    };
    return interceptor;
}

export default function interceptor(
    dispatch: Function,
    pluto: any,
    plutoConfig: any,
    isGlobal: boolean,
    timeout: number
) {
    /* loading状态管理对象 */
    const loadingMrg = {
        gCount: 0 /* 计数同一时间发生请求数，避免loading打开关闭错乱 */,
        count: 0 /* 同上 */,
        openGlobalLoading: () => {
            loadingMrg.gCount += 1;
            if (loadingMrg.gCount === 1) {
                dispatch({ type: 'setGlobalLoading', payload: true });
                /* loading超时未关闭，强制关闭 */
                setTimeout(() => {
                    if (loadingMrg.gCount > 0) {
                        loadingMrg.gCount = 1;
                        loadingMrg.closeGlobalLoading();
                    }
                }, timeout * 1000);
            }
        },
        closeGlobalLoading: () => {
            loadingMrg.gCount -= 1;
            if (loadingMrg.gCount <= 0) {
                dispatch({ type: 'setGlobalLoading', payload: false });
            }
        },
        openLoading: () => {
            loadingMrg.count += 1;
            if (loadingMrg.count === 1) {
                dispatch({ type: 'setLoading', payload: true });
                /* loading超时未关闭，强制关闭 */
                setTimeout(() => {
                    if (loadingMrg.count > 0) {
                        loadingMrg.count = 1;
                        loadingMrg.closeLoading();
                    }
                }, timeout * 1000);
            }
        },
        closeLoading: () => {
            loadingMrg.count -= 1;
            if (loadingMrg.count <= 0) {
                loadingMrg.count = 0;
                dispatch({ type: 'setLoading', payload: false });
            }
        }
    };
    /* axios拦截活动-关联loading */
    const loadingInterceptor = {
        request: {
            onFulfilled: (config: AxiosRequestConfig) => {
                const force = config?.headers?.globalLoading;
                if (force) {
                    loadingMrg.openGlobalLoading();
                } else if (isGlobal && force === undefined) {
                    loadingMrg.openGlobalLoading();
                }
                loadingMrg.openLoading();
                return Promise.resolve(config);
            }
        },
        response: {
            onFulfilled: (response: AxiosResponse) => {
                const force = response?.config?.headers?.globalLoading;
                if (force) {
                    loadingMrg.closeGlobalLoading();
                } else if (isGlobal && force === undefined) {
                    loadingMrg.closeGlobalLoading();
                }
                loadingMrg.closeLoading();
                return Promise.resolve(response);
            },
            onRejected: (error: AxiosError) => {
                const force = error?.config?.headers?.globalLoading;
                if (force) {
                    /* 强制开启全局loading */
                    loadingMrg.closeGlobalLoading();
                } else if (isGlobal && force === undefined) {
                    /* 未设置强制，全局开启设置loading */
                    loadingMrg.closeGlobalLoading();
                }
                loadingMrg.closeLoading();
                return Promise.reject(error);
            }
        }
    };
    /* 合并全局axios配置 */
    const intercept = mergeInterceptor(
        plutoConfig[1] as IinterceptorsMgr,
        loadingInterceptor as IinterceptorsMgr
    );
    /* axios初始化 */
    pluto.init(plutoConfig[0], intercept);
}
