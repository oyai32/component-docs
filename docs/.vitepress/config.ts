import { defineConfig } from 'vitepress'
import { resolve } from 'path'

export default defineConfig({
  title: 'xxx组件',
  description: 'xx组件文档',
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '示例', link: '/examples/button' },
      { text: 'API', link: '/api' },
      { text: '更新日志', link: '/changelog' }
    ],

    sidebar: {
      '/examples/': [
        {
          items: [
            { text: 'Button 按钮', link: '/examples/button' },
            { text: 'Input 输入框', link: '/examples/input' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
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
