<template>
  <div class="counter-demo">
    <div class="demo-section">
      <h3>设置最小值和最大值</h3>
      <Counter :model-value="5" :min="0" :max="10" label="范围 0-10" />
    </div>

    <div class="demo-section">
      <h3>自定义步长</h3>
      <Counter :model-value="0" :step="5" label="步长 5" />
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

</style>
