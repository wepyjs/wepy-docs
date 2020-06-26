# Prop
组件的对外属性，是属性名到属性设置的映射表
> 注意：在 properties 定义段中，属性名采用驼峰写法（propertyName）；在 wxml 中，指定属性值时则对应使用连字符写法（component-tag-name property-name="attr value"），应用于数据绑定时采用驼峰写法（attr=""）
## 类型
**与vue中不同的是,** 小程序自定义组件中，属性的类型可以为 `String` `Number` `Boolean` `Object` `Array` 其一，也可以为 `null` 表示不限制类型。  
在wepy中，当type为多个类型时，将会被置为`null`。
## 传递静态或动态的prop
传入一个静态的值：

```vue
<custom-component title="here is the wepy" />

```
传入一个动态的值：

```vue
<custom-component :title="title" />
<script>
import wepy from '@wepy/core'

wepy.page({
    data: {
        title: 'here is the wepy'
    }
})
</script>
```

**在wepy中，当prop和properties同时设置时，prop将被忽略**
