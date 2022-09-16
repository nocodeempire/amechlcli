const execSync = require("child_process").execSync;
const chalk = require("chalk");
const { commitTypes } = require('../util/commom');

let commitType, commitMsg;

const cmdStrArr = [
  "git pull",
  "git add .",
  'git commit -m "commitType: commitMsg"',
  "git push",
];

function commit(type, msg) {
  try {
    if (!type || !msg) throw Error('参数错误');
    
    if(!commitTypes.includes(type)) throw Error('commit提交类型错误');
    commitType = type;
    commitMsg = msg;

    for (let i = 0; i < cmdStrArr.length; i++) {
      let element = cmdStrArr[i];

      if (element.includes("commitType")) {
        element = element.replace("commitType", commitType);
        element = element.replace("commitMsg", commitMsg);
      }

      console.log(chalk.blueBright("Exec: "), chalk.cyanBright(element));
      execSync(element);
    }
  } catch (error) {
    execSync("git reset");
    console.log(chalk.redBright(error));
  }
}

module.exports = commit;
