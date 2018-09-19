import cart from '@/apis/cart'
const favorite = ''

export const state = () => ({
  cartList: [],
  localCartList: [],
  favList: [],
  localFavList: []
})

export const mutations = {
  SET_CART_LIST (state, carts) {
    state.cartList = carts
  },
  SET_LOCAL_CART_LIST (state, localCarts) {
    state.localCartList = localCarts
  },
  SET_FAV_LIST (state, favs) {
    state.favList = favs
  },
  SET_LOCAL_FAV_LIST (state, localFavs) {
    state.localFavList = localFavs
  }
}

export const actions = {
  async setCartList ({ commit }) {
    const carts = await cart.list({})
    commit('SET_CART_LIST', carts)
  },
  async setLocalCartList ({ commit }) {
    const localCarts = window.localStorage.getItem('carts')
    commit('SET_LOCAL_CART_LIST', localCarts ? JSON.parse(localCarts) : [])
  },
  async setFavList ({ commit }) {
    const favs = await favorite.list({})
    commit('SET_FAV_LIST', favs)
  },
  async setLocalFavList ({ commit }) {
    const localFavs = window.localStorage.getItem('favorites')
    commit('SET_LOCAL_FAV_LIST', localFavs ? JSON.parse(localFavs) : [])
  }
}
