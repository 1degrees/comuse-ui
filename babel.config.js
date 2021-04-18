/*
 * @Author: Yue·jian
 * @Date: 2021-01-04 17:24:51
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-04-13 18:07:51
 * @Description: 文件用途描述
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: false,
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/proposal-class-properties', { loose: true }],
    ['@babel/proposal-object-rest-spread', { loose: true }],
    '@babel/plugin-transform-runtime',
    [
      'babel-plugin-styled-components',
      {
        ssr: false,
        fileName: false,
      },
    ],
    'babel-plugin-jsx-control-statements',
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
            useBuiltIns: false,
          },
        ],
      ],
      plugins: [
        [
          'module-resolver',
          {
            root: ['./'],
            alias: {
              '@comuse/components': './packages/components/src',
              '@comuse/shared': './packages/shared/src',
              '@comuse/theme': './packages/theme/src',
            },
          },
        ],
      ],
    },
    es: {
      plugins: [
        [
          'import',
          {
            libraryName: 'es',
            libraryDirectory: '@qunhe/towerstone-saas-components',
            camel2DashComponentName: false,
            style: name => `${name}.css`,
          },
        ],
      ],
    },
    cjs: {
      plugins: [
        [
          'import',
          {
            libraryName: 'lib',
            libraryDirectory: '@qunhe/towerstone-saas-components',
            camel2DashComponentName: false,
            style: name => `${name}.css`,
          },
        ],
      ],
    },
  },
};
