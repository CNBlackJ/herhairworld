import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    isInquiry: false,
    isLogin: false,
    activeType: 'all'
  },

  mutations: {
    setIsInquiry (state) {
      state.isInquiry = !state.isInquiry
    },
    setIslogin (state) {
      state.isLogin = !state.isLogin
    },
    setActiveType (state, { activeType }) {
      state.activeType = activeType
    }
  },

  actions: {
    setIsInquiry ({ commit }) {
      commit('setIsInquiry')
    },
    setIslogin ({ commit }) {
      commit('setIslogin')
    },
    setActiveType ({ commit }, { activeType }) {
      commit('setActiveType', { activeType })
    }
  }
})

export default store
