import user from '@/apis/user'

export const state = () => ({
  user: null,
  imgBaseUrl: 'https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/',
  authToken: null
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
