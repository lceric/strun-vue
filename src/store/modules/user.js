// states
const state = JSON.parse(localStorage.getItem('user')) || {login: false} // 用户登录状态

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
    localStorage.setItem('user', JSON.stringify(user))
    Object.assign(state, user)
  },
  USER_LOGINOUT (state) {
    localStorage.removeItem('user')
    state = {login: false}
    // Object.keys(state.user).forEach(k => Vue.delete(state, k))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
