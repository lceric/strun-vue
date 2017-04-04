// article 状态管理
const state = {
  choose: {
    id: ''
  }
}

const getters = {
  getArticle: state => state
}

const actions = {
  chooseArticle ({commit, state}, id) {
    commit('CHOOSE', id)
  }
}

const mutations = {
  CHOOSE (state, id) {
    state.choose.id = id
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
