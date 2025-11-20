<template>
  <div class="counter">
    <div class="counter-display">
      <span class="counter-label">{{ label }}</span>
      <span class="counter-value">{{ count }}</span>
    </div>
    <div class="counter-actions">
      <el-button 
        type="danger" 
        @click="decrease" 
        :disabled="disabled || count <= min"
      >
        <el-icon v-if="showIcon"><Minus /></el-icon>
        {{ decreaseText }}
      </el-button>
      <el-button 
        v-if="showReset"
        @click="reset" 
        :disabled="disabled"
      >
        重置
      </el-button>
      <el-button 
        type="success" 
        @click="increase" 
        :disabled="disabled || count >= max"
      >
        <el-icon v-if="showIcon"><Plus /></el-icon>
        {{ increaseText }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Counter'
}
</script>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { Minus, Plus } from '@element-plus/icons-vue'

export interface CounterProps {
  /** 初始值 */
  modelValue?: number
  /** 最小值 */
  min?: number
  /** 最大值 */
  max?: number
  /** 步长 */
  step?: number
  /** 标签文本 */
  label?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否显示图标 */
  showIcon?: boolean
  /** 是否显示重置按钮 */
  showReset?: boolean
  /** 增加按钮文本 */
  increaseText?: string
  /** 减少按钮文本 */
  decreaseText?: string
}

const props = withDefaults(defineProps<CounterProps>(), {
  modelValue: 0,
  min: -Infinity,
  max: Infinity,
  step: 1,
  label: '计数',
  disabled: false,
  showIcon: true,
  showReset: false,
  increaseText: '增加',
  decreaseText: '减少'
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

const count = ref(props.modelValue)

const increase = () => {
  if (count.value < props.max) {
    count.value = Math.min(count.value + props.step, props.max)
    emit('update:modelValue', count.value)
    emit('change', count.value)
  }
}

const decrease = () => {
  if (count.value > props.min) {
    count.value = Math.max(count.value - props.step, props.min)
    emit('update:modelValue', count.value)
    emit('change', count.value)
  }
}

const reset = () => {
  const resetValue = props.modelValue || 0
  count.value = resetValue
  emit('update:modelValue', count.value)
  emit('change', count.value)
}

// 监听外部 modelValue 变化
watch(() => props.modelValue, (newVal) => {
  if (newVal !== undefined && newVal !== count.value) {
    count.value = newVal
  }
}, { immediate: true })
</script>

<style scoped>
.counter {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  background: #fff;
}

.counter-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.counter-label {
  font-size: 14px;
  color: #666;
}

.counter-value {
  font-size: 32px;
  font-weight: bold;
  color: #007bff;
  min-width: 60px;
  text-align: center;
}

.counter-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>

