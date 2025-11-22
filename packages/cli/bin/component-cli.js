#!/usr/bin/env node

const { Command } = require('commander')
const { init } = require('../lib/commands/init')

const program = new Command()

// 执行 -v命令时打印出来
program.version(require('../package.json').version)

// 初始化项目
program
  .command('init <name>')
  .description('初始化组件项目')
  .action(init)

// 如果没有提供命令，显示帮助信息
if (!process.argv.slice(2).length) {
  program.outputHelp()
  process.exit(1)
}

program.parse(process.argv)
