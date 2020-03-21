# 组件自定义事件

在小程序原生中，使用 `bind:customevent` 进行事件绑定，使用 `wx.triggerEvent` 触发组件的自定义事件。
而在 WePY 中，还原了 Vue 的实用场景，使用 `v-on` 或 `@` 进行事件绑定，使用 `$emit` 触发组件自定义事件。

WePY 中有自己的事件订阅与发布机制，当使用 `$emit` 作用于自定义组件事件时，会基于 `wx.trggerEvent` 实现对自定义组件的兼容，并且具备更加灵活的使用方式。
在 WePY 的组件自定义事件中，你不仅可以在监听事件时传递参数，也可以在触发事件时传递参数。

示例：

```
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

<template>
  <!-- child component -->
  <button @tap="click">Click</button>
</template>
<script>
  import wepy from '@wepy/core';
  wepy.component({
    methods: {
      click() {
        this.$emit('custom-event', 1, 2, 3); 
      }
    }
  })
</script>
```

> WePY 中，不推荐使用 `triggerEvent` 进行事件触发，也不推荐从 event.detail 中获取参数。请直接使用不定参传递的方式，以及使用特殊参数来获取传递的参数。
> 使用 $emit 触发自定义事件时，不支持自定义 `triggerEvent` 的第三个参数，如果需要自定义此参数，可以使用 `this.$trigger(eventName, params, eventOption)` 来实现，并且取参方式与 $emit 保持一致。


## 特殊参数

在监听自定义组件时，会提供一些特殊参数，用于不同的场景。

### arguments

此参数用于获取子组件 $emit 时，所传递的参数。参数实际绑定在 `$event.$wx.$detail.arguments` 中，但你不需要关心。只需要通过函数参数获取即可。


示例:

```
<template>
  <!-- parent component -->
  <my-comp @custom-event="handlerWithArg('myarg', arguments)"></my-comp>
</template>
<script>
  import wepy from '@wepy/core';
  wepy.page({
    methods: {
      // 子组件传递了三个参数，会以数组形式传递到 arguments 处
      handlerWithArgs(p1, p2) {
        console.log(p1, p2); // "myarg", [1, 2, 3]
      }
    }
  })
</script>


<!-- child component 同上 -->
<!-- this.$emit('custom-event', 1, 2, 3); -->
```

### $event

此参数用于获取子组件 $emit 所传递的第一个参数。此处是为了与 Vue 的形为保持一致，因 Vue 的自定义组件属于纯代码封装事件，不存在原生 Web 事件。因此，此时 $event 获取 $emit 第一个参数。

示例:

```
<template>
  <!-- parent component -->
  <my-comp @custom-event="handler('myarg', $event)"></my-comp>
</template>
<script>
  import wepy from '@wepy/core';
  wepy.page({
    methods: {
      // 子组件传递了三个参数，会以数组形式传递到 arguments 处
      handler(p1, p2) {
        console.log(p1, p2); // "myarg", 1
      }
    }
  })
</script>

<!-- child component 同上 -->
<!-- this.$emit('custom-event', 1, 2, 3); -->
```

### $wx

此参数用于获取小程序原生 event。原生小程序在触发自定义事件时。会产生一个 event。使用此参数可获取

```
<template>
  <!-- parent component -->
  <my-comp @custom-event="handler('myarg', $wx)"></my-comp>
</template>
<script>
  import wepy from '@wepy/core';
  wepy.page({
    methods: {
      // 子组件传递了三个参数，会以数组形式传递到 arguments 处
      handler(p1, p2) {
        console.log(p1, p2); // "myarg", event
      }
    }
  })
</script>

<!-- child component 同上 -->
<!-- this.$emit('custom-event', 1, 2, 3); -->
```
