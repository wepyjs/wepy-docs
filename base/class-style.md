# Class 与 Style 绑定

WePY 推荐使用 `:class`，`:style` 进行样式属性绑定

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
