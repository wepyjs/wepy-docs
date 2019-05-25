# 列表渲染

WePY 兼顾原生小程序语法与 Vue 绑定语法

## 原生小程序语法

---

```vue
// example 01
<div wx:for="{{array}}">{{index}}: {{item.message}}</div>

// example 02
<div wx:for="{{array}}" wx:for-index="idx" wx:for-item="itemName">
  {{idx}}: {{itemName.message}}
</div>
```

## Vue 绑定语法

---

编译前：

```vue
// example 01
<div v-for="item in array">{{index}}: {{item.message}}</div>

// example 02
<div v-for="(item, idx) in array">
  {{idx}}: {{itemName.message}}
</div>
```

编译后：

```vue
// example 01
<view wx:for="{{array}}">{{index}}: {{item.message}}</view>

// example 02
<view wx:for="{{array}}" wx:for-index="idx" wx:for-item="itemName">
  {{idx}}: {{itemName.message}}
</view>
```
