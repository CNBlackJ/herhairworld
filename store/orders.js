import LS from '@/apis/localStorage'
import order from '@/apis/order'

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
  async getOrders ({ state, commit, rootState }) {
    const orderIds = LS.getVal('orderIds')
    if (orderIds.length) {
      const orders = await order.list({ orderIds, sort: '-createdAt' })
      commit('SET_ORDERS', orders)
    }
  },
  async createOrder ({ state, commit, rootState }, payload) {
    const orderRes = await order.create(payload)
    commit('SET_ORDER', orderRes)
    LS.createOrder(orderRes._id)
  }
}

export const getters = {
  orderImgs: (state) => (orderId) => {
    const { products } = state.orders.find(ele => ele._id === orderId)
    const productDetails = products.map(ele => ele.productId)
    const imgs = productDetails.map(ele => ele.mainImg)
    return imgs
  }
}
