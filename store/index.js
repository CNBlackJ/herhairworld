import user from '@/apis/user'
import product from '@/apis/product'

export const state = () => ({
  user: null,
  imgBaseUrl: 'https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/',
  authToken: null,
  featuredProducts: []
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user || null
  },
  SET_AUTH_TOKEN (state, authToken) {
    state.authToken = authToken
  },
  SET_IMG_BASE_URL (state, url) {
    state.imgBaseUrl = url || 'https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/'
  },
  SET_FEATURED_PRODUCTS (state, featuredProducts) {
    state.featuredProducts = featuredProducts
  }
}

export const actions = {
  isAuthenticated (state) {
    return !!state.user
  },
  loggedUser (state) {
    return state.user
  },
  async createVisitor ({ state, commit }) {
    const userInfo = await user.autoCreate()
    commit('SET_AUTH_TOKEN', userInfo.authToken)
    commit('SET_USER', userInfo)
  },
  async setFeaturedProducts ({ rootState, state, commit }) {
    const productIds = rootState.home.pageConfig.faeturedProducts
    const rows = await product.getByIds({ productIds })
    commit('SET_FEATURED_PRODUCTS', rows)
  }
}

export const getters = {
  isAuthenticated (state) {
    return state.user && state.user.type === 'user'
  },
  loggedUser (state) {
    return state.user
  }
}
