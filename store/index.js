import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    isInquiry: false,
    isLogin: false,
    fixedFooter: false
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
    }
  }
})

export default store
