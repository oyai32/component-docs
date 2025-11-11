import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      // 全局库名
      name: 'Counter',
      // 输出文件名
      fileName: 'counter'
    },
    // 排除依赖包
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        // 将样式文件统一命名为 style.css
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'style.css'
          }
          return assetInfo.name || '[name][extname]'
        }
      }
    },
    // 生成单一样式文件，输出为 dist/style.css
    cssCodeSplit: false
  }
})
