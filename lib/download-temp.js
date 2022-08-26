const download = require('download-git-repo');
const ora = require('ora');
const chalk = require('chalk');

module.exports = function (projectName, temp) {
  if(temp === 'rnext') {
    const spinner = ora('Loading...').start();
    spinner.color = 'cyan'
    download('direct:https://gitee.com/AMECQC/rnext.git#beta', projectName, { clone: true }, function (err) {
      if(err) {
        spinner.fail(chalk.redBright('项目初始化失败'));
      } else {
        spinner.succeed(chalk.greenBright('项目初始化成功'));
      }
    })
  } else {
    console.log('开发中')
  }
}