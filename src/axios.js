import axios from 'axios'
import { getToken } from '~/composables/auth'
import { toast } from '~/composables/util'
import store from './store'

const service = axios.create({
  baseURL: '/api',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 请求前自动往header头添加token
  const token = getToken()
  if (token) {
    config.headers["token"] = token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  return response.data.data;
}, function (error) {
  const msg=error.response.data.msg || "请求失败"
  //防止token失效 用户未退出
  if(msg=='非法token，请先登录!')
  {
    store.dispatch("userAbout/logout").finally(()=>location.reload)
  }
  toast(msg, "error")
  return Promise.reject(error);
});

export default service