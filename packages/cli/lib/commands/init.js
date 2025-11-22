const fs = require('fs')
const path = require('path')
const os = require('os')
const { execSync } = require('child_process')
const { replaceName } = require('../../scripts/replace-name')
const TEMPLATE_REPO = 'https://github.com/oyai32/component-docs.git'

async function init(name) {
  console.log(`🚀 开始创建组件项目: ${name}`)
  const targetDir = path.resolve(process.cwd(), name)
  
  if (fs.existsSync(targetDir)) {
    throw new Error(`❌ 目录 ${name} 已存在`)
  }

  try {
    console.log('📥 正在下载组件模板...')
    
    // 1. 在系统临时目录中创建临时文件夹（为了临时目录不被感知）
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'component-'))
    
    try {
      // 2. 克隆仓库到临时目录
      execSync(`git clone --depth 1 --filter=blob:none --sparse ${TEMPLATE_REPO} ${tempDir}`, { 
        stdio: 'ignore'  // ignore 则不在控制台显示具体进度信息
      })
      
      // 3. 只检出 packages/template 目录
      process.chdir(tempDir)
      execSync('git sparse-checkout set packages/template', { stdio: 'inherit' })
      
      // 4. 移动文件到目标目录
      const sourceDir = path.join(tempDir, 'packages/template')
      fs.renameSync(sourceDir, targetDir)
      
      console.log('✅ 组件模板下载完成！')
      
      // 5. 初始化项目
      console.log('🔧 正在初始化组件项目...')
      process.chdir(targetDir)
      await replaceName(name, targetDir)
      
      console.log('✅ 组件项目初始化完成！')
      console.log('\n📋 后续步骤:')
      console.log(`1. cd ${name}`)
      console.log('2. npm install')
      console.log('3. 运行 npm run dev 测试')
    } finally {
      // 6. 清理临时目录
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true })
      }
    }
  } catch (error) {
    console.error('初始化失败:', error)
    process.exit(1)
  }
}

module.exports = {
  init
}