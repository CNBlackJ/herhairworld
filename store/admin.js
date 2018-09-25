import adminUser from '@/apis/adminUser'
import LS from '@/apis/localStorage'

export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user || null
  }
}

export const actions = {
  isAuthenticated (state) {
    return !!state.user
  },
  loggedUser (state) {
    return state.user
  },
  async login (c, user) {
    const { commit } = c
    const loggedUser = await adminUser.login(user)
    if (loggedUser) {
      commit('SET_USER', loggedUser)
      // LS.setVal('adminToken', loggedUser.authToken)
      this.$cookies.set('adminToken', loggedUser.authToken)
    }
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  loggedUser (state) {
    return state.user
  }
}
