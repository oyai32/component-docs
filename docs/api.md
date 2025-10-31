# API 文档

本文档自动生成自 `src/components` 目录下的组件源码。

> 📝 **提示**: 本文档会自动更新，修改组件后运行 `npm run api:generate` 即可重新生成。

## 目录

- [Button](#button)
- [Input](#input)

---

## Button

### Props

| 参数 | 类型 | 默认值 | 是否必填 | 说明 |
|------|------|--------|---------|------|
| type | `'primary' | 'secondary' | 'danger' | 'success'` | 'primary' | 否 | 按钮类型 |
| size | `'small' | 'medium' | 'large'` | 'medium' | 否 | 按钮大小 |
| disabled | `boolean` | false | 否 | 是否禁用 |
| block | `boolean` | false | 否 | 是否为块级元素 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| click | `event: MouseEvent` | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 默认 插槽 |


---

## Input

### Props

| 参数 | 类型 | 默认值 | 是否必填 | 说明 |
|------|------|--------|---------|------|
| type | `'text' | 'password' | 'email' | 'number'` | 'text' | 否 | 输入框类型 |
| label | `string` | - | 否 | 标签文本 |
| placeholder | `string` | - | 否 | 占位符 |
| disabled | `boolean` | false | 否 | 是否禁用 |
| error | `string` | - | 否 | 错误信息 |
| size | `'small' | 'medium' | 'large'` | 'medium' | 否 | 输入框大小 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| focus | `event: FocusEvent` | - |
| blur | `event: FocusEvent` | - |

### Slots

无


---

