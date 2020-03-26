import ca from "element-ui/src/locale/lang/ca";

export const state = () => ({
  token: true
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  }
}

export const actions = {
  async login({commit, dispatch}, formData) {
    const token = await new Promise(resolve => {
      setTimeout(() => resolve('mock-token'),2000)
  })
  dispatch('setToken', token)
},
  async createUser({commit}, formData) {
    try {
      console.log('create user', formData)
    } catch (e) {

    }
  },
  setToken({commit}, token) {
    commit('setToken', token)
  }
}

export const getters = {
  isAuthenticated: state => Boolean(state.token)
}
