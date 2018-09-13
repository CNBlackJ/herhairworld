import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

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
    cartList: [],
    cartProdsDetail: [],
    cartTotalPrice: 0,
    cartCheckedProds: []
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
    },
    setCartTotalPrice (state, { cartTotalPrice }) {
      state.cartTotalPrice = cartTotalPrice
    },
    setCartProdsDetail (state, { cartProdsDetail }) {
      state.cartProdsDetail = cartProdsDetail
    },
    setCartCheckedProds (state, { cartCheckedProds }) {
      state.cartCheckedProds = cartCheckedProds
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
    },
    async setCartTotalPrice ({ state, commit }) {
      let cartTotalPrice = 0
      state.cartCheckedProds.forEach(checkedProdId => {
        const prodInProdDetail = _.find(state.cartProdsDetail, e => e._id === checkedProdId)
        const prodInCartList = _.find(state.cartList, e => e.prodId === checkedProdId)
        const price = prodInProdDetail ? prodInProdDetail.price : 0
        const count = prodInCartList ? prodInCartList.count : 0
        cartTotalPrice += (price * count)
      })
      commit('setCartTotalPrice', { cartTotalPrice })
    },
    async setCartProdsDetail ({ state, commit }) {
      const productIds = state.cartList.map(ele => ele.prodId)
      const resp = await product.getByIds({ productIds })
      if (!resp.error_code) {
        const cartProdsDetail = resp.data.map(ele => {
          ele.isChecked = Boolean(_.find(state.cartCheckedProds, e => e === ele._id))
          return ele
        })
        commit('setCartProdsDetail', { cartProdsDetail })
      } else {
        console.log(resp.error_msg)
        commit('setCartProdsDetail', { cartProdsDetail: [] })
      }
    },
    async setCartCheckedProds ({ state, commit }, { checkedProdId }) {
      const cartCheckedProds = state.cartCheckedProds
      if (_.find(cartCheckedProds, e => e === checkedProdId)) {
        _.remove(cartCheckedProds, e => e === checkedProdId)
      } else {
        cartCheckedProds.push(checkedProdId)
      }
      commit('setCartCheckedProds', { cartCheckedProds })
    },
    async checkAllCartProd ({ state, commit }, { isCheckedAll }) {
      const cartCheckedProds = isCheckedAll ? state.cartList.map(ele => ele.prodId) : []
      commit('setCartCheckedProds', { cartCheckedProds })
    }
  }
})

export default store
