# 介绍

WePY 提供了一个为 WePY 量身定制的 cli 工具 [@wepy/cli](https://github.com/Tencent/wepy/tree/2.0.x/packages/cli), 可以对 WePY 项目进行初始化和编译等等。

需要注意的是，WePY 1 的 cli 工具和 WePY 2 的 cli 工具并不能兼容和共存， WePY 1 的 cli 工具无法编译 WePY 2 的项目，同理 WePY 2 的 cli 工具也无法编译 WePY 1 的项目。在使用 `npm` 的 `--global` 参数安装时，将会进行版本覆盖。

## cli 命令

### list

使用 `wepy list` 命令可以列出模板库中的 WePY 项目。

WePY 的模板库维护在 [wepy-templates](https://github.com/wepyjs/wepy-templates)，分为 `official` 官方提供模板和 `github` 开发者提供源码。开发者可以通过 PR 贡献进行模板的修改更新，也可以通过 PR 贡献将自己使用的模板加入其中方便别人使用。

模板库的贡献指南可以参考 [CONTRIBUTING.md](https://github.com/wepyjs/wepy-templates/blob/2.0.x/CONTRIBUTING.md)


### init

使用 `wepy init` 命令可以根据 `wepy list` 中得到的模板进行项目初始化，例如：
```
# 使用 standard 模板初始化项目到 myfolder 目录下
wepy init standard myfolder

# 下载 github 源码包 wepyjs/wepy-wechat-demo 至 myfolder 目录下
wepy init wepyjs/wepy-wechat-demo myfolder
```

模板库的 `git` 有两个分支 `2.0.x` 和 `master` 分别对应了 WePY 2 和 WePY 1 两个版本，WePY 2 会默认拉取模板库中的 `2.0.x` 分支。如果想通过 WePY 1 的 cli 拉取 WePY 2 的模板库则需要添加分支信息，如下：
```
# 使用 2.0.x 分支的 standard 模板初始化项目
wepy init standard#2.0.x myfolder
```

### build

使用 `wepy build` 命令可以对项目进行打包编译，打包编译时依赖于项目根目录的 `wepy.config.js` 编译配置文件，开发者可以通过修改 `wepy.config.js` 来实现自己的个性化编译需求。
编译时，可以通过 `-l` 或者 `--log` 参数来指定输出的日志级别, 其中，可用的日志级别有：`silly`, `verbose`, `info`, `warn`, `error`, `silent`, `trace`。只有日志级别为 `trace` 时才可以看到错误堆栈。如：
```
wepy build -l trace
```

## 编译配置文件

在运行 `wepy build` 时会读取当前目录下的编译配置文件 `wepy.config.js`，文件可以通过 `wepy init` 根据模板初始化得到。


