#!/usr/bin/env node

const { replaceName } = require('../scripts/replace-name.js')

// 从命令行参数获取组件名和项目根路径
const [componentName, projectRoot] = process.argv.slice(2)

if (!componentName || !projectRoot) {
  console.error('用法: node replace-name-test.js <组件名> <项目根路径>')
  console.error('示例: node replace-name-test.js button /path/to/component')
  process.exit(1)
}

// 执行替换
replaceName(componentName, projectRoot)
  .then(() => {
    console.log('✅ 组件重命名完成')
    process.exit(0)
  })
  .catch(error => {
    console.error('❌ 重命名失败:', error)
    process.exit(1)
  })