const download = require('download-git-repo');

module.exports = function (projectName, temp) {
  if(temp === 'rnext') {
    download('direct:https://gitee.com/AMECQC/rnext.git#beta', projectName, { clone: true }, function (err) {
      console.log(err ? 'Error' : '项目初始化成功')
    })
  } else {
    console.log('开发中')
  }
}