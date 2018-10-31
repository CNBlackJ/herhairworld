import product from '@/apis/product'
import cart from '@/apis/cart'
const favorite = ''

export const state = () => ({
  productList: null
})

export const mutations = {
  SET_PRODUCT_LIST (state, products) {
    state.productList = products
  }
}

export const actions = {
  async setProductList ({ state, commit, rootState }, { limit = 2, skip = 0 }) {
    const products = await product.list({ categoryId: rootState.home.activateCat, limit, skip })
    commit('SET_PRODUCT_LIST', products)
  },
  async createCart ({ state, commit }, { productId, price, len, count }) {
    const cartInfo = { productId, price, len, count }
    await cart.create({ cart: cartInfo })
  },
  async createFav ({ state, commit }, productId) {
    const favInfo = { productId }
    await favorite.create({ favorite: favInfo })
  }
}
