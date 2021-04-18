/*
 * @Author: Yue·jian
 * @Date: 2020-07-03 10:08:45
 * @LastEditors: Yue·jian
 * @LastEditTime: 2020-07-03 16:47:04
 * @Description: 文件用途描述
 */
import React from 'react';
import { IReducer, IAction, IContext } from './type';
export const LoadingContext = React.createContext<IContext>({
    state: undefined,
    dispatch: () => {}
});
export function reducer(state: IReducer, action: IAction) {
    switch (action.type) {
        case 'setGlobalLoading':
            return { ...state, globalLoading: action.payload };
        case 'setLoading':
            return { ...state, loading: action.payload };
        default:
            throw new Error();
    }
}
export default LoadingContext;
