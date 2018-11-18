import product from '@/apis/product'
import priceApi from '@/apis/price'

import _ from 'lodash'

export const state = () => ({
  product: {
    minPrice: 0,
    maxPrice: 0
  },
  buyNowProduct: null
})

export const mutations = {
  SET_PRODUCT (state, product) {
    state.product = product
  },
  SET_BUY_NOW (state, productInfo) {
    state.buyNowProduct = productInfo
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
  }
}
