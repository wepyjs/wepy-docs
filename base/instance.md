# WePY 实例

## 宿主环境

---

我们称微信客户端给小程序所提供的环境为宿主环境。小程序借助宿主环境提供的能力，可以完成许多普通网页无法完成的功能。


### 渲染层与逻辑层

小程序的渲染层和逻辑层分别由2个线程管理：渲染层的界面使用了WebView 进行渲染；逻辑层采用JsCore线程运行JS脚本。一个小程序存在多个界面，所以渲染层存在多个WebView线程，这两个线程的通信会经由微信客户端（下文中也会采用Native来代指微信客户端）做中转，逻辑层发送网络请求也经由Native转发，小程序的通信模型下图所示

![image](https://user-images.githubusercontent.com/16918885/58605198-90bf3c00-82c9-11e9-910c-1c3d1496f5bb.png)


### 程序与页面

根据 [小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/quickstart/basic/framework.html) 可知，每个小程序页面拥有独自的一个页面实例，整个小程序只有一个 App 实例，是全部页面共享的。

同样的，每个 WePY 页面拥有独自的 wepy page 实例，且整个小程序只有一个 wepy app 实例。

## 创建 WePY 实例

---

### App 实例

1. 在指定位置新建 ```app.wpy```，默认位置：```src/app.wpy```，具体配置可参考 [编译器配置文件](cli/config.md)

2. 在 ```<script>``` 块内添加 app 实例

```vue
<!-- app.wpy -->

<script>
import wepy from '@wepy/core'

wepy.app({
  // 选项
})
</script>
```

当创建一个 wepy app 实例时，你可以传入一个选项对象。这篇教程主要描述的就是如何使用这些选项来创建你想要的行为。作为参考，你也可以在 [API 文档](api/index.md) 中浏览完整的选项列表。

### 页面实例

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

3. 在 ```<script>``` 块内添加 page 实例


```vue
<!-- pages/example.wpy -->

<script>
import wepy from '@wepy/core'

wepy.page({
  // 选项
})
</script>
```

当创建一个 wepy page 实例时，你可以传入一个选项对象。这篇教程主要描述的就是如何使用这些选项来创建你想要的行为。作为参考，你也可以在 [API 文档](api/index.md) 中浏览完整的选项列表。

### 组件实例

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

3. 在需要引用组件的页面配置中添加组件信息，如需要在 ```pages/example.wpy``` 页面中新增 ```comA``` 组件，则在 ```pages/example.wpy``` 的 ```<config>``` 块中添加如下信息：

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



## 数据与方法

---

当一个 wepy page 实例被创建时，它将 data 对象中的所有的属性加入到 wepy 的 **响应式系统** 中。当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

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

## 实例生命周期钩子

---

每个 wepy page/app 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。


### WePY 单文件组件

WePY 单文件组件主要由 ```<script>```，```<template>```，```<style>```，```<config>``` 四部分组成（也包括小程序 ```<wxs>``` 标签）。


### 页面实例

wepy page 实例生命周期继承了原生小程序的 **组件生命周期** 与 **页面生命周期**，在 wepy page 实例中，您可以使用如下生命周期钩子：

- created
- attached
- ready
- moved
- detached
- onLoad
- onShow
- onHide
- onUnload
- onPullDownRefresh
- onReachBottom
- onShareAppMessage
- onPageScroll
- onTabItemTap
- onReady
- onResize

### 组件实例

wepy component 实例生命周期与原生小程序的 **组件生命周期** 一致，在 wepy component 实例中，您可以使用如下生命周期钩子：

- created
- attached
- ready
- moved
- detached

### 用法

具体用法参考 [小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html)

!> 不要在选项属性或回调上使用箭头函数，比如 ```created: () => console.log(this.a)``` 或 ```vm.$watch('a', newValue => this.myMethod())```。因为箭头函数并没有 ```this```，```this``` 会作为变量一直向上级词法作用域查找，直至找到为止，经常导致 ```Uncaught TypeError: Cannot read property of undefined``` 或 ```Uncaught TypeError: this.myMethod is not a function``` 之类的错误。

## 生命周期图示

下图展示了 页面/组件 实例的生命周期。你不需要立马弄明白所有的东西，不过随着你的不断学习和使用，它的参考价值会越来越高。

![image](https://user-images.githubusercontent.com/16918885/46550005-5520cd80-c906-11e8-83f0-5876f1179c2f.png)

