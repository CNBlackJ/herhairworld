export const state = () => ({
  user: null,
  imgBaseUrl: 'https://herhairword-1255936829.cos.ap-guangzhou.myqcloud.com/',
  authToken: ''
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
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  loggedUser (state) {
    return state.user
  }
}
