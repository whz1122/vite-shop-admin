import { getinfo, login } from "~/api/manager"
import { setToken, removeToken } from '~/composables/auth'
export default {

    namespaced: true,
    actions: {
        //登录 储存token
        login({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                login(username, password).then(res => {
                    setToken(res.token)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        //获取用户当前登录信息 储存vuex
        getinfo({ commit }) {
            return new Promise((resolve, reject) => {
                getinfo().then(res => {
                    commit('SET_USERINFO', res)
                    commit('SET_MENUS', res.menus)
                    commit('SET_RULENAMES', res.ruleNames)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        //退出登录
        logout({ commit }) {
            //移除cookie里面的token
            removeToken()
            //清楚当前的用户状态(vuex)
            commit('SET_USERINFO', {})
        }
    },
    //准备mutations-用于操作数据（state）
    mutations: {
        SET_USERINFO(state, user) {
            state.user = user
        },
        handleAsideWidth(state){
           state.asideWidth=state.asideWidth == "200px" ? "64px" :"200px"
        },
        SET_MENUS(state,menus){
            state.menus=menus
        },
        SET_RULENAMES(state,ruleNames){
            state.ruleNames=ruleNames
        },
    },
    state: {
        user: {},
        asideWidth:"200px",
        menus:[],
        ruleNames:[]
    },
    //准备getters-用于将state中的数据进行加工
    getters: {

    }
}