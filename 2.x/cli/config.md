# 编译配置文件

在运行 `wepy build` 时会读取当前目录下的编译配置文件 `wepy.config.js`，文件可以通过 `wepy init` 根据模板初始化得到。


完整的 `wepy.config.js` 文件内容如下：

```
const path = require('path');

module.exports = {
  wpyExt: '.wpy',
  eslint: false,
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    less: {
    },
    babel: {
      presets: [
        '@babel/preset-env'
      ],
    }
  },
  plugins: [],
}
```

## wpyExt

指定 WePY 单文件组件的后缀，默认值为 `.wpy`。习惯使用 `vue` 为后缀的开发者可以将此属性设置为 `.vue`。

## entry

入口文件, 默认值为：`app`, 在未改变 `wpyExt` 属性时，入口文件即为：`app.wpy`。与 WePY 1 不同的是，在WePY 2 中，CLI 根据入口文件进行编译，未被依赖的文件不会被编译。

## src

指定源码目录，默认值为：`src`。

## output

指定输出代码目录，默认值为：`weapp`。WePY 1 中默认输出至 `dist` 目录，为了方便以后扩展到其它平台，则将默认目录修改为 `weapp`。

## target

指定编译目标平台，默认值为：`weapp`。预留属性，现阶段仅支持小程序平台。

## static

指定静态资源目录，多个目录用数组表示。编译时会将目录文件拷贝至 `output` 的目录中。对于图片等静态资源，需要使用此选项才可以将其拷贝过去。 

示例：
```
{
  ...
  static: [ 'src/static' ]
  ...
}
```

## resolve 

自定义模块解析规则，可以查看 `Webpack` 的 [Resolve](https://webpack.js.org/configuration/resolve/#root) 文档查看使用方法。

WePY 在进行模块解析时，使用的是 Webpack 的 [enhanced-resolve](https://github.com/webpack/enhanced-resolve) 模块。因此，Webpack 的 resolve 功能在 WePY 项目中都可以正常使用。

### resolve.alias

创建模块别名，如：
```
module.exports = {
  //...
  resolve: {
    alias: {
      @: path.resolve(__dirname, 'src/'),
      Style: path.resolve(__dirname, 'src/Styles/'),
      Util: path.resolve(__dirname, 'src/utility/')
    }
  }
};
```
因此可以使用别名来代替原来有相对路径引用，如下：
```
// 二者等价
import Util form '../../../../utility';
import Util from 'Util';
```

更多使用方法可以参考 [webpack.resolve.alias](https://webpack.js.org/configuration/resolve/#resolvealias)

在 WePY 项目中，创建的别名在 `style`，`template`，`script`，`config` 中都适用。在`less` 和 `sass` 中使用模块别名时需要添加 `~` 前缀，如下：

```
@import '~Style/index.less';
```

### resolve.aliasFields

指定一个解析字段，并按此解析。如：
```
module.exports = {
  //...
  resolve: {
    aliasFields: ['wepy', 'weapp', 'browser']
  }
};
```
有一些包对不同的平台会设置不同的解析规则，指定 `resolve.aliasFields` 后，在解析一个模块时，会查找 `package.json` 中预设的规则进行解析。

### 其它

更多 `resolve` 的用法，请查看 Webpack 的 [resolve](https://webpack.js.org/configuration/resolve/) 的相关内容。


## plugins

一组编译插件，开发者可以通过提供的插件机制去控制编译的每一个流程。

```
const TypeScriptCompiler = require('@wepy/compiler-typescript');
const PluginUglifyjs = require('@wepy/plugin-uglifyjs');

module.exports = {
  plugins: [
    TypeScriptCompiler({
       // options
    }),
    PluginUglifyjs({
      // options
    })
  ]
};
```


## compilers

指定编译器，此属性是保留了 WePY 1 的设计。事实上在 WePY 2 中都是可以通过 `plugins` 属性完成。

```
modules.exports = {
  compilers: {
    less: { }, // 具体的配置项应该查看 [less](https://less.bootcss.com/usage/#less-options) 文档
    babel: { }, // 具体的配置项应该查看 [babel](https://babeljs.io/docs/en/) 文档
  }
}
```

以上内容会对`<style lang="less">` 和`<script lang="babel">`的内容进行编译。其中`<script>`标签的默认 `lang` 值为 `babel`。

在 WePY 2 中，在检测到 `compilers` 属性后，会自动引入 `@wepy/compiler-${key}` 的插件。因此以上配置等价于：
```
const BabelCompiler = require('@wepy/compiler-babel');
const LessCompiler = require('@wepy/compiler-less');

module.exports = {
  plugins: [
    BabelCompiler({
       // options
    }),
    LessCompiler({
      // options
    })
  ]
};
```
