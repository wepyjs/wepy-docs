# 插件

通过 WePY 2 的插件机制，开发发可以定制编译流程，完成一些个性化扩展。

目前可使用的插件有：

## compiler-babel

[compiler-babel](https://github.com/Tencent/wepy/tree/2.0.x/packages/compiler-babel)插件：让代码进行 Babel  编译的插件，也是 WePY 2 当中 `<script>`的默认编译方式。

## compiler-typescript
## compiler-less
## compiler-sass
## compiler-stylus
## compiler-postcss

## plugin-define

[plugin-define](https://github.com/Tencent/wepy/tree/2.0.x/packages/plugin-define)插件：可以在运行时的代码中定义一些常量，然后在编译阶段，这些常量会控预定的配置进行值被替换。

### 使用

```
const DefinePlugin = require('@wepy/plugin-define');

module.exports = {
  ...
  plugins: [
    DefinePlugin({
      key: value
    })
  ]
};
```

其中，key 可以一个字符串，也可以是一个用 `.` 连接的对象，也可以是 `typeof something`。

* 当 value 不为字符串时，会先尝试把 value 转化为字符串。
* 当 value 为字符串时，它会被当前一个代码片段被替换。

如果配置是：
```
DefinePlugin({ 
  URL: "http://www.foo.com"
})
```
在以下代码中：
```
var url = URL;
```
URL 的值会被当作代码片段替换进来，得到如下编译结果：
```
var url = http://www.foo.com
```
因为我们需要使用 "'http://www.foo.com'" 或者 `JSON.stringify('http://www.foo.com')`

## plugin-uglify

[plugin-uglify](https://github.com/Tencent/wepy/tree/2.0.x/packages/plugin-uglifyjs)插件：使用 UglifyJS 对编译后的代码进行打混淆压缩。

### 使用

```
const UglifyPlugin = require('@wepy/plugin-uglify');

module.exports = {
  ...
  plugins: [
    UglifyPlugin({
      // options
    })
  ]
};
```

提供的配置选项 options 传传递给 UglifyJS。更多 options 信息可直接查看[UglifyJS 官方文档](https://github.com/mishoo/UglifyJS2#minify-options)


## plugin-eslint

[plugin-eslint](https://github.com/Tencent/wepy/tree/2.0.x/packages/plugin-eslint)插件：在编译过程当中开启 ESLint

