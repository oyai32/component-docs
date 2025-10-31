<template>
  <div class="button-demo">
    <h2>Button 组件示例</h2>
    
    <div class="demo-section">
      <h3>基础用法</h3>
      <div class="demo-row">
        <Button>默认按钮</Button>
        <Button type="primary">主要按钮</Button>
        <Button type="secondary">次要按钮</Button>
        <Button type="danger">危险按钮</Button>
        <Button type="success">成功按钮</Button>
      </div>
    </div>
    
    <div class="demo-section">
      <h3>不同尺寸</h3>
      <div class="demo-row">
        <Button size="small">小按钮</Button>
        <Button size="medium">中按钮</Button>
        <Button size="large">大按钮</Button>
      </div>
    </div>
    
    <div class="demo-section">
      <h3>禁用状态</h3>
      <div class="demo-row">
        <Button disabled>禁用按钮</Button>
        <Button type="primary" disabled>禁用主要按钮</Button>
      </div>
    </div>
    
    <div class="demo-section">
      <h3>块级按钮</h3>
      <div class="demo-row">
        <Button block>块级按钮</Button>
      </div>
    </div>
    
    <div class="demo-section">
      <h3>事件处理</h3>
      <div class="demo-row">
        <Button @click="handleClick">点击我</Button>
        <p>点击次数: {{ clickCount }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from '@/components/Button.vue'

const clickCount = ref(0)

const handleClick = () => {
  clickCount.value++
  console.log('按钮被点击了!')
}
</script>

<style scoped>
.button-demo {
  padding: 20px;
}

.demo-section {
  margin-bottom: 30px;
}

.demo-section h3 {
  margin-bottom: 15px;
  color: #333;
}

.demo-row {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.demo-row p {
  margin: 0;
  color: #666;
}
</style>
