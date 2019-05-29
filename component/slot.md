# 插槽

用法参考 [vue官方文档](https://cn.vuejs.org/v2/guide/components-slots.html)

## 支持的功能

---

- 插槽内容

- 编译作用域

- 具名插槽

!> 在 WePY 中使用具名插槽需要增加 ```multipleSlots``` 属性:

```vue
wepy.component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  }
})
```

## 暂不支持的功能

---

- 后备内容

- 作用域插槽

- 动态插槽名