#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')

// 需要替换的文件列表
const filesToReplace = [
  'package.json',
  'src/index.ts',
  'src/components/Counter.vue',
  'vite.config.ts',
  'demo/examples/BaseDemo.vue',
  'demo/examples/CustomDemo.vue',
  'docs/.vitepress/config.ts',
  'docs/guide.md',
  'docs/index.md'
]

// 需要重命名的文件和目录
const filesToRename = [
  'src/components/Counter.vue',
  'dist/counter.js',
  'dist/counter.umd.cjs'
]

// 创建交互式输入
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// 转换为 kebab-case
function toKebabCase(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')
}

// 转换为 PascalCase
function toPascalCase(str) {
  return str.replace(/(?:^|[-])(\w)/g, (_, char, index) => {
    return index === 0 ? char.toUpperCase() : char.toUpperCase()
  })
}

// 替换文件内容
function replaceFileContent(filePath, oldName, newName) {
  if (!fs.existsSync(filePath)) return
  
  let content = fs.readFileSync(filePath, 'utf-8')
  
  // 替换各种格式的名称
  const oldKebab = toKebabCase(oldName)
  const newKebab = toKebabCase(newName)
  const oldPascal = toPascalCase(oldName)
  const newPascal = toPascalCase(newName)
  
  // 替换 package name (@oyai32/counter -> @oyai32/checkbox)
  content = content.replace(new RegExp(`@oyai32/${oldKebab}`, 'g'), `@oyai32/${newKebab}`)
  
  // 替换文件名 (counter.js -> checkbox.js)
  content = content.replace(new RegExp(`${oldKebab}\\.js`, 'g'), `${newKebab}.js`)
  content = content.replace(new RegExp(`${oldKebab}\\.umd\\.cjs`, 'g'), `${newKebab}.umd.cjs`)
  
  // 替换组件名 (Counter -> Checkbox)
  content = content.replace(new RegExp(`\\b${oldPascal}\\b`, 'g'), newPascal)
  
  // 替换 CSS 类名 (.counter -> .checkbox)
  content = content.replace(new RegExp(`\\.${oldKebab}`, 'g'), `.${newKebab}`)
  
  fs.writeFileSync(filePath, content, 'utf-8')
}

// 重命名文件
function renameFile(oldPath, newPath) {
  if (fs.existsSync(oldPath)) {
    const dir = path.dirname(newPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.renameSync(oldPath, newPath)
  }
}

/**
 * 替换组件名称
 * @param {*} componentName 组件名
 * @param {*} projectRoot 组件项目根目录
 * @returns 
 */
async function replaceName(componentName, projectRoot) {
    if (!/^[a-zA-Z][a-zA-Z0-9-_]*$/.test(componentName)) {
      console.error('❌ 组件名称格式不正确')
      rl.close()
      return
    }
    
    const newPascal = toPascalCase(componentName)
    
    
    // 1. 替换文件内容
    filesToReplace.forEach(file => {
      replaceFileContent(path.join(projectRoot, file), 'counter', componentName)
    })
    
    // 2. 重命名文件
    const oldComponentPath = path.join(projectRoot, 'src/components/Counter.vue')
    const newComponentPath = path.join(projectRoot, `src/components/${newPascal}.vue`)
    renameFile(oldComponentPath, newComponentPath)
    
    // 3. 更新导入路径
    const indexPath = path.join(projectRoot, 'src/index.ts')
    if (fs.existsSync(indexPath)) {
      let indexContent = fs.readFileSync(indexPath, 'utf-8')
      indexContent = indexContent.replace(
        `import Counter from './components/Counter.vue'`,
        `import ${newPascal} from './components/${newPascal}.vue'`
      )
      indexContent = indexContent.replace(
        'const components = [Counter]',
        `const components = [${newPascal}]`
      )
      indexContent = indexContent.replace(
        'export { Counter }',
        `export { ${newPascal} }`
      )
      fs.writeFileSync(indexPath, indexContent, 'utf-8')
    }
    
    // 4. 更新 demo 文件导入
    const demoFiles = [
      'demo/examples/BaseDemo.vue',
      'demo/examples/CustomDemo.vue'
    ]
    
    demoFiles.forEach(file => {
      const filePath = path.join(projectRoot, file)
      if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8')
        content = content.replace(
          `import Counter from '@/components/Counter.vue'`,
          `import ${newPascal} from '@/components/${newPascal}.vue'`
        )
        content = content.replace(/Counter/g, newPascal)
        fs.writeFileSync(filePath, content, 'utf-8')
      }
    })
    
    rl.close()
}


module.exports = { replaceName }
