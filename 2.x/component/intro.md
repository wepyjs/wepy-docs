# 介绍

## 基本示例

---

这里有一个 WePY 组件的示例：

```vue
<template>
    <button v-on:click="count++">You clicked me {{ count }} times.</button>
</template>

<script>
  import wepy from '@wepy/core'

  wepy.component({
    data: {
      count: 0
    }
  })
</script>
```

组件是可复用的 ```WePY component``` 实例，且带有一个名字：在这个例子中是 ```<button-counter>```。我们可以在一个通过 ```wepy.page``` 创建的页面实例中，把这个组件作为自定义元素来使用：

```vue
<config>
{
  "usingComponents": {
    "button-counter": "../components/button-counter"
  }
}
</config>

<template>
  <div class="page-a">
    <div>{{ text }}</div>
    <button-counter></button-counter>
  </div>
</template>

<script>
  import wepy from '@wepy/core'

  wepy.page({
    text: 'hello'
  })
</script>

```

## 使用组件

---

!> 与 WePY 1.7.x 版本不同的是，2.0.x 版本后使用已注册的组件前，首先要在页面的 ```config``` 中的 ```usingComponents``` 字段进行引用声明，这里使用方式与原生小程序组件[使用自定义组件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)方式相仿。

### 路径规则

- 如果路径是绝对路径 (例如 ```/components/button-counter```)，会原样保留

- 如果路径以```.```开头，将会被看作相对的模块依赖，并按照你的本地文件系统上的目录结构进行解析。

- 如果路径以```~```开头。如果你在[编译配置文件](/cli/config.md?id=resolve)中配置了 ```alias```，这将变得很有用。所有 ```@wepy/cli``` 创建的项目都默认配置了将 ```@``` 指向 ```/src```。

```vue
<config>
{
  "usingComponents": {
    "button-counter": "~@/components/button-counter"
  }
}
</config>
```

- 如果路径以 ```module:``` 开头。将会被看作模块依赖。这意味着你可以用该特性来引入第三方 NPM 组件：

```vue
<config>
{
  "usingComponents": {
    "some-3rd-party-component": "module:some-3rd-party-component"
  }
}
</config>
```

- 如果路径以 ```plugins:``` 开头。将会被看作小程序插件提供的自定义组件模块依赖。这意味着你可以使用该特性来引入小程序插件中的自定义组件：

```vue
<config>
{
  "usingComponents": {
    "3rd-plugin-component": "plugins://appid/3rd-plugin-component"
  }
}
</config>
```
