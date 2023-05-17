import { createStore } from 'vuex'

import user from './user'

//导出stroe
export default  createStore({
    modules:{
        userAbout:user,
    }
})