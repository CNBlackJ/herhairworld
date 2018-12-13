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
  SET_LOCAL_FAV_LIST (state, localFavs) {
    state.localFavList = localFavs
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
  async setLocalFavList ({ commit }) {
    const localFavs = LS.getVal('favorites')
    commit('SET_LOCAL_FAV_LIST', localFavs ? JSON.parse(localFavs) : [])
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
  items (state) {
    const purchaseProducts = state.cartList.filter(item => item.isChecked)
    const shipping = 19.99
    const payItems = purchaseProducts.map(ele => {
      return {
        name: ele.productId,
        sku: ele.productId,
        price: ele.price,
        currency: 'USD',
        quantity: String(ele.count)
      }
    })
    const shippingItem = {
      name: 'shipping',
      sku: 'shippingsku',
      price: shipping,
      currency: 'USD',
      quantity: '1'
    }
    payItems.push(shippingItem)
    return payItems
  },
  summary (state) {
    const products = state.cartList.filter(item => item.isChecked)
    const shipping = 19.99
    const summary = {
      total: 0,
      price: '0.00',
      shipping: '00.00'
    }
    if (products.length) {
      const counts = products.map(ele => ele.count)
      const prices = products.map(ele => ele.count * ele.price)
      summary.total = counts ? counts.reduce((c, n) => c + n) : 0
      summary.price = (prices.length ? prices.reduce((c, n) => c + n) : 0).toFixed(2)
      summary.shipping = shipping.toFixed(2)
      const allWeight = products.map(ele => ele.count * ele.maxWeight).reduce((c, n) => c + n)
      if (allWeight === 0) {
        summary.shipping = 0
      } else {
        const outWeight = allWeight - 500
        if (outWeight > 0) {
          // 超重: 每加0.5kg，多6美金
          const count = Math.ceil(outWeight / 500)
          summary.shipping = (19.99 + count * 6).toFixed(2)
        } else {
          summary.shipping = 19.99
        }
      }
      summary.amount = Number(summary.price) + Number(summary.shipping)
    }
    return summary
  },
  checkAll (state) {
    const checkAll = !state.cartList.find(item => !item.isChecked)
    return checkAll
  }
}
