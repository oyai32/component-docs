<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClass"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <div v-if="error" class="input-error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface InputProps {
  /** 输入框类型 */
  type?: 'text' | 'password' | 'email' | 'number'
  /** 标签文本 */
  label?: string
  /** 占位符 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 错误信息 */
  error?: string
  /** 输入框大小 */
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  size: 'medium'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const inputClass = computed(() => {
  return [
    'input',
    `input-${props.size}`,
    {
      'input-disabled': props.disabled,
      'input-error': props.error
    }
  ]
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input-label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.input {
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;
}

.input:focus {
  border-color: #007bff;
}

.input-disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.input-error {
  border-color: #dc3545;
}

.input-small {
  padding: 4px 8px;
  font-size: 12px;
}

.input-medium {
  padding: 8px 12px;
  font-size: 14px;
}

.input-large {
  padding: 12px 16px;
  font-size: 16px;
}

.input-error {
  color: #dc3545;
  font-size: 12px;
}
</style>
