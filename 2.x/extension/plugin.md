# 插件

插件通常用来为 WePY 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：

1. 一个库，提供自己的 API。如：```@wepy/use-promisify```
2. 通过全局混入来添加一些功能。如 ```@wepy/x```

## 使用插件

---

通过全局方法 ```wepy.use()``` 使用插件。它需要在你调用 ```wepy.app``` 启动应用之前完成：

```vue
// app.wpy

<script>
import wepy from 'wepy'
import MyPlugin from 'xxx'

wepy.use(MyPlugin)

wepy.app({
  // ...
})
</script>

```

也可以传入一个可选的选项对象：

```javascript
wepy.use(MyPlugin, { someOption: true })
```

```wepy.use``` 会自动阻止多次注册相同插件，届时即使多次调用也只会注册一次该插件。

## 开发插件

---

WePY 的插件应该暴露一个 install 方法。这个方法的第一个参数是 ```@wepy/core``` 的默认导出对象，第二个参数是一个可选的选项对象：

```javascript
MyPlugin.install = function (wepy, options) {
  // 1. 添加全局方法或属性
  wepy.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 注入组件选项
  wepy.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })
}
```
