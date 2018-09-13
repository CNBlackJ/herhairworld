import Vue from 'vue'
import Vuex from 'vuex'

import product from '@/apis/product'
import favorite from '@/apis/favorite'
import cart from '@/apis/cart'
import LS from '@/apis/localStorage'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    isLogin: false,
    fixedFooter: false,
    loginUser: {},
    selectedCat: '',
    productList: [],
    favoriteList: [],
    cartList: []
  },

  mutations: {
    setFixedFooter (state) {
      state.fixedFooter = !state.fixedFooter
    },
    setLoginUser (state, { loginUser }) {
      state.loginUser = loginUser
      state.isLogin = true
    },
    setSelectedCat (state, { categoryId }) {
      state.selectedCat = categoryId
    },
    setProductList (state, { productList }) {
      state.productList = productList
    },
    setFavoriteList (state, { favoriteList }) {
      state.favoriteList = favoriteList
    },
    setCartList (state, { cartList }) {
      state.cartList = cartList
    }
  },

  actions: {
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
    },
    async setFavoriteList ({ state, commit }) {
      let favoriteList = []
      if (state.isLogin) {
        const resp = await favorite.list({ userId: state.loginUser._id })
        if (!resp.error_code) favoriteList = resp.data.map(ele => ele._id)
      } else {
        favoriteList = LS.getLocalStorage('favorites') ? JSON.parse(LS.getLocalStorage('favorites')) : []
      }
      commit('setFavoriteList', { favoriteList })
    },
    async setCartList ({ state, commit }) {
      let cartList = []
      if (state.isLogin) {
        const resp = await cart.list({ userId: state.loginUser._id })
        if (!resp.error_code) cartList = resp.data.map(ele => ele._id)
      } else {
        cartList = LS.getLocalStorage('carts') ? JSON.parse(LS.getLocalStorage('carts')) : []
      }
      commit('setCartList', { cartList })
    }
  }
})

export default store
