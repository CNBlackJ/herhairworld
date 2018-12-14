import _ from 'lodash'

import cart from '@/apis/cart'
import price from '@/apis/price'
import LS from '@/apis/localStorage'

// TODO: add favorite apis
const favorite = ''

export const state = () => ({
  cartList: [],
  favList: [],
  localFavList: [],
  subtotal: 0,
  isCheckedAll: false,
  priceList: [],
  cartData: {}
})

export const mutations = {
  SET_CART_LIST (state, carts) {
    state.cartList = carts
  },
  SET_FAV_LIST (state, favs) {
    state.favList = favs
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
  async setCartList ({ commit }) {
    const { rows } = await cart.list({})
    const cartData = Object.keys(rows).length ? rows.reduce(
      (total, item) => ({
      ...total,
      [item.uniqueId]: item
    }), {}) : {}
    commit('SET_CART_LIST', rows)
    commit('SET_CART_DATA', cartData)
  },
  async setFavList ({ commit }) {
    const favs = await favorite.list({})
    commit('SET_FAV_LIST', favs)
  },
  async setPriceList ({ state, commit }) {
    const { rows } = await price.list({})
    commit('SET_PRICE_LIST', rows)
  },
  async addToCart ({ state, commit, dispatch }, { cartInfo }) {
    const { uniqueId, productId, count } = cartInfo
    if (state.cartData[uniqueId]) {
      // 更新数量
      const newCartInfo = {...state.cartData[uniqueId]}
      newCartInfo.count = newCartInfo.count + count
      await cart.update(newCartInfo)
    } else {
      // 创建
      await cart.create({ cart: cartInfo })
    }
    await dispatch('setCartList')
  },
  async updateCart ({ state, commit, dispatch }, { cartInfo }) {
    await cart.update(cartInfo)
    await dispatch('setCartList')
  },
  async deleteCart ({ state, dispatch }, { cartInfo }) {
    await cart.delete(cartInfo)
    await dispatch('setCartList')
  },
  async checkAll ({ dispatch }, { checkAll }) {
    await cart.checkAll({ checkAll })
    await dispatch('setCartList')
  }
}

export const getters = {
  subtotalOnCart (state) {
    const cartList = state.cartList
    const prices = cartList.map(ele => ele.count * ele.price)
    return (prices.length ? prices.reduce((c, n) => c + n) : 0).toFixed(2)
  },
  subtotalOnChecked (state) {
    const cartList = state.cartList
    const prices = cartList.filter(item => item.isChecked).map(ele => ele.count * ele.price)
    return (prices.length ? prices.reduce((c, n) => c + n) : 0).toFixed(2)
  },
  checkAll (state) {
    const checkAll = !state.cartList.find(item => !item.isChecked)
    return checkAll
  }
}
