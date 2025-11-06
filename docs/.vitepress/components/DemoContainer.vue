<template>
  <div class="demo-container">
    <div class="demo-preview">
      <component v-if="component" :is="component" />
      <div v-else-if="error" class="error">
        <p>组件加载失败</p>
        <p class="error-message">{{ error }}</p>
      </div>
      <div v-else class="loading">加载中...</div>
    </div>
    
    <div class="demo-toolbar">
      <button @click="toggleCode" class="toolbar-btn">
        <el-icon>
          <component :is="showCode ? ArrowUp : ArrowDown" />
        </el-icon>
        {{ showCode ? '隐藏' : '显示' }}代码
      </button>
      <button v-if="showCode && sourceCode" @click="copyCode" class="toolbar-btn" :class="{ 'copied': copySuccess }">
        <el-icon>
          <component :is="copySuccess ? Check : DocumentCopy" />
        </el-icon>
        {{ copySuccess ? '已复制' : '复制代码' }}
      </button>
    </div>
    
    <div v-if="showCode && sourceCode" class="demo-code-wrapper">
      <div class="demo-code">
        <pre class="line-numbers"><code class="language-vue" ref="codeElement">{{ sourceCode }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { ArrowUp, ArrowDown, DocumentCopy, Check } from '@element-plus/icons-vue'

interface Props {
  /** demo 组件路径，格式：demo/examples/BaseDemo.vue */
  src: string
  /** 是否默认展开代码 */
  defaultExpand?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultExpand: false
})

const component = ref<any>(null)
const sourceCode = ref('')
const showCode = ref(props.defaultExpand)
const error = ref<string | null>(null)
const copySuccess = ref(false)
const codeElement = ref<HTMLElement | null>(null)

// 使用 import.meta.glob 预先加载所有 demo 组件和源码
// 使用 eager: true 立即加载，创建映射关系
const demoModules = import.meta.glob('../../../demo/examples/*.vue', { eager: true })
const demoRawModules = import.meta.glob('../../../demo/examples/*.vue', { 
  as: 'raw',
  eager: true 
})

// 创建路径映射：标准化路径 -> 组件/源码
const componentMap = new Map<string, any>()
const sourceCodeMap = new Map<string, string>()

// 初始化映射关系
Object.keys(demoModules).forEach(key => {
  const fileName = key.split('/').pop() || ''
  
  // 只支持 demo/examples/BaseDemo.vue 格式
  const path = `demo/examples/${fileName}`
  
  const module = demoModules[key] as any
  const componentValue = module.default || module
  
  componentMap.set(path, componentValue)
  
  console.log(`已注册组件映射: ${path}`)
})

// 初始化源码映射关系
Object.keys(demoRawModules).forEach(key => {
  const fileName = key.split('/').pop() || ''
  
  // 只支持 demo/examples/BaseDemo.vue 格式
  const path = `demo/examples/${fileName}`
  
  const rawContent = demoRawModules[key] as string
  
  sourceCodeMap.set(path, rawContent)
  
  console.log(`已注册源码映射: ${path}`)
})

console.log('组件映射总数:', componentMap.size)
console.log('源码映射总数:', sourceCodeMap.size)

// 标准化路径（用于查找）：只支持 demo/examples/BaseDemo.vue 格式
function normalizePath(src: string): string {
  // 移除开头的 /（如果有）
  const path = src.startsWith('/') ? src.slice(1) : src
  
  return path
}

// 加载组件
function loadComponent() {
  try {
    error.value = null
    
    const normalizedPath = normalizePath(props.src)
    console.log('查找组件，原始路径:', props.src)
    console.log('标准化路径:', normalizedPath)
    
    // 从映射中查找
    if (componentMap.has(normalizedPath)) {
      component.value = componentMap.get(normalizedPath)
      console.log('组件加载成功')
    } else {
      throw new Error(`未找到组件: ${props.src}。标准化路径: ${normalizedPath}。可用的路径: ${Array.from(componentMap.keys()).join(', ')}`)
    }
  } catch (err: any) {
    console.error('组件加载失败:', err)
    error.value = err.message || '未知错误'
  }
}

// 加载源码
function loadSourceCode() {
  try {
    const normalizedPath = normalizePath(props.src)
    console.log('查找源码，原始路径:', props.src)
    console.log('标准化路径:', normalizedPath)
    
    // 从映射中查找
    if (sourceCodeMap.has(normalizedPath)) {
      sourceCode.value = sourceCodeMap.get(normalizedPath) || ''
      console.log('源码加载成功，长度:', sourceCode.value.length)
    } else {
      console.warn(`未找到源码: ${props.src}。标准化路径: ${normalizedPath}。可用的路径: ${Array.from(sourceCodeMap.keys()).join(', ')}`)
    }
  } catch (err) {
    console.error('无法获取源码:', err)
  }
}

