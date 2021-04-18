/*
 * @Author: Yue·jian
 * @Date: 2021-04-14 12:54:05
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-04-14 14:18:16
 * @Description: 文件用途描述
 */
const path = require('path');

module.exports = {
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsDirectory: 'static',
  publicPath: '/',
  indexPath: path.resolve(__dirname, '../public/index.html'),
  productionJsSourceMap: false,

  devServer: {
    port: 8080,
    host: 'localhost',
    contentBase: path.join(__dirname, '../public'),
    watchContentBase: true,
    publicPath: '/',
    compress: true,
    historyApiFallback: true,
    hot: true,
    clientLogLevel: 'error',
    open: false,
    overlay: false,
    quiet: false,
    noInfo: false,
    watchOptions: {
      ignored: /node_modules/
    },
    proxy: {}
  }
};
