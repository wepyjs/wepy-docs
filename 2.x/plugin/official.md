# 插件

通过 WePY 2 的插件机制，开发发可以定制编译流程，完成一些个性化扩展。

目前可使用的插件有：

## compiler-babel

---

[compiler-babel](https://github.com/Tencent/wepy/tree/2.0.x/packages/compiler-babel) 插件：让代码进行 Babel  编译的插件，也是 WePY 2 当中 `<script>`的默认编译方式。

### 安装

```bash
npm install @wepy/compiler-babel --save-dev
```

### 使用

```javascript
module.exports = {
  compilers: {
    babel: {
      presets: [
        'es2015',
        'stage-1'
      ],
      plugins: [
        'transform-export-extensions',
        'syntax-export-extensions',
        'transform-runtime'
      ]
    }
  }
};
```

### 参数说明

[babel官方文档](https://github.com/babel/babel)

## compiler-typescript

---

[compiler-typescript](https://github.com/Tencent/wepy/tree/2.0.x/packages/compiler-typescript) 插件：让代码支持 ```Typescript```

### 安装

```bash
npm install @wepy/compiler-typescript typescript --save-dev
```

### 使用

```javascript
const TypeScriptCompiler = require('@wepy/compiler-typescript');

module.exports = {
  "plugins": [
    TypeScriptCompiler()
  ]
};
```

### 参数说明

[Typescript官方文档](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

## compiler-less

---

### 安装

```bash
npm install @wepy/compiler-less less --save-dev
```

### 使用

```javascript
module.exports = {
  compilers: {
    less: {
      compress: true
    }
  }
};
```

### 参数说明

[less 官方文档](https://github.com/less/less.js)


## compiler-sass

---

### 安装

```bash
npm install @wepy/compiler-sass --save-dev
```

### 使用

```javascript
module.exports = {
  compilers: {
    sass: {
      outputStyle: 'compressed'
    }
  }
};
```

### 参数说明

[node sass](https://github.com/sass/node-sass)


## compiler-stylus

---

### 安装

```bash
npm install @wepy/compiler-stylus --save-dev
```

### 使用

```javascript
module.exports = {
  compilers: {
    stylus: {
      compress: true
    }
  }
};
```

### 参数说明

[Stylus 官方文档](http://www.zhangxinxu.com/jq/stylus/js.php)

## compiler-postcss

---

### 安装

```bash
npm install @wepy/compiler-postcss --save-dev
```

### 说明

配置 wepy.config.js ,以使用 cssnext 为例

```javascript
const cssnext = require('cssnext);

module.exports = {
  compilers: {
    postcss: {
      plugins: [
        cssnext({
          browsers:['iOS 9', 'Android 4.4']
        })
      ],
      map: {
        inline: true
      }
    },
  }
};
```

### 参数说明

配置参数为 [processOptions](http://api.postcss.org/global.html#processOptions) 及 [plugins](http://api.postcss.org/global.html#Plugin)

## plugin-define

---

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

---

[plugin-uglify](https://github.com/Tencent/wepy/tree/2.0.x/packages/plugin-uglifyjs)插件：使用 UglifyJS 对编译后的代码进行打混淆压缩。

### 使用

```
const PluginUglifyjs = require('@wepy/plugin-uglifyjs');

module.exports = {
  ...
  plugins: [
    PluginUglifyjs({
      // options
    })
  ]
};
```

提供的配置选项 options 传传递给 UglifyJS。更多 options 信息可直接查看[UglifyJS 官方文档](https://github.com/mishoo/UglifyJS2#minify-options)


## plugin-eslint

[plugin-eslint](https://github.com/Tencent/wepy/tree/2.0.x/packages/plugin-eslint)插件：在编译过程当中开启 ESLint

