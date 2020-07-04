## wepy.nextTick

- 参数：
  - {Function} [callback]
  - {Object} [context]
- 用法：
延迟一部分操作到下一个时间片再执行。
- 示例：
```
// 修改数据
this.msg = 'Hello'
// 作为一个 Promise 使用
wepy.nextTick()
.then(function () {
    // do something
})
```

## wepy.set

- 用法：

向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 wepy 无法探测普通的新增 property (比如 `this.myObject.newProperty = 'hi'`)

- 示例：

```vue
wepy.set(this.myObject, 'newProperty', 'hi')
// 或者在 `wepy.component` `wepy.page` `wepy.app`中使用
this.$set(this.myObject, 'newProperty', 'hi')

```
## wepy.delete
- 用法：

删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 wepy 不能检测到 property 被删除的限制。
- 示例：

```vue
wepy.delete(this.myObject, 'newProperty')
// 或者在 `wepy.component` `wepy.page` `wepy.app`中使用
this.$delete(this.myObject, 'newProperty')
```

## wepy.use
- 参数：

  - {Object | Function} plugin

- 用法：

安装 wepy 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。  
当 install 方法被同一个插件多次调用，插件将只会被安装一次。

- 参考：
  - [use-promisify](https://github.com/Tencent/wepy/tree/2.0.x/packages/use-promisify)
  - [use-intercept](https://github.com/Tencent/wepy/tree/2.0.x/packages/use-intercept)
  - [vuex](https://github.com/Tencent/wepy/tree/2.0.x/packages/x)

## wepy.mixin

- 用法：

混入 (mixin) 提供了一种非常灵活的方式，来分发 wepy 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。`wepy.mixin`将进行全局注册混入。使用时格外小心！一旦使用全局混入，它将影响每一个之后创建的`wepy.component` `wepy.page` `wepy.app`。

- 合并策略：

自定义选项将使用默认策略，即简单地覆盖已有值（[simpleMerge](https://github.com/Tencent/wepy/blob/2.0.x/packages/core/weapp/init/mixins.js#L52)）。

- 示例：

```vue
// 定义一个混入对象
var myMixin = {
  onLoad: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}
wepy.mixin(myMixin)

```

## wepy.version

提供字符串形式的 wepy 安装版本号。你可以根据不同的版本号采取不同的策略。
```vue
const version = Number(wepy.version.split('.')[0])
```

