import type { App } from 'vue'
import Counter from './components/Counter.vue'

const components = [Counter]

const install = function (app: App) {
  components.forEach((component) => {
    const name = component.name || component.__name || 'UnknownComponent'
    app.component(name, component)
  })
}

// 支持 UMD 方式引入
if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue)
}

export default install

// 导出组件
export { Counter }