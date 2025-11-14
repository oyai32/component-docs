## 安装
```bash
npm install @oyai32/counter
```
## 使用方式

### 方式1: 按需引入（推荐）
```vue
<template>
  <Counter :initial-value="10" />
</template>

<script setup>
import { Counter } from '@oyai32/counter'
import '@oyai32/counter/style.css'
</script>
```

### 方式2: 全局注册
```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import Counter from '@oyai32/counter'
import '@oyai32/counter/style.css'

const app = createApp(App)
app.use(Counter)
app.mount('#app')
```

然后在任意组件中使用：

```vue
<template>
  <Counter :initial-value="0" />
</template>
```

### 方式 3: UMD 方式（浏览器直接引入）

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/vue@3"></script>
  <link rel="stylesheet" href="https://unpkg.com/@oyai32/counter/style.css" />
  <script src="https://unpkg.com/@oyai32/counter"></script>
</head>
<body>
  <div id="app">
    <counter :initial-value="0"></counter>
  </div>
  
  <script>
    const { createApp } = Vue
    
    createApp({
      // 组件已自动注册
    }).mount('#app')
  </script>
</body>
</html>
```

## 依赖

本组件依赖以下库（需要在项目中安装）：

- `vue` ^3.3.0
- `element-plus` ^2.8.0
- `@element-plus/icons-vue` ^2.3.1

确保你的项目已安装这些依赖：

```bash
npm install vue element-plus @element-plus/icons-vue
```
