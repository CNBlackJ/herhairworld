import request from './request'

export default class cart {
  static async create ({ cart }) {
    const resp = await request.post('/api/carts', cart)
    return resp.data
  }

  static async list ({ limit, skip, sort }) {
    const queryStr = `?limit=${limit || 20}&skip=${skip || 0}&sort=${sort || '-createdAt'}`
    const resp = await request.get(`/api/carts${queryStr}`)
    return resp.data
  }
}
