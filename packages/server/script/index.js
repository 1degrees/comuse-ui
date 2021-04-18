/*
 * @Author: Yue·jian
 * @Date: 2021-04-14 12:54:05
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-04-18 22:23:00
 * @Description: 文件用途描述
 */
const yargs = require('yargs');
const genStartDemo = require('./commands/genStartDemo');
const startDocz = require('./commands/startDocz');

module.exports = bootstrap = async (injections) => {
  return yargs
    .command(
      'dev',
      '启动开发环境',
      yargs => {
        return yargs
          .option('port', {
            type: 'number',
            alias: 'p',
            default: '8080',
          });
      },
      async argv => {
        console.log(argv);
        await genStartDemo(injections, argv);
        await startDocz(injections, argv);
        process.exit();
      },
    )
    .demandCommand()
    .help()
    .wrap(72)
    .epilog('for more information visit http://manual.k8s-new.qunhequnhe.com/baozheng')
    .showHelpOnFail(false, 'whoops, something went wrong! run with --help').argv;
};
