# 列表渲染

WePY 2 推荐使用 Vue `v-for` 指令进行列表渲染


## WePY 推荐语法 

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
