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
  async setProductList ({ state, commit, rootState }) {
    const products = await product.list({ categoryId: rootState.home.activateCat })
    commit('SET_PRODUCT_LIST', products)
  },
  async createCart ({ state, commit }, productId) {
    const cartInfo = { productId, count: 1 }
    await cart.create({ cart: cartInfo })
  },
  async createFav ({ state, commit }, productId) {
    const favInfo = { productId }
    await favorite.create({ favorite: favInfo })
  }
}
