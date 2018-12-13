import LS from '@/apis/localStorage'
import order from '@/apis/order'
import cart from '@/apis/cart'

export const state = () => ({
  orders: [],
  order: null
})

export const mutations = {
  SET_ORDERS (state, orders) {
    state.orders = orders
  },
  SET_ORDER (state, order) {
    state.order = order
  }
}

export const actions = {
  async getOrders ({ commit }) {
    const { rows } = await order.list({ sort: '-createdAt' })
    commit('SET_ORDERS', rows)
  },
  async createOrder ({ state, commit, rootState }, payload) {
    const orderRes = await order.create(payload)
    return orderRes
  }
}

export const getters = {
  orderImgs: (state) => (orderId) => {
    const { carts } = state.orders.find(ele => ele._id === orderId)
    return carts.map(({ productId }) => productId.mainImg)
  }
}
