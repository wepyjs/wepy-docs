# 快速开始


## 1. 安装

```
$ npm install @wepy/cli -g # 全局安装 WePY CLI 工具
$ wepy init standard myproj # 使用 standard 模板初始化项目
$ cd myproj # 进入到项目目录
$ npm install # 安装项目依赖包
$ npm run dev # 监听并且编译项目
```

!> 全局安装 CLI 会覆盖老版本的 CLI 工具，新版本的 CLI 无法编译老版本的代码。因此，如果需要同时维护 WePY 1.7.x 和 WePY 2.0.x 的开发者，应当考虑在当前项目安装 CLI，而非全局安装。可以直接使用 1.7.x 的 CLI 去初始化 2.0.x 的项目，如下：`$ wepy init standard#2.0.x myproj`

## 2. 导入项目

使用开发者工具导入 `myproj` 根目录，即可预览效果。


