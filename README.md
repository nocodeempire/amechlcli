### 命令集
```js
amechlcli
Usage: amechlcli [options] [command]

CLI to some JavaScript utilities

Options:
  -V, --version                                 output the version number
  -h, --help                                    display help for command

Commands:
  init <project>                                初始化项目<project>
  upgrade [options]                             更新rnext
  commit|c <type> <msg>                         commit, 提交类型<type>, 提交语<msg>, 并推送
  cherry-pick|cp <branch>                       cherry-pick到<branch>分支, 并推送
  commit-cherry-pick|ccp <type> <msg> <branch>  commit, 提交类型<type>, 提交语<msg>, 然后cherry-pick到<branch>分支, 并推送
  help [command]                                display help for command

```

#### 提交的<type>, 暂时有如下字段
```js
[
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
```

### Demo
1: 直接使用
```js
//  commit
//  提交本地代码到远程,
npx amechlcli commit fix "fix bug" 


//  commit-cherry-pick
//  提交了本地代码, 提交类型为feat, 提交信息为msg, 并把当前提交合并到sit3.0分支
//  简写 npx amechlcli ccp feat "msg" sit3.0
npx amechlcli commit-cherry-pick feat "msg" sit3.0
```

2: 全局安装
```js
npm install -g amechlcli


// 使用
amechlcli commit fix "fix bug" 
```

#### init和upgrade命令仅内部用, 外部调用不通;
