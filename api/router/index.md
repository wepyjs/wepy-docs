# 路由
在`wepy.page`中，`this`上挂载了以下路由方法，可以便捷的操作页面跳转

# $launch
关闭所有页面，打开到应用内的某个页面

- 类型：`string | {Object} options`
- 用法：
```
this.$launch('/page/home/home', {
    type: 'wepy'
})
// 也可以使用
this.$launch({
    url: '/page/home/home?type=wepy',
    fail: () => {},
    success: () => {}
})
```

# $navigate
保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 this.$back 可以返回到原页面。小程序中页面栈最多十层。

- 类型：`string | {Object} options`
- 用法：
```
this.$navigate('/page/home/home', {
    type: 'wepy'
})
// 也可以使用
this.$navigate({
    url: '/page/home/home?type=wepy',
    fail: () => {},
    success: () => {}
})
```

# $redirect
关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。

- 类型：`string | {Object} options`
- 用法：
```
this.$redirect('/page/home/home', {
    type: 'wepy'
})
// 也可以使用
this.$redirect({
    url: '/page/home/home?type=wepy',
    fail: () => {},
    success: () => {}
})
```

# $back
关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。

- 类型：`number`
- 默认值：`1`
- 用法：
```
this.$back(1)
```