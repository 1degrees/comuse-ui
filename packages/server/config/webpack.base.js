const path = require('path');
const argv = require('yargs').argv;
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./config');
// const getClientEnvironment = require('./env');
const bundleAnalyzerReport = argv.report;
// const env = getClientEnvironment(config.publicPath);
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

module.exports = merge(webpackConfig, {
  devtool: 'cheap-module-source-map',
  entry: {
    app: './server/template/index.tsx',
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
        oneOf: [
          {
            test: /\.(html)$/,
            loader: 'html-loader'
          },
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
                
                loader: 'awesome-typescript-loader',
                options: {
                  silent: true
                }
              }
            ]
          },
          {
            test: /\.(sass|css)$/,
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                options: {
                  modules: false
                }
              },
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: { javascriptEnabled: true }
              }
            ]
          },
          {
            test: /\.(less|css)$/,
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                options: {
                  modules: false
                }
              },
              'postcss-loader',
              {
                loader: 'less-loader',
                options: { javascriptEnabled: true }
              }
            ]
          },
          {
            test: /\.svg$/,
            use: ['@svgr/webpack']
          },
          {
            test: /\.(jpg|jpeg|bmp|png|webp|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: 'img/[name].[hash:8].[ext]',
              outputPath: config.assetsDirectory,
              publicPath: config.assetsRoot
            }
          },
          {
            exclude: [/\.(js|mjs|ts|tsx|less|css|jsx)$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: 'media/[path][name].[hash:8].[ext]',
              outputPath: config.assetsDirectory,
              publicPath: config.assetsRoot
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: {
      '@comuse/components': path.resolve(__dirname, '../../packages/components'),
      '@comuse/shared': path.resolve(__dirname, '../../packages/shared'),
      '@comuse/theme': path.resolve(__dirname, '../../packages/theme'),
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
    // // 在js代码中能够使用环境变量(demo: process.env.NODE_ENV === 'production')
    // new webpack.DefinePlugin(env.stringified),
    // new CopyWebpackPlugin([
    //   {
    //     from: 'public',
    //     ignore: ['index.html']
    //   }
    // ])
  ],
  optimization: {}
});
