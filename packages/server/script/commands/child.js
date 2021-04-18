/*
 * @Author: Yue·jian
 * @Date: 2021-04-18 18:06:21
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-04-18 22:25:12
 * @Description: 文件用途描述
 */
const rd = require('rd');
const path = require('path');
const fs = require('fs-extra')
const webpack = require('webpack')
const chokidar = require('chokidar');
const { debounce } = require('lodash');
const _ = require('underscore-contrib');
const logger = require('../utils/logger');
const WebpackDevServer = require("webpack-dev-server")
const promise = require('../../config/webpack.dev')

const watchDir = path.join(process.cwd(), 'packages');
const outRouterDir = path.join(watchDir, 'template/router-config.tsx');
// 生成demo模版
function genTmplate(list) {
    let ims = '';
    let rs = '';
    const genImport = (name, file) => {
        return `import ${name} from '${file}';\n`
    }
    const genRouter = (name, path) => {
        return `\n  '${path}': ${name},`
    };
    for(let i in list) {
        const fileName = list[i];
        const fns = fileName.split(/[\/\\\.]/);
        const index = fns.indexOf('demos');
        const name = fns[index - 1] + fns[index + 1].slice(0, 1);
        ims += genImport(name, `@comuse/${fns[index - 2]}/${fns[index - 1]}/${fns[index]}/${fns[index + 1]}`)
        rs += genRouter(name, name)
    }
    return ims + `const routes = {${rs}\n}\nexport default routes;\n`
};

// 导出demo模版
function exportFile() {
    rd.readFileFilterSync(watchDir, /demos.*\.tsx/, function(err, list) {
        const content = genTmplate(list);
        fs.writeFileSync(outRouterDir, content,)
    });
};
const exportRouter = debounce(() => exportFile(watchDir, outRouterDir), 1000);
exportFile(watchDir, outRouterDir);

chokidar.watch(
    watchDir, 
    {
        persistent: true,
        ignoreInitial: true
    }
)
.on('change', function(path) {
    if (path.indexOf('demos') !== -1) {
        exportRouter();
    }
})
logger.info('-----demos生产完成-----')

promise.then(config => {
    _.map(config.entry, function (value, key) {
        if (key === 'app') {
            config.entry[key] = [
                'webpack-dev-server/client?http://127.0.0.1:' + config.devServer.port + '/',
                'webpack/hot/dev-server',
                value
            ];
        }
    })
    config.output.publicPath = 'http://localhost:' + config.devServer.port
    config.plugins = (config.plugins || []).concat([
        new webpack.HotModuleReplacementPlugin(),
    ])
    const compiler = webpack(config)
    const server = new WebpackDevServer(compiler, config.devServer)
    server.listen(config.devServer.port, "127.0.0.1", function () {
        logger.info('Listening at http://localhost:' + config.devServer.port)
    })
    logger.info('-----demos启动中-----')
})