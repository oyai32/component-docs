<template>
  <div class="counter-demo">
    <div class="demo-section">
      <h3>基础用法</h3>
      <Counter v-model="count" label="当前值" />
      <p>当前计数: {{ count }}</p>
    </div>
    
    <div class="demo-section">
      <h3>禁用状态</h3>
      <Counter :model-value="5" label="已禁用" :disabled="true" />
    </div>

    <div class="demo-section">
      <h3>显示重置按钮</h3>
      <Counter :model-value="0" label="可重置" :show-reset="true" />
    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Counter from '@/components/Counter.vue'

const count = ref(0)
</script>

<style scoped>
.counter-demo {
  padding: 20px;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fafafa;
}

.demo-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
  font-size: 16px;
}

.demo-section p {
  margin: 10px 0 0;
  color: #666;
  font-size: 14px;
}
</style>
