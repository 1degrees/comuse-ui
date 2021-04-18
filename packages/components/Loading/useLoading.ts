/*
 * @Author: Yue·jian
 * @Date: 2020-07-03 10:05:06
 * @LastEditors: Yue·jian
 * @LastEditTime: 2020-07-03 17:03:35
 * @Description: 用于函数组件中自定义实现loading
 */
import { useContext } from 'react';
import { IContext } from './type';
import loadingContext from './loadingContext';

export function useLoading(): [boolean, Function] {
    const context = useContext<IContext>(loadingContext);
    const { state, dispatch } = context;
    function setLoading(flag: boolean) {
        dispatch({ type: 'setLoading', payload: flag });
    }
    return [state?.loading as boolean, setLoading];
}
