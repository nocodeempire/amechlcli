#! /usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const downloadTemp = require('../lib/download-temp');
const upgradeTemp = require('../lib/upgrade-temp');
const commit = require('../lib/commit');
const cherryPick = require('../lib/cherry-pick');
const commitCherryPick = require('../lib/commit-cherry-pick');

program
  .name('amechlcli')
  .description('CLI to some JavaScript utilities')
  .version('1.0.0')
  .showHelpAfterError();


program.command('init <project>')
  .description('初始化项目<project>')
  .action(async (projectName, ...args) => {
    const res = await inquirer.prompt([{
      type: 'list',
      name: 'temp',
      default: 'rnext',
      choices: ['rnext', '待开发'],
      message: '初始化模板: '
    }])
    downloadTemp(projectName, res.temp);
  })

program.command('upgrade')
  .option('-f, --force', '强制更新')
  .description('更新rnext')
  .action(async (arg, ...args) => {
    if(arg && arg.force) {
      upgradeTemp()
    } else {
      const res = await inquirer.prompt([{
        type: 'confirm',
        name: 'value',
        message: '更新将覆盖本地rnext文件, 确认更新么？'
      }])
      if(res.value) upgradeTemp();
      else console.log(chalk.cyanBright('暂不更新'));
    }
  })

program.command('commit <type> <msg>')
  .description('commit, 提交类型<type>, 提交语<msg>, 并推送')
  .alias('c')
  .action((type, msg, ...args) => {
    commit(type, msg)
  });

program.command('cherry-pick <branch>')
  .description('cherry-pick到<branch>分支, 并推送')
  .alias('cp')
  .action((str, ...args) => {
    cherryPick(str)
  });

program.command('commit-cherry-pick <type> <msg> <branch>')
  .description('commit, 提交类型<type>, 提交语<msg>, 然后cherry-pick到<branch>分支, 并推送')
  .alias('ccp')
  .action(commitCherryPick);


program.parse();