// 高亮代码和添加行号
function highlightCode() {
  nextTick(() => {
    if (!codeElement.value || !sourceCode.value) return
    
    const code = sourceCode.value
    const lines = code.split('\n')
    const lineCount = lines.length
    
    // 生成行号 HTML
    let lineNumbersHtml = ''
    for (let i = 1; i <= lineCount; i++) {
      lineNumbersHtml += `<span class="line-number">${i}</span>\n`
    }
    
    // 高亮代码
    // 先进行 HTML 转义
    let highlightedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    
    // 然后按优先级进行高亮（从特殊到一般）
    // 1. 多行注释
    highlightedCode = highlightedCode.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="comment">$1</span>')
    highlightedCode = highlightedCode.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
    
    // 2. 单行注释
    highlightedCode = highlightedCode.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
    
    // 3. 字符串（避免高亮注释和字符串中的内容）
    highlightedCode = highlightedCode.replace(/(['"])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="string">$1$2$1</span>')
    
    // 4. 插值表达式
    highlightedCode = highlightedCode.replace(/\{\{([^}]+)\}\}/g, '<span class="interpolation">{{$1}}</span>')
    
    // 5. Vue 指令
    highlightedCode = highlightedCode.replace(/(v-[a-z]+(?:-[a-z]+)*|:[\w-]+|@[\w-]+)/g, '<span class="directive">$1</span>')
    
    // 6. HTML 标签
    highlightedCode = highlightedCode.replace(/(&lt;\/?)([\w-]+)(\s|&gt;)/g, (match, p1, p2, p3) => {
      return `${p1}<span class="tag">${p2}</span>${p3}`
    })
    
    // 7. 属性名（在标签和 = 之间）
    highlightedCode = highlightedCode.replace(/(&lt;[\w-]+\s+)([\w-]+)(=)/g, '$1<span class="attr">$2</span>$3')
    
    // 8. 关键字（最后处理，避免覆盖其他高亮）
    highlightedCode = highlightedCode.replace(/\b(import|export|from|const|let|var|function|return|if|else|for|while|switch|case|default|break|continue|async|await|try|catch|finally|throw|defineProps|defineEmits|withDefaults|ref|computed|watch|onMounted|nextTick|setup|lang|scoped)\b/g, '<span class="keyword">$1</span>')
    
    // 按行处理，为每行添加行号容器
    const highlightedLines = highlightedCode.split('\n').map((line, index) => {
      return `<span class="line"><span class="line-number">${index + 1}</span><span class="line-content">${line || ' '}</span></span>`
    }).join('\n')
    
    codeElement.value.innerHTML = highlightedLines
  })
}

// 监听代码变化
watch([showCode, sourceCode], () => {
  if (showCode.value && sourceCode.value) {
    highlightCode()
  }
})

onMounted(() => {
  loadComponent()
  loadSourceCode()
  
  if (showCode.value && sourceCode.value) {
    highlightCode()
  }
})

// 切换代码显示
function toggleCode() {
  showCode.value = !showCode.value
  if (showCode.value && sourceCode.value) {
    highlightCode()
  }
}

// 复制代码
async function copyCode() {
  if (!sourceCode.value) {
    return
  }
  
  try {
    await navigator.clipboard.writeText(sourceCode.value)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
    alert('复制失败，请手动复制')
  }
}
</script>

<style scoped>
.demo-container {
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  margin: 24px 0;
  overflow: hidden;
  background: #fff;
}

.demo-preview {
  padding: 24px;
  border-bottom: 1px solid #e1e4e8;
  background: #fafafa;
  min-height: 100px;
}

.loading,
.error {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.error {
  color: #d32f2f;
}

.error-message {
  font-size: 12px;
  color: #999;
  margin-top: 8px;
}

.demo-toolbar {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #e1e4e8;
}

.toolbar-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  background: #fff;
  color: #24292f;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.toolbar-btn:hover {
  background: #f3f4f6;
  border-color: #0969da;
  color: #0969da;
}

.toolbar-btn:active {
  background: #f3f4f6;
}

.toolbar-btn.copied {
  border-color: #52c41a;
  color: #52c41a;
  background: #f6ffed;
}

.demo-code-wrapper {
  background: #1e1e1e;
  border-top: 1px solid #e1e4e8;
}

.demo-code {
  overflow-x: auto;
  max-height: 600px;
  overflow-y: auto;
}

.demo-code pre {
  margin: 0;
  padding: 20px 0;
  background: transparent;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.7;
}

.demo-code code {
  font-family: 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.7;
  color: #d4d4d4;
  white-space: pre;
  display: block;
  width: 100%;
  word-wrap: normal;
  counter-reset: line;
}

.demo-code .line {
  display: flex;
  padding: 0 20px;
}

.demo-code .line:hover {
  background: rgba(255, 255, 255, 0.05);
}

.demo-code .line-number {
  display: inline-block;
  width: 50px;
  padding-right: 16px;
  text-align: right;
  color: #6e7681;
  user-select: none;
  flex-shrink: 0;
  counter-increment: line;
}

.demo-code .line-content {
  flex: 1;
  padding-left: 0;
  white-space: pre;
  overflow-x: auto;
}
</style>

<style>
/* 代码高亮样式 */
.demo-code .tag {
  color: #569cd6;
}

.demo-code .attr {
  color: #9cdcfe;
}

.demo-code .string {
  color: #ce9178;
}

.demo-code .keyword {
  color: #c586c0;
  font-weight: 600;
}

.demo-code .directive {
  color: #c586c0;
}

.demo-code .comment {
  color: #6a9955;
  font-style: italic;
}

.demo-code .interpolation {
  color: #d4a574;
}
</style>
