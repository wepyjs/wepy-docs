# 自定义事件

用法与 Vue 一致，参考 [vue官方文档](https://cn.vuejs.org/v2/guide/components-custom-events.html)

!> 暂不支持 自定义组件的 ```v-model```

## stop 修饰符

---

**作用：**中断触摸类事件捕获阶段和取消冒泡阶段

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

## capture 修饰符

---

**作用：**触摸类事件支持捕获阶段

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

## wxs 修饰符

---

**作用：**使用WXS函数响应事件

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