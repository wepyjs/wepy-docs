# 状态管理

在 Vue 项目中，状态管理方案可以选择使用 [Vuex](https://vuex.vuejs.org/)。而 `Vuex` 是可以直接在 WePY 项目当中使用的。唯一的一点不同就是在小程序中，需要在监听到 `state` 值被改变后触发小程序的渲染。这一部分逻辑被封装至 [@wepy/x](https://github.com/Tencent/wepy/tree/2.0.x/packages/x) 包中。

## @wepy/x

WePY 中使用的 Vuex 版本，可以使用 Vuex 的全部功能。

Vuex 使用示例模板:
```
wepy init standard#2.0.x standard
```

详细文档参考：

[@wepy/x](https://github.com/Tencent/wepy/tree/2.0.x/packages/x)

[Vuex](https://vuex.vuejs.org/)



