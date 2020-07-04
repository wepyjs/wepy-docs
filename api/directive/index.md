## v-bind
- 缩写： `:`
- 用法：

动态地绑定一个或多个 attribute，或一个组件 prop 到表达式。

在绑定 class 或 style attribute 时，支持其它类型的值，如数组或对象。

在绑定 prop 时，prop 必须在子组件中声明。

- 示例： 

```vue
// 绑定class
<div class="container" :class="{ 'active': active }"></div>
// 绑定style
<div class="container" :style="{ color: color, fontSize: fontSize }"></div>
// 或者
<div class="container" :style="{ color: color, 'font-size': fontSize }"></div>
``` 

## v-on
- 缩写：`@`

- 预期：`Function | Inline Statement | wxs Function | Object`

- 参数：`event`

- 修饰符：
  - `stop`: 阻止事件向上冒泡, 等同于 `catch`
  - `capture`: 中断捕获，等同于 `capture-bind`
  - `stop.capture`: 中断捕获阶段和取消冒泡阶段, 等同于 `capture-catch`
  - `wxs`: [wxs 响应事件](https://developers.weixin.qq.com/miniprogram/dev/framework/view/interactive-animation.html)
- 用法：

绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。

在监听事件时，方法以事件为唯一的参数。如果使用内联语句，语句可以访问一个 $event property：v-on:click="handle('ok', $event)"。

- 示例：
```vue
<template>
  <!-- parent component -->
  <my-comp @custom-event="handler"></my-comp>
  <my-comp @custom-event="handlerWithArg('myarg', arguments)"></my-comp>
  <my-comp @custom-event="handlerWithArg('myarg', $event, arguments, $wx)"></my-comp>
  <div v-for="(item, index) in list">
    <my-comp @custom-event="handlerInFor('myarg', item, index, arguments)"></my-comp>
  </div>
</template>
<script>
  import wepy from '@wepy/core';
  wepy.page({
    data: {
      list: [{id: 1, name: 'item1'}] 
    },
    methods: {
      handler() {
        // do something 
      },
      handlerWithArgs(p1, p2) {
        console.log(p1, p2); // "myarg", [1, 2, 3]
      },
      handlerWithAll(p1, p2, p3, p4) {
        console.log(p1, p2, p3, p4) // "myarg", 1, [1, 2, 3], event
      },
      handlerInFor(p1, p2, p3, p4) {
        console.log(p1, p2, p3, p4) // "myarg", {id: 1, name: 'item1'}, [1, 2, 3], event
      }
    }
  })
</script>
```
- 参考：
  - [事件处理](https://wepyjs.github.io/wepy-docs/2.x/#/base/event)

## v-if

- 用法：
在wepy中，`v-if`会编译成为`wx:if`，在小程序中，使用 `wx:if=""` 来判断是否需要渲染该代码块
- 示例：
```
<div v-if="condition"></div>
```
- `wx:if` vs `hidden`
> 因为`wx:if`之中的模板也可能包含数据绑定，所以当 `wx:if` 的条件值切换时，框架有一个局部渲染的过程，因为它会确保条件块在切换时销毁或重新渲染。  
同时 `wx:if` 也是惰性的，如果在初始渲染条件为 false，框架什么也不做，在条件第一次变成真的时候才开始局部渲染。  
相比之下，`hidden` 就简单的多，组件始终会被渲染，只是简单的控制显示与隐藏。一般来说，`wx:if` 有更高的切换消耗而 `hidden` 有更高的初始渲染消耗。  
因此，如果需要频繁切换的情景下，用 `hidden `更好，如果在运行时条件不大可能改变则 `wx:if` 较好。

## v-else-if

在wepy中， `v-else-if`会编译成为`wx:elif ` 

- 示例：  

```
<div v-if="condition1"></div>

<div v-else-if="condition2"></div>
```

## v-else

在wepy中，`v-else`会编译成为`wx:else ` 

- 示例：  

```
<div v-if="condition1"></div>

<div v-else-if="condition2"></div>

<div v-else></div>
```
## v-show

在wepy中，`v-show`会编译成为`hidden`

- 示例：  

```
<div v-show="condition"></div>
// 编译后
<view hidden="{{ !condition }}"></view>
```

## v-for
- 用法：
在组件上使用 `v-for` 控制属性绑定一个数组，即可使用数组中各项的数据重复渲染该组件。
- 示例：
```vue
<div v-for="(item, idx) in array">
  {{idx}}: {{itemName.message}}
</div>
// 编译后
<view wx:for="{{array}}" wx:for-index="idx" wx:for-item="itemName">
  {{idx}}: {{itemName.message}}
</view>
```

## v-model
- 限制(可使用的原生组件)：
  - input
  - textarea
  - picker
  - checkbox-group
  - radio-group
  - switch

- 用法：
在表单控件上创建双向绑定。

- 示例： 

```vue
<input v-model="inputmodel" />
<script>
import wepy from '@wepy/core';

wepy.page({
    data: {
        inputmodel: ''
    }
})
</script>
```
- 参考：
  - [表单绑定](https://wepyjs.github.io/wepy-docs/2.x/#/base/form)
