/*
 * @Author: Yue·jian
 * @Date: 2021-04-13 19:19:34
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-04-14 13:05:27
 * @Description: 文件用途描述
 */
const path = require('path');
const argv = require('yargs').argv;
const merge = require('webpack-merge');
const portfinder = require('portfinder');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('./config');
const bundleAnalyzerReport = argv.report;
const webpackConfig = {
  plugins: []
};
if (bundleAnalyzerReport) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
    reportFilename: path.join(config.assetsRoot, './report.html')
  }));
}

const devWebpackConfig = merge.smart(webpackConfig, {
  devtool: 'cheap-module-source-map',
  entry: {
    app: './packages/server/template/index.tsx',
    vendor: ['react', 'react-dom'] // 不变的代码分包
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: config.assetsRoot,
    publicPath: config.publicPath
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react',  // jsx支持
                ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 2 }] // 按需使用polyfill
              ],
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                ['@babel/plugin-proposal-class-properties', { 'loose': true }] // class中的箭头函数中的this指向组件
              ],
              cacheDirectory: true // 加快编译速度
            }
          },
          {
            loader: 'ts-loader',
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: {
      react: path.resolve(__dirname, '../../../node_modules/react'),
      '@comuse/components': path.resolve(__dirname, '../../components'),
      '@comuse/shared': path.resolve(__dirname, '../../shared'),
      '@comuse/theme': path.resolve(__dirname, '../../theme'),
    }
  },
  plugins: [
    // 清理打包目录
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: config.indexPath,
      showErrors: true
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: './server/public',
    //     ignore: ['index.html']
    //   }
    // ])
  ],
  optimization: {},
  devServer: {
    ...config.devServer
  },
});

module.exports = new Promise((resolve, reject) => {
  // 搜寻可用的端口号
  portfinder.basePort = config.devServer.port;
  portfinder.getPort((err, port) => {
    if (err) reject(err)
    else {
      devWebpackConfig.devServer.port = port;
    }
    resolve(devWebpackConfig)
  })
});
