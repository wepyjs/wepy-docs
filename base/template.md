# 模板语法

**WePY 继承了 WXML 的基本模板语法，并支持大部分 Vue 模板语法。**

> WXML（WeiXin Markup Language）是框架设计的一套标签语言，用来描述小程序页面的结构

同时，WePY 允许你使用大部分 HTML 模板标签，经编译器编译后，会将模板标签的转换成标准的 WXML 模板语法。

## 模板标签

---

### 转换流程

![image](https://user-images.githubusercontent.com/16918885/57763087-4cf9fd80-7733-11e9-8c7d-43a19ea484c9.png)



### HTML 模板标签映射表

| 标签 | 转换后 |
| -- | -- |
| select | picker | 
| datalist | picker | 
| img | image | 
| source | audio | 
| video | video | 
| track | video | 
| a | navigator | 
| span | label | 
| 其它 | view | 

## 数据绑定

---

!> 以下案例均使用 HTML 模板标签作为参考

### 文本

数据绑定最常见的形式就是使用“Mustache”语法 (双大括号) 的文本插值：

```html
<div>hello, {{ name }}</div>
```

Mustache 标签将会被替代为对应数据对象上 ```name``` 属性的值。无论何时，绑定的数据对象上 ```name``` 属性发生了改变，插值处的内容都会更新。

### 组件属性

- 使用 ```v-bind``` 指令

```vue
<div v-bind:id="id"></div>
```
此时不能使用 ```Mustache``` 语法

- 使用 **原生小程序** 的方式

```vue
<div id="{{ id }}"></div>
```

此时必须使用 ```Mustache``` 语法

### 控制属性

- 使用 ```v-if``` 指令

```vue
<div v-if="condition"></div>
```
此时不能使用 ```Mustache``` 语法

- 使用 **原生小程序** 的方式

```vue
<div wx:if="{{ condition }}"></div>
```

此时必须使用 ```Mustache``` 语法

### 事件

两种方式均不能使用 ```Mustache``` 语法

- 使用 ```v-on``` 指令

```vue
<div v-on:tap="tapHandler"></div>
```

- 使用 **原生小程序** 的方式

```vue
<div bindtap="tapHandler"></div>
```

### 运算

可以在 ```{{}}``` 内进行简单的运算，目前支持原生小程序的所有运算方式，如下：

#### 三元运算

```vue
{{ ok ? 'YES' : 'NO' }}
```

#### 算数运算

```vue
{{ a + b }}
```

#### 逻辑判断

```vue
{{ length > 5 }}
```

#### 字符串运算

```vue
{{ "hello" + name }}
```

#### 数据路径运算

```vue
{{ object.key }}
{{ array[0] }}
```

#### 组合

也可以在 Mustache 内直接进行组合，构成新的对象或者数组，详情请阅读 [小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/data.html)
