import _ from 'lodash'

import cart from '@/apis/cart'
import price from '@/apis/price'
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
  isCheckedAll: false,
  priceList: [],
  cartData: {}
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
  },
  SET_PRICE_LIST (state, priceList) {
    state.priceList = priceList
  },
  SET_CART_DATA (state, cartData) {
    state.cartData = cartData
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
  async setLocalCartList ({ commit }) {
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
  setCheckedProducts ({ state, commit, dispatch }, productId) {
    const checkedProducts = [...state.checkedProducts]
    if (_.find(checkedProducts, ele => ele === productId)) {
      _.remove(checkedProducts, ele => ele === productId)
    } else {
      checkedProducts.push(productId)
    }
    commit('SET_CHECKED_PRODUCTS', checkedProducts)
    commit('SET_IS_CHECKED_ALL', checkedProducts.length === state.carts.length)
    dispatch('setSubtotal')
  },
  setSubtotal ({ state, commit }) {
    const prices = state.cartList.filter(ele => state.checkedProducts.indexOf(ele.productId) > -1).map(ele => ele.price * ele.count)
    let subtotal = 0
    if (prices.length) subtotal = prices.reduce((c, n) => c + n)
    commit('SET_SUBTOTAL', subtotal)
  },
  async setPriceList ({ state, commit }) {
    const { rows } = await price.list({})
    commit('SET_PRICE_LIST', rows)
  },
  async addToCart ({ state, commit }, { cartInfo }) {
    const localCarts = LS.getVal('carts')
    const carts = localCarts ? JSON.parse(localCarts) : {}
    const { id, productId, count } = cartInfo
    if (carts[id]) {
      // 直接更新数量
      carts[id].count = carts[id].count + count
    } else {
      carts[id] = cartInfo
    }
    LS.setVal('carts', JSON.stringify(carts))
    commit('SET_CART_DATA', carts)
    commit('SET_CART_LIST', Object.values(carts))
  },
  getCartData ({ state, commit }) {
    const localCarts = LS.getVal('carts')
    const carts = localCarts ? JSON.parse(localCarts) : {}
    commit('SET_CART_LIST', Object.values(carts))
  }
}

export const getters = {
  subtotalOnCart (state) {
    const cartList = state.cartList || []
    const prices = cartList.map(ele => ele.count * ele.price)
    return (prices.length ? prices.reduce((c, n) => c + n) : 0).toFixed(2)
  }
}
