# 混入

参考 [Vue 官方文档](https://cn.vuejs.org/v2/guide/mixins.html)

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