import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

// 生成 Changelog 的脚本
async function generateChangelog() {
  console.log('开始生成 Changelog...')
  
  try {
    // 获取 git 提交记录
    const commits = getGitCommits()
    
    // 解析提交记录
    const changelog = parseCommits(commits)
    
    // 写入 changelog 文件
    const changelogPath = path.join(process.cwd(), 'docs/changelog.md')
    fs.writeFileSync(changelogPath, changelog)
    
    console.log('Changelog 生成完成!')
  } catch (error) {
    console.error('生成 Changelog 时出错:', error)
  }
}

function getGitCommits() {
  try {
    // 获取最近的提交记录
    const gitLog = execSync('git log --oneline --decorate --graph', { 
      encoding: 'utf-8',
      cwd: process.cwd()
    })
    
    return gitLog.split('\n').filter(line => line.trim())
  } catch (error) {
    console.warn('无法获取 git 提交记录:', error.message)
    return []
  }
}

function parseCommits(commits) {
  const changelog = `# 更新日志

## 最新更新

`
  
  if (commits.length === 0) {
    return changelog + '暂无提交记录'
  }
  
  // 按日期分组提交
  const groupedCommits = groupCommitsByDate(commits)
  
  let content = changelog
  
  for (const [date, commitList] of Object.entries(groupedCommits)) {
    content += `### ${date}\n\n`
    
    for (const commit of commitList) {
      const { type, message } = parseCommitMessage(commit)
      const emoji = getCommitEmoji(type)
      
      content += `- ${emoji} ${message}\n`
    }
    
    content += '\n'
  }
  
  return content
}

function groupCommitsByDate(commits) {
  const grouped = {}
  
  for (const commit of commits) {
    try {
      // 获取提交日期
      const hash = commit.split(' ')[0]
      if (hash && hash !== '*') {
        const date = execSync(`git show -s --format=%ci ${hash}`, { 
          encoding: 'utf-8',
          cwd: process.cwd()
        }).trim().split(' ')[0]
        
        if (!grouped[date]) {
          grouped[date] = []
        }
        grouped[date].push(commit)
      }
    } catch (error) {
      // 忽略无法获取日期的提交
    }
  }
  
  return grouped
}

function parseCommitMessage(commit) {
  // 解析提交信息，支持 conventional commits
  const message = commit.replace(/^[^*]*\*?\s*/, '')
  
  // 匹配类型和描述
  const match = message.match(/^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: (.+)/)
  
  if (match) {
    return {
      type: match[1],
      scope: match[2] ? match[2].slice(1, -1) : '',
      message: match[3]
    }
  }
  
  return {
    type: 'other',
    scope: '',
    message: message
  }
}

function getCommitEmoji(type) {
  const emojiMap = {
    feat: '✨',
    fix: '🐛',
    docs: '📚',
    style: '💄',
    refactor: '♻️',
    test: '🧪',
    chore: '🔧',
    other: '📝'
  }
  
  return emojiMap[type] || '📝'
}

// 运行脚本
generateChangelog()
