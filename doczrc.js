/*
 * @Author: Yue·jian
 * @Date: 2021-01-04 17:24:51
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-04-14 12:48:37
 * @Description: 文件用途描述
 */
import path from 'path';
import { css } from 'docz-plugin-css';
import { createPlugin } from 'docz-core';
import proxy from 'http-proxy-middleware';
import muyaRemarkPlugin from '@qunhe/baozheng-remark-plugin';
import muyaRehypePlugin from '@qunhe/baozheng-rehype-plugin';

const proxyPlugin = () =>
  createPlugin({
    onPreCreateApp: app => {
      app.use(
        ['/api', '/saas-data/api', '/useraccount/api', '/uic/api', '/bp/api', '/saas-account/api'],
        proxy({
          target: 'https://sit.kujiale.com',
          changeOrigin: true,
          headers: {},
          cookieDomainRewrite: {
            'kujiale.com': '127.0.0.1', // 本地调试 kjl 登陆
          },
        }),
      );
      app.use(
        ['/commercialization'],
        proxy({
          target: 'https://colorful-dev.qunhequnhe.com',
          changeOrigin: true,
          headers: {},
          cookieDomainRewrite: {
            'colorful-dev.qunhequnhe.com': '127.0.0.1', // 本地调试 kjl 登陆
          },
        }),
      );
    },
});

export default {
  codeSandbox: false,
  typescript: true,
  public: '/public',
  theme: '@qunhe/baozheng-docz-theme',
  themeConfig: {
    colors: {
      blackLight: '#232529',
      whiteLight: '#CCC',
    },
    logo: {
      light:
        '//qhstaticssl.kujiale.com/newt/23/image/png/1571225467035/708C2EE1345EFE5E03850336A48B5591.png',
      dark:
        '//qhstaticssl.kujiale.com/newt/23/image/png/1571225615286/E9608DA43C6389692DAAE8CD9B80BD2F.png',
      width: 180,
    },
  },
  propsParser: false,
  mdPlugins: [muyaRemarkPlugin],
  hastPlugins: [muyaRehypePlugin],
  modifyBundlerConfig: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...{
        '@comuse/components': path.resolve(__dirname, './packages/components'),
        '@comuse/shared': path.resolve(__dirname, './packages/shared'),
        '@comuse/theme': path.resolve(__dirname, './packages/theme'),
        test: path.resolve(__dirname, './test'),
        api: path.resolve(__dirname, './api'),
      },
    };
    return config;
  },
  plugins: [
    css(),
    css({
        preprocessor: 'sass',
        cssmodule: true
    }),
    css({
        preprocessor: 'less',
        cssmodule: true
    })
  ]
};
