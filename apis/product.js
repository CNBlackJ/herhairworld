import request from './request'

export default class product {
  static async create (prod) {
    const resp = await request.post('/api/products', prod)
    return resp.data
  }

  static async list ({ limit, skip, sort, categoryId }) {
    const categoryIdStr = categoryId ? `&categoryId=${categoryId}` : ''
    const queryStr = `?limit=${limit || 20}&skip=${skip || 0}&sort=${sort || '-createdAt'}${categoryIdStr}`
    const resp = (await request.get(`/api/products${queryStr}`)).data
    let results = []
    if (!resp.error_code) results = resp.data
    return results
  }

  static async getByIds ({ productIds }) {
    const resp = (await request.post('/api/products/getByIds', { productIds })).data
    let results = []
    if (!resp.error_code) results = resp.data
    return results
  }

  static async getById (productId) {
    const resp = (await request.get(`/api/products/${productId}`)).data
    let results = []
    if (!resp.error_code) results = resp.data
    return results
  }

  static async update ({ prod }) {
    const id = prod._id
    delete prod._id
    delete prod.createdAt
    delete prod.updatedAt
    delete prod.isDeleted
    delete prod.__v
    delete prod.sales
    const resp = await request.put(`/api/products/${id}`, prod)
    return resp.data
  }

  static async deleteById ({ id }) {
    const resp = await request.delete(`api/products/${id}`)
    return resp.data
  }
}
