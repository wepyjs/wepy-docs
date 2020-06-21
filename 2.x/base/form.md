# 表单输入绑定
v-model 本质上是语法糖，它会根据控件类型自动选取正确的方法来更新元素
- input 和 textarea 元素使用 value 作为 prop ，并通过 input 事件触发 v-model 属性值的更新。
- picker，checkbox-group，radio-group 元素将使用 value 作为 prop ，并通过 change 事件触发 v-model 属性值的更新。
- switch 元素将使用 checked 作为 prop ，并通过 change 事件触发 v-model 属性值的更新。

## 基础用法
### 输入框 input

```vue
<input v-model="inputmodel" />
<script>
import wepy from '@wepy/core';

wepy.page({
    data: {
        inputmodel: ''
    }
})
</script>
```
### 多行文本 textarea

```vue
<textarea v-model="inputmodel" />
<script>
import wepy from '@wepy/core';

wepy.page({
    data: {
        inputmodel: ''
    }
})
</script>
```
### picker 

```vue 
<picker v-model="pickermodel" range="{{array}}">
    <div class="picker">
        当前选择：{{pickermodel}}
    </div>
</picker>
<script>
import wepy from '@wepy/core';

wepy.page({
    data: {
        array: ['美国', '中国', '巴西', '日本'],
        pickermodel: ''
    }
})
</script>

```
### switch

```vue
<switch v-model="switchmodel" />
<script>
import wepy from '@wepy/core';

wepy.page({
    data: {
        switchmodel: ''
    }
})
</script>
```
### radio
小程序的radio目前不支持 `change` 事件, 请使用`radio-group`标签

```vue
<radio-group v-model="radiomodel">
    <label>
        <div>
            <radio value="美国"></radio>
        </div>
    </label>
</radio-group>
<script>
import wepy from '@wepy/core';

wepy.page({
    data: {
        radiomodel: ''
    }
})
</script>
```
### checkbox
小程序的checkbox目前不支持 `change` 事件, 请使用`checkbox-group`标签

```vue
<checkbox-group v-model="checkboxmodel">
    <label>
        <div>
            <checkbox value="美国"></checkbox>
        </div>
    </label>
</checkbox-group>
<script>
import wepy from '@wepy/core';

wepy.page({
    data: {
        checkboxmodel: ''
    }
})
</script>
```
