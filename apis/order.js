import request from './request'

export default class order {
  static async create (order) {
    const resp = (await request.post('/api/orders', order)).data
    let result = null
    if (!resp.error_code) result = resp.data
    return result
  }

  static async list ({ limit, skip, sort, orderIds }) {
    const queryStr = `?limit=${limit || 20}&skip=${skip || 0}&sort=${sort || '-createdAt'}&orderIds=${orderIds}`
    const resp = (await request.get(`/api/orders${queryStr}`)).date
    console.log(orderIds)
    let result = null
    if (!resp.error_code) result = resp.data
    return result
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
