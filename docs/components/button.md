# Button 按钮

按钮组件用于触发操作。

## 基础用法

<demo src="../../../demo/examples/ButtonDemo.vue" />

## API

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| type | 'primary' \| 'secondary' \| 'danger' \| 'success' | 'primary' | 按钮类型 |
| size | 'small' \| 'medium' \| 'large' | 'medium' | 按钮大小 |
| disabled | boolean | false | 是否禁用 |
| block | boolean | false | 是否为块级元素 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | (event: MouseEvent) | 点击事件 |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 按钮内容 |

## 使用示例

```vue
<template>
  <Button type="primary" @click="handleClick">
    点击我
  </Button>
</template>

<script setup>
import { Button } from '@/components'

const handleClick = () => {
  console.log('按钮被点击了!')
}
</script>
```
