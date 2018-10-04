import request from './request'

export default class order {
  static async create (order) {
    const resp = await request.post('/api/orders', order)
    return resp.data
  }

  static async list ({ limit, skip, sort }) {
    const queryStr = `?limit=${limit || 20}&skip=${skip || 0}&sort=${sort || '-createdAt'}`
    const resp = await request.get(`/api/orders${queryStr}`)
    return resp.data
  }

  static async update ({ order }) {
    const id = order._id
    delete order._id
    delete order.createdAt
    delete order.updatedAt
    delete order.isDeleted
    delete order.__v
    const resp = await request.put(`/api/order/${id}`, order)
    return resp.data
  }
}
