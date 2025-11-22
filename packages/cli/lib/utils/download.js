const { promisify } = require('util')
const download = require('download-git-repo')
const { exec } = require('child_process')
const path = require('path')

const execPromise = promisify(exec)

/**
 * 下载模板
 * @param {string} templateRepo 模板仓库地址
 * @param {string} targetDir 目标目录
 * @returns {Promise<void>}
 */
async function downloadTemplate(templateRepo, targetDir) {
  // 方法1: 使用 download-git-repo
  try {
    const downloadRepo = promisify(download)
    await downloadRepo(`direct:${templateRepo}`, targetDir, { clone: true })
    console.log('✅ 组件模板下载完成')
    return
  } catch (error) {
    console.error('下载模板出错，尝试使用 git clone...', error.message)
    
    // 方法2: 回退到使用 git clone
    try {
      console.log('正在使用 git clone 下载模板...')
      await execPromise(`git clone --depth=1 ${templateRepo} ${targetDir}`)
      // 删除 .git 目录
      await execPromise(`rm -rf ${path.join(targetDir, '.git')}`)
      console.log('✅ 组件模板下载完成 (通过 git clone)')
    } catch (gitError) {
      console.error('git clone 也失败了:', gitError.message)
      throw new Error('无法下载组件模板，请检查网络连接或仓库地址')
    }
  }
}

module.exports = {
  downloadTemplate
}
