# 事件处理

未特殊提及的信息可优先参考 [vue官方文档](https://cn.vuejs.org/v2/guide/events.html)


## 原理

小程序原生的[事件系统](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html) 使用`bind`，`catch` 等关键字进行事件监听。
而在 WePY 中，事件沿用了 Vue 的风格，使用 `v-on` 或者是 `@` 操作符进行事件监听。同时 WePY 中会有一个统一的事件分发器接管原生事件。大致如下图：

![事件原理](https://user-images.githubusercontent.com/2182004/77230304-3a134d80-6bce-11ea-8757-8530612ecf2d.png)

WePY 在编译过程中，会找到所有监听事件，并为其分配事件 ID。同时将事件代码（可以是一个方法，也可以是一个简单的代码片段）注入至 JS 代码中。
然后当事件分发器接收到原生事件时，会通过事件 ID，分发到相应的事件逻辑当中。

这样做的好处主要是：

1. 可控性更强。用户可利用相关钩子函数从而处理全局的用户事件。（典型场景：为页面全部按钮统一增加一个点击上报功能）
2. 灵活度更高。相对于原生只能使用函数名的方式来说，还可使用简单代码片段。（典型场景：@tap="num++"）


## 事件监听


WePY 不仅可以支持到响应事件监听，也可以支持到像 Web 原生，或者 Vue 的那种，使用简单代码片段的监听方式，示例如下：

```
<template>
  <!-- 使用代码片段响应事件 -->
  <button @tap="num =+ 1">Counter - {{num}}</button> 

  <!-- 类原生方式，使用事件函数响应事件 -->
  <button @tap="handler">Handle my event</button>

  <!-- 类Vue方式，原生不支持携带参数 -->
  <button @tap="handlerWithArgs(1, 2)">Handle my event with arguments</button>
</template>
<script>
import wepy from '@wepy/core';

wepy.page({
  data: {
    num: 0,
  },
  methods: {
    handler() {
      // do something
    },
    handlerWithArgs(a, b) {
      console.log(a, b);
    }
  }
})
</script>
```

注：
原生小程序中使用 `<div data-hi="1"></div>` 的方式传递参数，然后使用 `event.currentTarget.dataset.hi` 的方式获取参数。
在 WePY 中请尽量使用携带参数响应事件去完成参数的传递与获取。WePY 会在编译时为你绑定 `data-xxx` 并且在事件分发器中贴心的为你处理好参数的。


## 特殊参数支持

小程序原生事件会传递一个 `event` 参数。而 WePY 的事件分发器在处理事件时会有一个 `$event` 参数。
$event 参数是对 event 进行了一层包装，目地是为了无侵入地对齐 Web Event 标准属性。而其中 `$event.$wx === event`。
因此，WePY 中响应事件获得的事件参数均是指 $event。如果想拿到原生事件参数，请使用 `$event.$wx`。

当使用类原生方式，使用响应事件方法名进行事件监听时，响应事件会接收到一个 $event 参数。
当使用带参函数进行事件监听时，默认不会拿到事件的 $event。 该行为与 Vue 行为是一致的。此时若想拿到 $event 需要指定 $event 参数。

示例：

```
<!-- click 会接收到一个 $event 参数 -->
<button @tap="click">Click</button>

<!-- click 会接收一个为 1 的参数 -->
<button @tap="click(1)">Click</button>

<!-- click 会接受两个参数: 1, $event -->
<button @tap="click(1, $event)"
```


## 事件修饰符

小程序的事件系统中，可以使用 `bind`, `catch`, `capture-bind`, `capture-catch` 等来处理事件的冒泡与捕获，其中区别请参考[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html)。

在 WePY 中，使用修饰符来完成这一动作，相对来说更加灵活与易读。示例：

```
<!-- 等同于 bind:tap -->
<div @tap="myclick"></div>

<!-- 等同于 catch:tap -->
<div @tap.stop="myclickStop"></div>

<!-- 等同于 capture-bind:tap -->
<div @tap.capture="myclickCapture"></div>

<!-- 等同于 capture-catch:tap -->
<div @tap.stop.capture="myclickCaptureStop"></div>

<!-- 等同于 capture-catch:tap 修饰符中无先后关系 -->
<div @tap.capture.stop="myClickCaptureStopWithParams"></div>

```

### stop 修饰符

**作用：**标识取消事件冒泡，对应原生事件中的 `catch`

在下边这个例子中，点击 inner view 会先后调用 ```handleTap3``` 和 ```handleTap2``` (因为tap事件会冒泡到 middle view，而 middle view 阻止了 tap 事件冒泡，不再向父节点传递)，点击 middle view 会触发 ```handleTap2```，点击 outer view 会触发 ```handleTap1```。

```vue
<div id="outer" @tap="handleTap1">
  outer view
  <div id="middle" @tap.stop="handleTap2">
    middle view
    <div id="inner" @tap="handleTap3">
      inner view
    </div>
  </div>
</div>

```

### capture 修饰符

**作用：**标识事件捕获阶段，对应原生事件中的 `capture-xxxx`

捕获阶段位于冒泡阶段之前，且在捕获阶段中，事件到达节点的顺序与冒泡阶段恰好相反。需要在捕获阶段监听事件时，可以采用 ```.capture```、```.capture.catch``` 修饰符，后者将中断捕获阶段和取消冒泡阶段。

在下面的代码中，点击 inner view 会先后调用 ```handleTap2```、```handleTap4```、```handleTap3```、```handleTap1```。

```vue
<div id="outer" @touchstart="handleTap1" @touchstart.capture="handleTap2">
  outer view
  <div id="inner" @touchstart="handleTap3" @touchstart.capture="handleTap4">
    inner view
  </div>
</div>
```

如果将上面代码中的第一个 ```capture``` 后面加一个 ```catch``` 修饰符，将只触发 ```handleTap2```。

```vue
<div id="outer" @touchstart="handleTap1" @touchstart.capture.catch="handleTap2">
  outer view
  <div id="inner" @touchstart="handleTap3" @touchstart.capture="handleTap4">
    inner view
  </div>
</div>
```


### wxs 修饰符

---

**作用：**标识使用WXS函数响应事件

> 小程序基础库 2.4.4 开始支持，低版本需做兼容处理

```wxs``` 响应事件的背景及实现方案，参考 [小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/view/interactive-animation.html)

```vue
<wxs module="test" src="./test.wxs"></wxs>
<div change:prop="{{test.propObserver}}" :prop="propValue" @touchmove.wxs="test.touchmove" class="movable"></div>

```

上面的 ```change:prop```（属性前面带 ```change:``` 前缀）是在 prop 属性被设置的时候触发 WXS 函数，值必须用{{}}括起来。在 ```propValue``` 值发生变化之后会触发。

!>当 prop 属性的值被设置 WXS 函数就会触发，而不只是值发生改变，所以在页面初始化的时候会调用一次 WXS 中 ```propObserver``` 的函数。

WXS 文件 ```test.wxs``` 里面定义并导出事件处理函数和属性改变触发的函数：

```javascript
module.exports = {
  touchmove: function(event, instance) {
    console.log('log event', JSON.stringify(event))
  },
  propObserver: function(newValue, oldValue, ownerInstance, instance) {
    console.log('prop observer', newValue, oldValue)
  }
}

```

### mut 修饰符

---

**作用：**标识使用互斥事件

> 小程序基础库 2.8.2 开始支持，低版本需做兼容处理
> 该修饰符 WePY 暂不支持，欢迎 PR

