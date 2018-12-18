import request from './request'

export default class cart {
  static async create ({ cart }) {
    const resp = (await request.post('/api/carts', cart)).data
    let result = {}
    if (!resp.error_code) result = resp.data
    return result
  }

  static async get (_id) {
    const resp = (await request.get(`/api/carts/${_id}`)).data
    let result = {}
    if (!resp.error_code) result = resp.data
    return result
  }

  static async list ({ limit, skip, sort }) {
    const queryStr = `?limit=${limit || 20}&skip=${skip || 0}&sort=${sort || '-createdAt'}`
    const resp = (await request.get(`/api/carts${queryStr}`)).data
    let result = {}
    if (!resp.error_code) result = resp.data
    return result
  }

  static async update ({ _id, count, isChecked }) {
    const resp = await request.put(`/api/carts/${_id}`, { count, isChecked })
    return resp.data
  }

  static async delete ({ _id }) {
    const resp = await request.delete(`/api/carts/${_id}`)
    return resp.data
  }

  static async updateByProdId ({ cart }) {
    const productId = cart.productId
    delete cart.productId
    const resp = await request.put(`/api/carts/productId/${productId}`, cart)
    return resp.data
  }

  static async deleteByProdId ({ productId }) {
    const resp = await request.delete(`/api/carts/productId/${productId}`)
    return resp.data
  }

  static async checkAll ({ checkAll }) {
    const resp = await request.post('/api/carts/checkAll', { checkAll })
    return resp.data
  }
}
