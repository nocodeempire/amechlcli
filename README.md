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

#### init和upgrade命令仅内部用, 外部调用不通;
