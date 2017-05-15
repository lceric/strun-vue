// article 状态管理
const state = JSON.parse(localStorage.getItem('st-article')) || {}

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
    console.info(id)
    state = Object.assign({}, {choose: {'id': id}})
    console.info(id)
    state.choose.id = id
    // state.choose.id = id
    localStorage.setItem('st-article', JSON.stringify({choose: {'id': id}}))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
