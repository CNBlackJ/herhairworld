import Vue from 'vue'
import Vuex from 'vuex'

import product from '@/apis/product'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    isLogin: false,
    fixedFooter: false,
    loginUser: {},
    selectedCat: '',
    productList: []
  },

  mutations: {
    setIslogin (state) {
      state.isLogin = !state.isLogin
    },
    setFixedFooter (state) {
      state.fixedFooter = !state.fixedFooter
    },
    setLoginUser (state, { loginUser }) {
      state.loginUser = loginUser
    },
    setSelectedCat (state, { categoryId }) {
      state.selectedCat = categoryId
    },
    setProductList (state, { productList }) {
      state.productList = productList
    }
  },

  actions: {
    setIslogin ({ commit }) {
      commit('setIslogin')
    },
    setFixedFooter ({ commit }) {
      commit('setFixedFooter')
    },
    setLoginUser ({ commit }, { loginUser }) {
      commit('setLoginUser', { loginUser })
    },
    setSelectedCat ({ commit, dispatch }, { categoryId }) {
      commit('setSelectedCat', { categoryId })
      dispatch('setProductList')
    },
    async setProductList ({ state, commit }) {
      const resp = await product.list({ categoryId: state.selectedCat })
      if (!resp.error_code) commit('setProductList', { productList: resp.data })
    }
  }
})

export default store
