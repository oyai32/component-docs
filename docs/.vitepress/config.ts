import { defineConfig } from 'vitepress'
import { resolve } from 'path'

export default defineConfig({
  title: '组件文档',
  description: 'Vue3 组件库文档',
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/button' },
      { text: '更新日志', link: '/changelog' }
    ],

    sidebar: {
      '/components/': [
        {
          text: '组件列表',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Input 输入框', link: '/components/input' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/component-docs' }
    ]
  },

  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, '../../src')
      }
    },
    server: {
      fs: {
        allow: ['..']
      }
    }
  }
})
