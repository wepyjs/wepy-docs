# 条件渲染

WePY 兼顾原生小程序语法与 Vue 绑定语法

## 原生小程序语法

---

- ```wx:if```

```vue
// example 01
<div wx:if="{{ condition }}"></div>

// example 02
<div wx:if="{{ condition2 }}"></div>
<div wx:else></div>

// example 03
<div wx:if="{{ condition3 }}"></div>
<div wx:elif="{{ condition4 }}"></div>
<div wx:else></div>
```

- ```hidden```

```vue
<div hidden="{{ condition }}"></div>
```

## Vue 绑定语法

---

- ```v-if```

```vue
// example 01
<div v-if="condition"></div>

// example 02
<div v-if="condition2"></div>
<div v-else></div>

// example 03
<div v-if="condition3"></div>
<div v-else-if="condition4"></div>
<div v-else></div>
```

编译后：

```vue
// example 01
<view wx:if="{{ condition }}"></view>

// example 02
<view wx:if="{{ condition2 }}"></view>
<view wx:else></view>

// example 03
<view wx:if="{{ condition3 }}"></view>
<view wx:elif="{{ condition4 }}"></view>
<view wx:else></view>
```

- ```v-show```

```vue
<div v-show="condition"></div>
```

编译后：

```vue
<view hidden="{{ !condition }}"></view>
```
