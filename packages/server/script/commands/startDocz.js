/*
 * @Author: Yue·jian
 * @Date: 2021-04-18 20:10:52
 * @LastEditors: Yue·jian
 * @LastEditTime: 2021-04-18 20:59:04
 * @Description: 文件用途描述
 */
const crossSpawn = require('cross-spawn');

async function runCommand(injections, argv) {
  const { logger, workspace } = injections;
  crossSpawn.sync('baozheng', ['dev'], {
    cwd: workspace,
    stdio: 'inherit',
  });
  logger.error('-----启动docz文档成功------');
}

module.exports = async function startDocz(injections, argv) {
  const { logger } = injections;
  try {
    await runCommand(injections, argv);
  } catch (error) {
    console.log(error);
    logger.error('-----启动docz文档失败------');
  }
}
