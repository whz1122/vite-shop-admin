import { router, addRoutes } from '~/router'
import { getToken } from '~/composables/auth'
import { toast, showFullLoading, hiddenFullLoading } from '~/composables/util'
import store from './store'

//全局前置守卫
let hasGetInfo = false
router.beforeEach(async (to, from, next) => {
  showFullLoading()
  const token = getToken()
  //无权限登录页跳转
  if (!token && to.path != '/login') {
    toast('请先登录', "error")
    return next({ path: '/login' })
  }
  //防止重复登录
  if (token && to.path == '/login') {
    toast('请勿重复登录', "error")
    return next({ path: from.path ? from.path : "/" })
  }
  //如果用户登录，自动获取用户信息，存vuex
  let hasNewRoutes = false
  if (token && !hasGetInfo) {
    let { menus } = await store.dispatch('userAbout/getinfo')
    hasGetInfo = true
    //动态添加路由
    hasNewRoutes = addRoutes(menus)
  }
  //页面标题
  let title = (to.meta.title ? to.meta.title : "") + "-后台管理"
  document.title = title


  //判断是否存在当前路由
  hasNewRoutes ? next(to.fullPath) : next()
})

//全局后置守卫
router.afterEach((to, from) => {
  hiddenFullLoading()
})