const path = require('path')
const child_process = require('child_process');
const fs = require('fs');
const download = require("download-git-repo");
const ora = require("ora");
const chalk = require("chalk");

const cachePath = 'cache_path';

function copyDir(src, dist) {
  child_process.spawnSync('cp', ['-r', src, dist]);	
}

module.exports = function () {
  const spinner = ora("Loading...").start();
  spinner.color = "cyan";
  const fileCache = path.resolve(process.cwd(), cachePath);
  download(
    "direct:https://gitee.com/AMECQC/rnext.git#purchase",
    fileCache,
    { clone: true },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        try {
          fs.readdirSync(fileCache).forEach(ele => {
            copyDir(path.resolve(fileCache, ele), process.cwd());
          })
          child_process.execSync(`rm -rf ${fileCache}`, function () {});
          spinner.succeed(chalk.greenBright("更新成功"))
        } catch (error) {
          spinner.fail(chalk.redBright("更新失败"));
        }
      }
    }
  );
};
