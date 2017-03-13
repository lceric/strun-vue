import Vue from 'vue'
import Vuex from 'vuex'
import slidemenu from './modules/sidemenu'
import user from './modules/user'
import count from './modules/count'

Vue.use(Vuex)

// 创建store实例
export default new Vuex.Store({
  // actions,
  // getters,
  // state,
  modules: {
    slidemenu,
    user,
    count
  }
})
