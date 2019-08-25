# 介绍

## WePY 是什么

---

WePY (发音: /'wepi/) 是小程序上最早的一款类 Vue 语法的开发框架。WePY 2 是基于[小程序原生组件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)实现组件化开发。因此 WePY 2 支持的最低版本小程序基础库为 1.6.3。

### WePY 2 的设计思想

1. 非侵入式设计
WePY 2 运行于小程序之上，是对小程序原有能力的封装和优化，并不会对原有小程序框架有任何改动或者影响。

2. 兼容原生代码
能够兼容原生代码，即部分页面为原生，部分页面为 WePY。同时做到无需任何改动即可引用现有原生开发的小程序组件。

3. 基于小程序原生组件实现组件化开发
小程序原生组件在性能上相较之前有了很大的提升。因此 WePY 2 完全基于小程序原生组件实现，不支持小程序基础库 < 1.6.3 的版本。

4. 基于 Vue Observer 实现数据绑定
数据绑定基于 Vue Observer 实现，同时为其定制小程序特有的优化。

5. 更优的可扩展性
对于 core 库提供 mixin、hooks、use 等方式进行开发扩展，对于 cli 编译工具提供更强大的插件机制方便开发者可以侵入到编译的任何一个阶段进行个性化定制的编译。

### WePY 2 VS WePY 1

WePY 2 并不是基于 WePY 1 的升级版，而是完全重新开发的全新版本，因此实现原理完全不一样，比较难实现完全的向下兼容。主要体现在以下几点差异上：

1. 入口申请调整，WePY 1 使用类的继承方式 `export default class MyPage extends wepy.page {}` 在 WePY 2 中调整为 `wepy.page({})`。将实例化的过程放在生命周期事件中。

2. 数据绑定机制调整，WePY 1 使用脏检查进行数据绑定，却让开发者不知道使用时候去调用 `$apply()` 方法。在 WePY 2 中使用了 Vue Observer 实现数据绑定，告别`$apply()`。

3. 基于原生组件，WePY 1 是通过文件编译创建的静态组件在动态循环遍历时会出现一些问题，WePY 2 直接基于的小程序原生的组件去实现，避免了这一类问题。

4. Vue 模板语法，WePY 2 中推荐使用 html 代替 wxml 来写 template，支持除 filter 之外的所有 Vue 模板语法。

5. 编译方式改变，WePY 2 从基于文件编译调整为基于入口编译，因此对于图片等静态资源需要指定 [static 选项](https://wepyjs.github.io/wepy-docs/2.x/#/cli/config?id=static) 。

