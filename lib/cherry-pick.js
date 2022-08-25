const execSync = require('child_process').execSync;

let currentBranch,
  lastCommitId,
  cherryPickBranch;

const cmdStrArr = [
  'git rev-parse --abbrev-ref HEAD',
  'git rev-parse --short HEAD',
  'git checkout cherryPickBranch',
  'git pull',
  'git cherry-pick lastCommitId',
  'git push',
  'git checkout currentBranch'
];

function cherryPick(branch) {
  try {
    if (!branch) throw Error('参数错误');
    cherryPickBranch = branch;

    for (let i = 0; i < cmdStrArr.length; i++) {
      let element = cmdStrArr[i];

      if (element.includes('lastCommitId')) {
        element = element.replace('lastCommitId', lastCommitId);
      } else if (element.includes('currentBranch')) {
        element = element.replace('currentBranch', currentBranch);
      } else if (element.includes('cherryPickBranch')) {
        element = element.replace('cherryPickBranch', cherryPickBranch);
      }

      console.log("Exec: ", element)
      const res = execSync(element);
      if (element === 'git rev-parse --abbrev-ref HEAD') {
        currentBranch = res.toString().replace('\n', '');
      } else if (element === 'git rev-parse --short HEAD') {
        lastCommitId = res.toString().replace('\n', '');
      }
    }
  } catch (error) {
    execSync('git reset');
    console.log('可能存在冲突, 请手动处理')
  }
}

module.exports = cherryPick