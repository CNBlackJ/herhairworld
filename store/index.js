import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    isInquiry: false,
    isLogin: false
  },

  mutations: {
    setIsInquiry (state) {
      state.isInquiry = !state.isInquiry
    },
    setIslogin (state) {
      state.isLogin = !state.isLogin
    }
  },

  actions: {
    setIsInquiry ({ commit }) {
      commit('setIsInquiry')
    },
    setIslogin ({ commit }) {
      commit('setIslogin')
    }
  }
})

export default store
