<template>
  <div class="input-demo">
    <h2>Input 组件示例</h2>
    
    <div class="demo-section">
      <h3>基础用法</h3>
      <div class="demo-row">
        <Input v-model="basicValue" placeholder="请输入内容" />
        <p>当前值: {{ basicValue }}</p>
      </div>
    </div>
    
    <div class="demo-section">
      <h3>带标签</h3>
      <div class="demo-row">
        <Input 
          v-model="labelValue" 
          label="用户名" 
          placeholder="请输入用户名" 
        />
      </div>
    </div>
    
    <div class="demo-section">
      <h3>不同尺寸</h3>
      <div class="demo-row">
        <Input v-model="sizeValue" size="small" placeholder="小尺寸" />
        <Input v-model="sizeValue" size="medium" placeholder="中尺寸" />
        <Input v-model="sizeValue" size="large" placeholder="大尺寸" />
      </div>
    </div>
    
    <div class="demo-section">
      <h3>不同类型</h3>
      <div class="demo-row">
        <Input v-model="typeValue" type="text" placeholder="文本输入" />
        <Input v-model="typeValue" type="password" placeholder="密码输入" />
        <Input v-model="typeValue" type="email" placeholder="邮箱输入" />
        <Input v-model="typeValue" type="number" placeholder="数字输入" />
      </div>
    </div>
    
    <div class="demo-section">
      <h3>禁用状态</h3>
      <div class="demo-row">
        <Input v-model="disabledValue" disabled placeholder="禁用输入框" />
      </div>
    </div>
    
    <div class="demo-section">
      <h3>错误状态</h3>
      <div class="demo-row">
        <Input 
          v-model="errorValue" 
          placeholder="错误输入框" 
          error="请输入正确的格式" 
        />
      </div>
    </div>
    
    <div class="demo-section">
      <h3>事件处理</h3>
      <div class="demo-row">
        <Input 
          v-model="eventValue" 
          placeholder="事件输入框"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <p>事件日志: {{ eventLog }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Input from '@/components/Input.vue'

const basicValue = ref('')
const labelValue = ref('')
const sizeValue = ref('')
const typeValue = ref('')
const disabledValue = ref('禁用状态')
const errorValue = ref('')
const eventValue = ref('')
const eventLog = ref('')

const handleFocus = () => {
  eventLog.value = '输入框获得焦点'
}

const handleBlur = () => {
  eventLog.value = '输入框失去焦点'
}
</script>

<style scoped>
.input-demo {
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
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}

.demo-row p {
  margin: 0;
  color: #666;
  font-size: 14px;
}
</style>
