# 计算属性和侦听器


## computed

### 支持的语法：

```vue
<div id="example">
    <p>Original message: "{{ message }}"</p>
    <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
<script>
import wepy from '@wepy/core';

wepy.page({
    data: {
        message: 'Hello'
    },
    computed: {
        // 计算属性的 getter
        reversedMessage: function () {
            return this.message.split('').reverse().join('')
        }
    }
})
</script>

```
你可以像绑定 data 中的 property 一样在模板中绑定计算属性。wepy 知道 reversedMessage 依赖于 message，因此当 message 发生改变时，所有依赖 reversedMessage 的绑定也会更新。而且最妙的是我们已经以声明的方式创建了这种依赖关系：计算属性的 getter 函数是没有副作用 (side effect) 的，这使它更易于测试和理解。

#### 计算属性的 setter
计算属性默认只有 getter，不过在需要时你也可以提供一个 setter：
```vue
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```
运行 this.fullName = 'John Doe' 时，setter 会被调用，this.firstName 和 this.lastName 也会相应地被更新。

## watch
当需要在数据变化时执行异步操作时，我们可以使用 watch
```vue
<div id="example">
    <p>Original message: "{{ message }}"</p>
</div>
<script>
import wepy from '@wepy/core'

wepy.page({
    data: {
        message: 'Hello'
    },
    watch: {
        message: function (newVal, oldVal) {
            console.log(newVal, oldVal)
        }
    }
})
</script>

```