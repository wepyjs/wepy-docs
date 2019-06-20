# Hook

内置钩子事件，方便开发者可以对内置流程的控制。
Hook 既可以在申明 App 时注册，此时可注册为 `AppHook`。也可以在申明 Page/Component 时注册，此时注册为 ``组件 Hook``。Hook 只会接受一个系统传入的参数，可以通过进行参数修改然后将参数返回，来改变原有执行逻辑。无返回值时，会将参数原路返回。
如果同时存在 `AppHook` 和 `组件 Hook 时`，优先执行 `组件 Hook`，并会将 `组件 Hook` 的返回值作为入参传入给 `AppHook`。

内置 Hook 如下

## before-event

在用户注册的 `@tap`，`@change` 等等全部事件响应前触发。返回 `false` 时会取消该事件的响应。

** 入参 **
```
{
   event: Object, // 用户响应事件
   params: Array // 事件参数列表
}
```

** 示例 **

```
// app.js
wepy.app({
  'before-event': function (data) {
    console.log(`Its's a ${data.event.type} event, there are ${data.params.length} arguments`);
  }
});
```

** 用途 **
可以用于统一事件处理，或者事件过滤。比如需要在每个按钮点击事件时进行数据上报则可以使用这个 Hook。


## before-setData

在进行数据绑定之前触发，返回 `false` 时会取消该时事件绑定（但并不会回退实例数据，需手动回退）。

** 入参 **
Dirty: 一组即将被 setData 的 K-V 数据。

** 示例 **
```
wepy.app({
  'before-setData': function (dirty) {
    console.log(`Dirty data is ${JSON.stringify(dirty)}`);
    if (Math.random() < 0.2) {
      console.log('setData canceled');
      return false; // Cancel setData
    }
  }
});
```
** 用途 **
可以让用户对于即将 setData 的数据进行处理，开发时可以打印数据，方便进行调试与性能调优。


