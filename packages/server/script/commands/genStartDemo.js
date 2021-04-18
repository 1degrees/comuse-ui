/*
 * @Author: Yue·jian
 * @Date: 2021-04-08 15:15:14
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-04-18 22:24:21
 * @Description: 文件用途描述
 */
const path = require('path');
const { fork } = require('child_process');

async function runCommand(injections, argv) {
    const { logger, pkgRoot } = injections;
    fork(path.join(pkgRoot, 'script/commands/child.js'));
    logger.info('------生产demos---并启动---');
}
  

module.exports = async function genStartDemo(injections, argv) {
    const { logger } = injections;
    try {
      await runCommand(injections, argv);
    } catch (error) {
      console.log(error);
      logger.error('-----demos启动失败-----');
    }
}