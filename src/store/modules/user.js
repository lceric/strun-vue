// states
const state = JSON.parse(sessionStorage.getItem('user')) || {} // 用户登录状态

// getters
const getters = {
  getUser: state => state
}

// actions
const actions = {
  userlogin ({commit, state}, user) {
    commit('USER_LOGIN', user)
  },
  userloginout ({commit, state}) {
    commit('USER_LOGINOUT')
  }
}

// mutations
const mutations = {
  USER_LOGIN (state, user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    Object.assign(state, user)
  },
  USER_LOGINOUT (state) {
    sessionStorage.removeItem('user')
    state = {}
    // Object.keys(state.user).forEach(k => Vue.delete(state, k))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
