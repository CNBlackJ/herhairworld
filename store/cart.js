import _ from 'lodash'

import cart from '@/apis/cart'
import product from '@/apis/product'
import LS from '@/apis/localStorage'

// TODO: add favorite apis
const favorite = ''

export const state = () => ({
  carts: [],
  cartList: [],
  localCartList: [],
  favList: [],
  localFavList: [],
  checkedProducts: [],
  subtotal: 0,
  isCheckedAll: false
})

export const mutations = {
  SET_CARTS (state, carts) {
    state.carts = carts
  },
  SET_CART_LIST (state, carts) {
    state.cartList = carts
  },
  SET_LOCAL_CART_LIST (state, localCarts) {
    state.localCartList = localCarts
  },
  SET_FAV_LIST (state, favs) {
    state.favList = favs
  },
  SET_LOCAL_FAV_LIST (state, localFavs) {
    state.localFavList = localFavs
  },
  SET_CHECKED_PRODUCTS (state, checkedProducts) {
    state.checkedProducts = checkedProducts
  },
  SET_SUBTOTAL (state, subtotal) {
    state.subtotal = subtotal
  },
  SET_IS_CHECKED_ALL (state, isCheckedAll) {
    state.isCheckedAll = isCheckedAll
  }
}

export const actions = {
  async setCarts ({ state, commit, dispatch, rootGetters }) {
    const isAuthenticated = rootGetters.isAuthenticated
    let carts = []
    if (isAuthenticated) {
      await dispatch('setCartList')
      carts = state.cartList
    } else {
      dispatch('setLocalCartList')
      carts = state.localCartList
    }
    commit('SET_CARTS', carts)
  },
  async setCartList ({ commit }) {
    const carts = await cart.list({})
    commit('SET_CART_LIST', carts)
  },
  setLocalCartList ({ commit }) {
    const localCarts = LS.getVal('carts')
    commit('SET_LOCAL_CART_LIST', localCarts ? JSON.parse(localCarts) : [])
  },
  async setFavList ({ commit }) {
    const favs = await favorite.list({})
    commit('SET_FAV_LIST', favs)
  },
  async setLocalFavList ({ commit }) {
    const localFavs = LS.getVal('favorites')
    commit('SET_LOCAL_FAV_LIST', localFavs ? JSON.parse(localFavs) : [])
  },
  async setCheckedProducts ({ state, commit }, productId) {
    const checkedProducts = [...state.checkedProducts]
    if (_.find(checkedProducts, ele => ele === productId)) {
      _.remove(checkedProducts, ele => ele === productId)
    } else {
      checkedProducts.push(productId)
    }
    const products = await product.getByIds({ productIds: checkedProducts })
    const prices = products.map(e => e.price)
    let subtotal = 0
    if (prices.length) subtotal = prices.reduce((c, n) => c + n)
    commit('SET_IS_CHECKED_ALL', checkedProducts.length === state.carts.length)
    commit('SET_CHECKED_PRODUCTS', checkedProducts)
    commit('SET_SUBTOTAL', subtotal)
  }
}
