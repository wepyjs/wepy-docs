# 安装

## 命令行工具（cli）

---

WePY 提供了一个官方的 CLI，为小程序快速搭建繁杂的脚手架。它为现代前端工作流提供了 batteries-included 的构建设置。只需要几分钟的时间就可以运行起来并带有热重载、保存时 lint 校验，以及生产环境可用的构建版本。

### 安装命令行工具

!> 1.7.x 用户

如果您同时需要维护 1.7.x 版本的 WePY 项目，且电脑中已全局安装 1.7.x 版本的 wepy-cli 工具包，为避免命令行冲突，建议在 2.0.x 项目中本地安装 2.0.x 版本的命令行工具包。

1. 使用 1.7.x 版本命令行工具 ```wepy-cli``` 下载 2.0.x 官方脚手架模板

```bash
wepy init standard#2.0.x wepy2-project
```

2. 进入 2.0.x 项目目录，安装依赖，运行项目

```bash
# step 1
cd wepy2-project

# step 2
npm install

# step 3
npm run dev
```

!> 全新 2.0.x 用户

如果您不需要维护 1.7.x 版本的 WePY 项目，您可以全局安装 2.0.x 版本的命令行工具

1. 全局安装 2.0.x 版本命令行工具 ```@wepy/cli```

```bash
npm install --global @wepy/cli
```

2. 下载 2.0.x 官方脚手架模板

```bash
wepy init standard wepy2-project
```

3. 进入 2.0.x 项目目录，安装依赖，运行项目

```bash
# step 1
cd wepy2-project

# step 2
npm install

# step 3
npm run dev
```

