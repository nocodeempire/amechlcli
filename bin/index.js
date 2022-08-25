#! /usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const cherryPick = require('../lib/cherry-pick');
const downloadTemp = require('../lib/download-temp');

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

program.command('cherry-pick <branch>')
  .description('cherry-pick到<branch>分支')
  .alias('cp')
  .action((str, options) => {
    cherryPick(str)
  });

program.parse();