const execSync = require("child_process").execSync;
const chalk = require("chalk");

const types = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'pref',
  'test',
  'build',
  'ci',
  'chore',
  'revert',
]

let commitType, commitMsg, currentBranch, lastCommitId, cherryPickBranch;

const cmdStrArr = [
  "git pull",
  "git add .",
  "git commit -m 'commitType: commitMsg'",
  "git push",
  "git rev-parse --abbrev-ref HEAD",  // 当前分支
  "git rev-parse --short HEAD", // commitId
  "git checkout cherryPickBranch",
  "git pull",
  "git cherry-pick lastCommitId",
  "git push",
  "git checkout currentBranch",
];

function commitCherryPick(...args) {
  try {
    const [type, msg, branch] = args;
    if ([type, msg, branch].some(ele => typeof ele !== 'string')) throw Error('参数错误');
    
    if(!types.includes(type)) throw Error('提交类型错误');
    commitType = type;
    commitMsg = msg;
    cherryPickBranch = branch;

    for (let i = 0; i < cmdStrArr.length; i++) {
      let element = cmdStrArr[i];

      if (element.includes("commitType")) {
        element = element.replace("commitType", commitType);
      } else if (element.includes("commitMsg")) {
        element = element.replace("commitMsg", commitMsg);
      } else if (element.includes("lastCommitId")) {
        element = element.replace("lastCommitId", lastCommitId);
      } else if (element.includes("currentBranch")) {
        element = element.replace("currentBranch", currentBranch);
      } else if (element.includes("cherryPickBranch")) {
        element = element.replace("cherryPickBranch", cherryPickBranch);
      }

      console.log(chalk.blueBright("Exec: "), chalk.cyanBright(element));
      const res = execSync(element);
      if (element === "git rev-parse --abbrev-ref HEAD") {
        currentBranch = res.toString().replace("\n", "");
      } else if (element === "git rev-parse --short HEAD") {
        lastCommitId = res.toString().replace("\n", "");
      }
    }
  } catch (error) {
    console.log(error);
    execSync("git reset");
    console.log(chalk.redBright("操作失败, 请手动处理"));
  }
}

module.exports = commitCherryPick;
