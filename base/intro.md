# 介绍

## WePY 是什么

---

WePY (发音: /'wepi/) 是一套类 Vue 语法，集成编译工具于一体的综合性框架。开发体验近似 MVVM。如果您使用过 Vue 和 webpack，上手将变得非常容易。

### Vue + webpack/Browserify

在 Vue 项目中，我们可以使用文件拓展名为 ```.vue``` single-file components(单文件组件) 进行开发，这样做的好处：

- 完全支持核心库的能力
- 支持构建步骤，可以使用预处理器，如：Pug (formerly Jade) 和 Babel
- 在一个组件里，其模板、逻辑和样式是内部耦合的，并且把他们搭配在一起实际上使得组件更加内聚且更可维护

### WePY

相似的，在 WePY 项目中，我们使用文件拓展名为 ```.wpy``` single-file-components 进行开发，相较于 ```.vue``` 单文件，```.wpy``` 单文件新增了两个可选的 custom-block(自定义块)：

- config：小程序 页面/组件 配置
- wxs: 小程序的一套脚本语言，结合 WXML，可以构建出页面的结构

同时，WePY 提供了类似 ```webpack``` 的构建工具：```@wepy/cli```，这允许你进一步地拓展开发能力，如：

- 与 webpack 一致的模块解析能力
- 万物皆插件，丰富的编译流水线钩子，你甚至可以自制插件，定义一套属于自己的 DSL 语法编译器


