import product from '@/apis/product'
import priceApi from '@/apis/price'
import favorite from '@/apis/favorite'

import _ from 'lodash'

export const state = () => ({
  product: {
    minPrice: 0,
    maxPrice: 0
  },
  favoriteList: [],
  favoriteData: {},
  buyNowProduct: null
})

export const mutations = {
  SET_PRODUCT (state, product) {
    state.product = product
  },
  SET_FAVOROTE_LIST (state, favoriteList) {
    state.favoriteList = favoriteList
  },
  SET_FAVOROTE_DATA (state, favoriteData) {
    state.favoriteData = favoriteData
  },
  SET_BUY_NOW_PRODUCT (state, buyNowProduct) {
    state.buyNowProduct = buyNowProduct
  }
}

export const actions = {
  async setProduct ({ state, commit }, productId) {
    const prod = await product.getById(productId)
    const allPrice = _.orderBy([...prod.customizePrice].map(ele => ele.price))
    prod.customizePrice = _.orderBy([...prod.customizePrice], 'key')
    prod.minPrice = allPrice[0]
    prod.maxPrice = allPrice.pop()
    const priceInfo = await priceApi.get(prod.priceId)
    prod.priceType = priceInfo.key
    commit('SET_PRODUCT', prod)
  },
  async createFavorite ({ dispatch }, { payload }) {
    await favorite.create({ favorite: payload })
    await dispatch('listFavorite')
  },
  async deleteFavorite ({ dispatch }, { payload }) {
    await favorite.delete({ favorite: payload })
    await dispatch('listFavorite')
  },
  async listFavorite ({ state, commit }) {
    const { rows } = await favorite.list({})
    const favoriteData = rows.length ? rows.reduce(
      (total, item) => ({
      ...total,
      [item._id]: item
    }), {}) : {}
    commit('SET_FAVOROTE_LIST', rows)
    commit('SET_FAVOROTE_DATA', favoriteData)
  },
  async createBuyNow ({ state, commit }, payload = {}) {
    commit('SET_BUY_NOW_PRODUCT', payload)
  }
}

export const getters = {
  favoriteImg: (state, getters, rootState) => (productId) => {
    const favoriteProduct = state.favoriteList.find(item => String(item.productId) === String(productId))
    return rootState.imgBaseUrl + (favoriteProduct ? 'favorite.png' : 'unfavorite.png')
  }
}
