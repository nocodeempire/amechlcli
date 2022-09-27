const execSync = require("child_process").execSync;
const chalk = require("chalk");

let currentBranch, checkoutBranch;

const cmdStrArr = [
  "git pull",
  "git rev-parse --abbrev-ref HEAD",
  // "git checkout checkoutBranch"
];

function pull(args) {
  try {
    const branchs = process.argv.slice(3);
    if(!branchs.length) execSync('git pull');
    else {
      currentBranch = execSync('git rev-parse --abbrev-ref HEAD');
      for (let i = 0; i < branchs.length; i++) {
        execSync('git pull');
        execSync(`git checkout ${branchs[i]}`);
        console.log(chalk.blueBright("Exec: "), chalk.cyanBright(`git checkout ${branchs[i]}`));
        execSync('git pull');
        console.log(chalk.blueBright("Exec: "), chalk.cyanBright('git pull'));
      }
      execSync(`git checkout ${currentBranch}`);
      console.log(chalk.blueBright("Exec: "), chalk.cyanBright(`git checkout ${currentBranch}`));
    }
  } catch (error) {
    execSync("git reset");
    console.log(chalk.redBright(error));
  }
}

module.exports = pull;
