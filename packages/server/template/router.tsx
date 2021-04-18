/*
 * @Author: Yue·jian
 * @Date: 2021-04-08 14:45:49
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-04-18 18:02:20
 * @Description: 文件用途描述
 */
import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router';
import config from './router-config';
interface IRouterConfig {
  [key: string]: React.ComponentType
}
const history = createBrowserHistory();

export function Root(props: any) {
  const { children } = props;
  return <div>{children}</div>
}

export default function App(){
  const routes: IRouterConfig = config as IRouterConfig;
  const keys = Object.keys(routes);
  return (
    <Router history={history}>
      {keys.map((e: string, i: number) => {
        return <Route key={i} path={`/${e}`} component={routes[e]} />
      })}
    </Router>
  )
}