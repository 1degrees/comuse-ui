/*
 * @Author: fuxiao
 * @Date: 2019-07-24 11:01:17
 * @Last Modified by: fuxiao
 * @Last Modified time: 2019-08-19 20:39:06
 */
const chalk = require('chalk');
const moment = require('moment');

function timestamp() {
  return moment().format('HH:mm:ss');
}

const logger = {
  info(str) {
    const baseStr =
      chalk.grey('[') +
      chalk.grey(timestamp()) +
      chalk.grey('] [') +
      chalk.green('INFO') +
      chalk.grey('] - ');
    console.log(baseStr + str);
  },
  warn(str) {
    const baseStr =
      chalk.grey('[') +
      chalk.grey(timestamp()) +
      chalk.grey('] [') +
      chalk.yellow('WARN') +
      chalk.grey('] - ');
    console.log(baseStr + str);
  },
  error(str) {
    const baseStr =
      chalk.grey('[') +
      chalk.grey(timestamp()) +
      chalk.grey('] [') +
      chalk.magenta('ERROR') +
      chalk.grey('] - ');
    console.log(baseStr + str);
    /* istanbul ignore if */
    if (process.env.BABEL_ENV !== 'test') {
      process.exit(-1);
    }
  },
};

module.exports = logger;
