import store from "~/store"
//全局权限控制
function hasPermission(value,el=false){
    if(!Array.isArray(value)){
        throw new Error('需要配置权限')
    }
    const hasAuth = value.findIndex(v=> store.state.userAbout.ruleNames.includes(v)) !=-1
    if(el && !hasAuth){
       el.parentNode && el.parentNode.removeChild(el) //移除父 子节点
    }
    return hasAuth
}

export default {
    install(app){
        app.directive('permission',{
            mounted(el,binding) {
                hasPermission(binding.value,el)
            },
        })
    }
}