import request from './request'

export default class product {
  static async create (prod) {
    const resp = await request.post('/api/products', prod)
    return resp.data
  }

  static async list ({ limit, skip, sort }) {
    const queryStr = `?limit=${limit || 20}&skip=${skip || 0}&sort=${sort || '-createdAt'}`
    const resp = await request.get(`/api/products${queryStr}`)
    return resp.data
  }

  static async getById ({ id }) {
    const resp = await request.get(`/api/products/${id}`)
    return resp.data
  }

  static async update ({ prod }) {
    const id = prod._id
    delete prod._id
    delete prod.createdAt
    delete prod.updatedAt
    delete prod.isDeleted
    delete prod.__v
    const resp = await request.put(`/api/products/${id}`, prod)
    return resp.data
  }

  static async deleteById ({ id }) {
    const resp = await request.delete(`api/products/${id}`)
    return resp.data
  }
}
