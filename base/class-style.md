# Class 与 Style 绑定

WePY 兼顾原生小程序语法与 Vue 绑定语法

## 原生小程序语法

---

!> 原生小程序是使用花括号（Mustache 语法）来实现动态绑定的，使用原生方式绑定时，模板中不能使用 ```:class``` 属性

错误例子

```vue
<div :class="{{ activeClassName }}">
```

正确例子
```vue
<div class="{{ activeClassName }}">
```

其它原生绑定方式可参考 [原生小程序模板语法](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/data.html)


## Vue 绑定语法

---

### 绑定 Class

支持的语法：

```vue
<div class="container" :class="{ 'active': active }"></div>
```

编译后：

```vue
<view class="container {{ [ active ? 'active' : '' ] }}"></view>
```

### 绑定 Style

支持的语法：

```vue
<div class="container" :style="{ color: color, fontSize: fontSize }"></div>

// 或者
<div class="container" :style="{ color: color, 'font-size': fontSize }"></div>
```

编译后：

```vue
<view class="container" style="{{ 'color:' + color + ';' + 'font-size:' + fontSize + ';' }}"></view>
```