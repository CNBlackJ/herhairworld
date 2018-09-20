import product from '@/apis/product'

export const state = () => ({
  product: {
    price: 0
  }
})

export const mutations = {
  SET_PRODUCT (state, product) {
    state.product = product
  }
}

export const actions = {
  async setProduct ({ commit }, productId) {
    const prod = await product.getById(productId)
    commit('SET_PRODUCT', prod)
  }
}
