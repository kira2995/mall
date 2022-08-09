import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

//1.安装vuex插件
Vue.use(Vuex)


//2.创建store对象
const state = {
    cartList:[]
}
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

//3.挂载到vue实例上
export default store