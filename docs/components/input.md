# Input 输入框

输入框组件用于数据输入。

## 基础用法

<demo src="../../../demo/examples/InputDemo.vue" />

## API

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | 'text' \| 'password' \| 'email' \| 'number' | 'text' | 输入框类型 |
| label | string | - | 标签文本 |
| placeholder | string | - | 占位符 |
| disabled | boolean | false | 是否禁用 |
| error | string | - | 错误信息 |
| size | 'small' \| 'medium' \| 'large' | 'medium' | 输入框大小 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | (value: string) | 值更新事件 |
| focus | (event: FocusEvent) | 获得焦点事件 |
| blur | (event: FocusEvent) | 失去焦点事件 |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 输入框内容 |

## 使用示例

```vue
<template>
  <Input 
    v-model="value" 
    label="用户名" 
    placeholder="请输入用户名"
    @focus="handleFocus"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Input } from '@/components'

const value = ref('')

const handleFocus = () => {
  console.log('输入框获得焦点')
}
</script>
```
