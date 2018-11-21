import product from '@/apis/product'
import cart from '@/apis/cart'
const favorite = ''

export const state = () => ({
  productList: null,
  count: 0,
  pageSize: 10,
  currentPage: 1
})

export const mutations = {
  SET_PRODUCT_LIST (state, products) {
    state.productList = products
  },
  SET_COUNT (state, count) {
    state.count = count
  },
  SET_CURRENT_PAGE (state, currentPage) {
    state.currentPage = currentPage
  }
}

export const actions = {
  async setProductList ({ state, commit, rootState }, { limit = 10, skip = 0 }) {
    const categoryId = rootState.home.activateCat
    const condition = { categoryId, limit, skip }
    condition.sort = categoryId ? 'categoryIndex' : 'index'
    const { rows, count } = await product.list(condition)
    commit('SET_PRODUCT_LIST', rows)
    commit('SET_COUNT', count)
  },
  async createCart ({ state, commit }, { productId, price, len, count }) {
    const cartInfo = { productId, price, len, count }
    await cart.create({ cart: cartInfo })
  },
  async createFav ({ state, commit }, productId) {
    const favInfo = { productId }
    await favorite.create({ favorite: favInfo })
  },
  pushIntoProductList ({ state, commit }, newProductList) {
    const productList = JSON.parse(JSON.stringify(state.productList))
    const newList = [...productList, ...newProductList]
    commit('SET_PRODUCT_LIST', newList)
  }
}

export const getters = {
  maxPage (state) {
    return Math.ceil(state.count / state.pageSize)
  }
}
