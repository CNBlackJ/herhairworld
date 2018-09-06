import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    isInquiry: false,
    isLogin: false,
    fixedFooter: false,
    loginUser: {}
  },

  mutations: {
    setIsInquiry (state) {
      state.isInquiry = !state.isInquiry
    },
    setIslogin (state) {
      state.isLogin = !state.isLogin
    },
    setFixedFooter (state) {
      state.fixedFooter = !state.fixedFooter
    },
    setLoginUser (state, { loginUser }) {
      state.loginUser = loginUser
    }
  },

  actions: {
    setIsInquiry ({ commit }) {
      commit('setIsInquiry')
    },
    setIslogin ({ commit }) {
      commit('setIslogin')
    },
    setFixedFooter ({ commit }) {
      commit('setFixedFooter')
    },
    setLoginUser ({ commit }, { loginUser }) {
      commit('setFixedFooter', { loginUser })
    }
  }
})

export default store
