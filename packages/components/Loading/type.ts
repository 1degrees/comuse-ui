/*
 * @Author: Yue·jian
 * @Date: 2020-07-02 19:59:27
 * @LastEditors: Yue·jian
 * @LastEditTime: 2020-07-03 18:43:23
 * @Description: 文件用途描述
 */
import { Dispatch } from 'react';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export interface ILoadingProp {
    timeout: number /* loading超时关闭时间 */;
    pluto: any /* 请求器 */;
    plutoConfig: any /* 请求器配置,由于Pluto封装限制,妥协用来合并拦截器 */;
    isGlobal: boolean /* 是否开启全局loading */;
    children?: React.ReactNode | React.FC;
}

export interface IAction {
    type: string;
    payload: any;
}

export interface IReducer {
    globalLoading: boolean;
    loading: boolean;
}
export interface IContext {
    state?: IReducer;
    dispatch: Dispatch<IAction>;
}

export interface IinterceptorsMgr {
    request?: Iinterceptors<AxiosRequestConfig, AxiosError>;
    response?: Iinterceptors<AxiosResponse, AxiosError>;
}

export interface Iinterceptors<V, T> {
    onFulfilled?: (value: V) => V | Promise<V>;
    onRejected?: (value: T) => T | Promise<T>;
}
