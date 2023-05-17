# 项目名称:vue3_vite_shop

### 介绍

使用最新的vite构建vue3项目，使用Element-puls组件库(vite4+vue3+ElementPuls)

### 项目版本控制

|  @element-plus/icons-vue   | @vueuse/core  | @vueuse/integrations | axios | echarts |
|  :----:  | :----:  |  :----:  | :----:  |  :----:  | 
| ^2.1.0  | ^10.1.2 | ^10.1.2  | ^1.4.0 | ^5.4.2  | 

|  gsap   | nprogress | universal-cookie | vue | vue-router | vuex | element-plus |
|  :----:  | :----:  |  :----:  | :----:  |  :----:  | :----:  |:----:  |
| ^3.11.5  | ^0.2.0 | ^4.0.4  | ^3.2.47 | ^4.1.6  | ^4.0.2 |^2.3.4 |

|  vite   | windicss |
|  :----:  | :----:  |
| 4.3.2  | ^3.5.6 |

#### 在线预览

地址： https://wu-hongzhuo11.gitee.io/shop_admin

#### 使用说明

运行环境：node v16.18.0

1.  git clone 
```
# Gitee
git clone https://gitee.com/wu-hongzhuo11/vue3_vite_shop.git
```
2. 安装pnpm（推荐使用pnpm，安装pnpm需要先安装npm）

```
//查看源
pnpm config get registry 
//切换淘宝源
pnpm config set registry http://registry.npm.taobao.org 
```
3.  npm install / cnpm install 安装依赖
4.  npm run dev / cnpm run server 启动项目

#### 文件资源目录
注意：本项目未使用TypeScipt请忽略 去掉script标签中的lang属性,看示例代码
```javascript
<template>
 
</template>
<script lang="ts">

</script>
<style>
    
</style>
```
  ```
  Shop-Admin
├─ .vscode                # VSCode 推荐配置
├─ build                  # Vite 配置项
├─ public                 # 静态资源文件（该文件夹不会被打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ directives          # 全局指令文件
│  ├─ hooks               # 常用 Hooks 封装
│  ├─ layout              # 框架布局模块
│  ├─ router              # 路由管理
│  ├─ store               # Vuex4 store
│  ├─ style.css           # 全局样式文件
│  ├─ utils               # 常用工具库
│  ├─ views               # 项目所有页面
|  ├─ permission.js       # 全局用户权限判断
│  ├─ App.vue             # 项目主组件
│  └─ main.js             # 项目入口文件
├─ .env                   # vite 常用配置
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ .env.test              # 测试环境配置
├─ .gitignore             # 忽略 git 提交
├─ index.html             # 入口 html
├─ package-lock.json      # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ README.md              # README 介绍
└─ vite.config.js         # vite 全局配置文件
  ```

#### config配置文件

  ```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

/*  处理路径  */
import path from 'path'

export default defineConfig({
  server:{
    proxy:{
      '/api': {
        target: 'http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  resolve:{
    alias:{
      '~':path.resolve(__dirname,'src')
    }
  },
  plugins: [vue(), WindiCSS(),],
})

  ```

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request