import React, { useReducer, useEffect } from 'react';
import { ILoadingProp } from './type';
import interceptor from './Interceptor';
import LoadContext, { reducer } from './loadingContext';
import './index.scss';
const { Provider } = LoadContext;

function LoadingProvider(props: ILoadingProp) {
    const { pluto, plutoConfig, isGlobal, timeout } = props;
    const [state, dispatch] = useReducer(reducer, {
        globalLoading: false,
        loading: true
    });
    useEffect(() => {
        interceptor(dispatch, pluto, plutoConfig, isGlobal, timeout);
    }, [dispatch, pluto, plutoConfig, isGlobal, timeout]);
    return (
        <React.Fragment>
            <Provider value={{ state, dispatch }}>{props.children}</Provider>
            {state.globalLoading ? (
                <div className="loading">
                    <div className="loadbg" />
                    <div className="loader" />
                </div>
            ) : null}
        </React.Fragment>
    );
}
LoadingProvider.defaultProps = {
    timeout: 30
};
export default LoadingProvider;
