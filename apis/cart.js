import request from './request'

export default class cart {
  static async create ({ cart }) {
    const resp = await request.post('/api/carts', cart)
    return resp.data
  }

  static async list ({ limit, skip, sort }) {
    const queryStr = `?limit=${limit || 20}&skip=${skip || 0}&sort=${sort || '-createdAt'}`
    const resp = (await request.get(`/api/carts${queryStr}`)).data
    let results = []
    if (!resp.error_code) results = resp.data
    return results
  }

  static async update ({ cart }) {
    const id = cart._id
    delete cart._id
    delete cart.createdAt
    delete cart.updatedAt
    delete cart.isDeleted
    delete cart.__v
    const resp = await request.put(`/api/carts/${id}`, cart)
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
}
