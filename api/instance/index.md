
## property

`wepy.page` `wepy.component`实例上的属性

### vm.$wx

在`wepy.app` / `wepy.page` / `wepy.component`中，`this.$wx`指向相对应的原生`App`/ `Page` / `Component`中的`this`，你可以通过 `this.$wx.setData`访问到`setData`方法

### vm.$children
当前实例的直接子组件。需要注意 $children 并不保证顺序，也不是响应式的。

### vm.$options
用于当前 `wepy.app` / `wepy.page` / `wepy.component`实例的初始化选项。

### vm.$parent
父实例(只有`wepy.component`拥有父实例)

### vm.$is

组件的文件路径

### vm.$root
当前组件树的根实例。如果当前实例没有父实例，此实例将会是其自己。`wepy.page` 中 `this.$root`将是自己

### vm.$app

`wepy.app`实例


## 数据
### vm.$watch
- 参数：

  - {string | Function} expOrFn
  - {Function | Object} callback
  - {Object} [options]
    - {boolean} deep
    - {boolean} immediate

- 用法：
观察 Vue 实例上的一个表达式或者一个函数计算结果的变化。回调函数得到的参数为新值和旧值。表达式只接受监督的键路径。对于更复杂的表达式，用一个函数取代。

- 示例： 

```vue
// 键路径
vm.$watch('a.b.c', function (newVal, oldVal) {
  // do something
})

// 函数
vm.$watch(
  function () {
    // 表达式 `this.a + this.b` 每次得出一个不同的结果时
    // 处理函数都会被调用。
    // 这就像监听一个未被定义的计算属性
    return this.a + this.b
  },
  function (newVal, oldVal) {
    // do something
  }
)
```

### vm.$set( target, propertyName/index, value )

`wepy.set` 的别名

- 参数：
  - {Object | Array} target
  - {string | number} propertyName/index
  - {any} value

- 用法：
向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 wepy 无法探测普通的新增 property (比如 `this.myObject.newProperty = 'hi'`)

- 示例：

```vue
wepy.set(this.myObject, 'newProperty', 'hi')
// 或者在 `wepy.component` `wepy.page` `wepy.app`中使用
this.$set(this.myObject, 'newProperty', 'hi')

```

### vm.$delete

`wepy.delete` 的别名 

- 参数：
  - {Object | Array} target
  - {string | number} propertyName/index

- 用法：
删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 wepy 不能检测到 property 被删除的限制。
- 示例：

```vue
wepy.delete(this.myObject, 'newProperty')
// 或者在 `wepy.component` `wepy.page` `wepy.app`中使用
this.$delete(this.myObject, 'newProperty')
```

## 事件
### vm.$on

- 用法：  
监听当前实例上的自定义事件。事件可以由 vm.$emit 触发。回调函数会接收所有传入事件触发函数的额外参数。

- 示例：

```vue
vm.$on('test', function (msg) {
  console.log(msg)
})
vm.$emit('test', 'hi')
// => "hi"
```


### vm.$once
- 用法： 
同`$on`,监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。

### vm.$emit

在 `wepy` 的eventBus中如果已经使用`$on`或者`$once`监听了相应的事件，则会触发对应的事件。否则触发 `wx.triggerEvent`

- 参数：
  - {string} eventName
  - [...args]


### vm.$off
- 用法：
移除自定义事件监听器。

  - 如果没有提供参数，则移除所有的事件监听器；

  - 如果只提供了事件，则移除该事件所有的监听器；

  - 如果同时提供了事件与回调，则只移除这个回调的监听器。

### vm.$trigger
等同于 `wx.triggerEvent`

## 生命周期
### vm.$nextTick
将回调延迟到下次视图更新循环之后执行。在修改数据之后立即使用它，然后等待视图更新。它跟全局方法 `wepy.nextTick` 一样。

### vm.$forceUpdate
迫使 wepy 实例重新渲染