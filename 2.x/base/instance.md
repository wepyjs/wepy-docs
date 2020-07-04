# WePY 实例

## 宿主环境

---

我们称微信客户端给小程序所提供的环境为宿主环境。小程序借助宿主环境提供的能力，可以完成许多普通网页无法完成的功能。
更多小程序原理的相关知识可参考小程序[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/framework.html)。



### 程序与页面

原生小程序中，每个页面拥有独自的一个页面实例 Page，整个小程序只有一个 App 实例，是全部页面共享的。

同样的，在 WePY 的环境当中，每个 WePY 页面拥有独自的 WepyPage 实例。小程序也会有 WepyApp 实例。它们并非是继承自原生的 Page 和 App。WePY 提供 `wepy.app`，`wepy.page`，`wepy.component` 等入口 方法注册程序、页面、以及组件。注册后在组件的生命周期事件(onLaunch/onLoad/created)里，会自动创建相对应的 WePY 实例。

## 入口

---

### 注册 App

1. 在指定位置新建 ```app.wpy```，默认位置：```src/app.wpy```，具体配置可参考 [编译器配置文件](cli/config.md)

2. 在 ```<script>``` 块内使用 wepy.app 方法注册

```vue
<!-- app.wpy -->

<script>
import wepy from '@wepy/core'

wepy.app({
  // 选项
})
</script>
```

使用入口方法注册 App 时，可以传入一个参数对象。这篇教程主要描述的就是如何使用这些选项来创建你想要的行为。

### 注册页面

1. 在 ```app.wpy``` 中 ```<config>``` 代码块中注册页面信息

```vue
<!-- app.wpy -->

<config>
{
  "pages": [
    "pages/example"
  ]
}
</config>
```

2. 新建 ```pages/example.wpy``` 文件

3. 在 ```<script>``` 块内添加 Page 注册方法


```vue
<!-- pages/example.wpy -->

<script>
import wepy from '@wepy/core'

wepy.page({
  // 选项
})
</script>
```

注册 Page 时，可以传入一个参数对象。这篇教程主要描述的就是如何使用这些选项来创建你想要的行为。

!> WePY 2.0 中，Page 同样是使用小程序原生的 Component 方法进行注册的。

### 注册组件

1. 新建 ```components/comA.wpy``` 文件

2. 在 ```<script>``` 块内添加 component 实例

```vue
<!-- components/comA.wpy -->

<script>
import wepy from '@wepy/core'

wepy.component({
  // 选项
})
</script>
```

3. 在需要引用组件的页面配置中添加组件信息，如需要在 ```pages/example.wpy``` 页面中新增 ```comA``` 组件，则在 ```pages/example.wpy``` 的 ```<config>``` 块中添加如下信息：

```vue
<!-- pages/example.wpy -->

<config>
{
  "usingComponents": {
    "comA": "components/comA"
  }
}
</config>
```

!> 与 WePY 1 或者 Vue 不同的是，组件的引用方式保留了原生的 `usingComponents` 方式。不可以使用 `import` 的方式导入。



## 数据与方法

---

使用 `wepy.page` 或者 `wepy.component` 注册页面或者组件时，它将 data 对象中的所有的属性加入到 wepy 的 **响应式系统** 中。当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

```javascript
wepy.page({
  data: {
    a: 1
  },
  plus: function () {
    // 点击 “+“ 按钮式触发
    this.a++
  }
})
```

当这些数据改变时，视图会进行重渲染。值得注意的是只有当实例被创建时 data 中存在的属性才是响应式的。也就是说如果你添加一个新的属性，比如：

```javascript
wepy.page({
  data: {
    a: 1
  },
  plus: function () {
    // 点击 “+“ 按钮式触发
    this.a++
  },
  sayHi: function () {
    this.b = 'hi'
  }
})
```

那么对 b 的改动将不会触发任何视图的更新。如果你知道你会在晚些时候需要一个属性，但是一开始它为空或不存在，那么你仅需要设置一些初始值。比如：

