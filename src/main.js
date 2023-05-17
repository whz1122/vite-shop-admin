import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

/*  ElementPuls 引入  */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
/*  WindiCss 引入  */
import 'virtual:windi.css'
/*  Vue-Router 引入  */
import {router} from './router'
/*  VueX4 引入  */
import store from './store'
/* 全局进度条loading引入 */
import 'nprogress/nprogress.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import permission from './directives/permission'


/*  创建app  */
const app=createApp(App)
app.use(store)
app.use(ElementPlus)
app.use(router)
/*  权限验证文件 */
app.use(permission)
import './permission'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.mount('#app')
