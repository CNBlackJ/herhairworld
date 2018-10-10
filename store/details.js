import product from '@/apis/product'

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
  async setProduct ({ commit }, productId) {
    const prod = await product.getById(productId)
    const allPrice = [...prod.lengths].map(ele => ele.price).sort()
    prod.minPrice = allPrice[0]
    prod.maxPrice = allPrice.pop()
    commit('SET_PRODUCT', prod)
  }
}
