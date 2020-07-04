# 混入

混入 (mixin) 提供了一种非常灵活的方式，来分发 wepy 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

## 示例

---
- ```test.js```

```javascript
export default {
  data: {
    mixin: 'MixinText'
  },
  methods: {
    mixintap () {
      this.mixin = 'MixinText' + (Math.random() + '').substring(3, 7);
      console.log('mixin method tap');
    },
    tap () {
      console.log('tap in mixin');
    }
  },
  created () {
    console.log('created in mixin');
  }
}

```

- ```pageA.wpy```

```vue
<template>
  <div @click="mixintap">{{ mixin }}</div>
</template>

<script>
import wepy from '@wepy/core'
import testMixin from '../mixins/test.js'

wepy.page({
  mixins: [ testMixin ]
})
</script>
```