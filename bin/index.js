#! /usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const cherryPick = require('../lib/cherry-pick');
const downloadTemp = require('../lib/download-temp');
const upgradeTemp = require('../lib/upgrade-temp');

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

program.command('cherry-pick <branch>')
  .description('cherry-pick到<branch>分支')
  .alias('cp')
  .action((str, ...args) => {
    cherryPick(str)
  });

program.parse();