```javascript
wepy.page({
  data: {
    newTodoText: '',
    visitCount: 0,
    hideCompletedTodos: false,
    todos: [],
    error: null
  }
})
```

## 生命周期回调函数

### WePY 单文件组件

WePY 单文件组件主要由 ```<script>```，```<template>```，```<style>```，```<config>``` 四部分组成（也包括小程序 ```<wxs>``` 标签）。


### App 生命周期

`wepy.app` 注册 App 是直接调用原生 `App` 方法进行 App 注册，生命周期与原生一致。可参见[官方文档 App](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html)


### 页面生命周期

`wepy.page` 本质上也是调用原生方法 `Component` 注册页面，因此它包含了 `Component` 的完整生命周期。同时，为了兼容对原有 `Page` 的使用习惯，也保留了所有 `Page` 特有的生命周期事件。

| 通过 Page({}) 注册页面 | 通过 wepy.page({}) 注册页面 | 说明 |
| --- | --- | -- |
| onLoad | onLoad | 参看[官方文档 Page](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html)|
| onShow | onShow | 同上 |
| onReady | onReady | 同上 | 
| onHide | onHide | 同上 |
| onUnload | onUnload | 同上 | 
| onPullDownRefresh | onPullDownRefresh | 同上 | 
| onReachBottom | onReachBottom | 同上 | 
| onShareAppMessage | onShareAppMessage | 同上 |
| onPageScroll | onPageScroll | 同上 |
| onResize | onResize | 同上 |
| onTabItemTap | onTabItemTap | 同上 |
| onAddToFavorites | onAddToFavorites | 同上 |
| - | created | 参看[官方文档 Component](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html) |
| - | attached | 同上 |
| - | ready | 同上 |
| - | moved | 同上 | 
| - | detached | 同上 |
| - | error | 同上 |

### 组件生命周期

wepy component 实例生命周期与原生小程序的 **组件生命周期** 一致，在 wepy component 实例中，您可以使用如下生命周期钩子：

`wepy.component` 注册组件除了原生的 `Component` 生命周期外，还定义了某些其它生命周期。

| 通过 Component({}) 注册页面 | 通过 wepy.component({}) 注册页面 | 说明 |
| --- | --- | -- | 
| - | beforeCreate | 本质上与wepy.created 一样都是在 Component.created 阶段触发，但 wepy.beforeCreate 在 Component.created 刚进入时触发，然后进行 WePY 的 data, props, methods 等等初始化，完成后再触发 wepy.created |
| created | created | 参看[官方文档 Component](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html) |
| attached | attached | 同上 |
| ready | ready | 同上 |
| moved | moved | 同上 | 
| detached | detached | 同上 |
| error | error | 同上 |

### 生命周期函数补充与修改

不排除一些情况，小程序进行版本库升级后，添加或者删除了新的生命周期函数，而且 WePY 并没有及时的进行更新，而且导致无法使用最新的生命周期函数。在这种情况下，开发者通过参数自行添加最新的生命周期函数。使用方法如下：

```
wepy.app({ ... }, {
  lifecycle: {
    // 定义要添加生命周期到 app 或者 page 或者 component
    // 值类型为：String 或者 Array 或者 Function
    // 值为需要添加的生命周期一个或者多个函数名，或者返回生命周期的函数数组的方法
    app: 'onSomeTime', // 给 App 添加一个 `onSomeTime` 生命周期函数
    page: ['onTime1', 'onTime2'], // 给 Page 添加两个生命周期函数
    component: function (lifecycles) {  // 删除 Component 最后一个生命周期函数
      lifecycles.pop();
      retrun lifecycles;
    }
  }
})
```

## 生命周期图示

下图展示了 页面/组件 实例的生命周期。你不需要立马弄明白所有的东西，不过随着你的不断学习和使用，它的参考价值会越来越高。

![image](https://user-images.githubusercontent.com/16918885/46550005-5520cd80-c906-11e8-83f0-5876f1179c2f.png)

