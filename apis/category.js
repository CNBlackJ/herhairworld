import request from './request'

export default class category {
  static async create ({ category }) {
    const resp = await request.post('/api/categories', category)
    return resp.data
  }

  static async list ({ limit, skip, sort }) {
    const queryStr = `?limit=${limit || 20}&skip=${skip || 0}&sort=${sort || '-createdAt'}`
    const resp = (await request.get(`/api/categories${queryStr}`)).data
    let results = []
    if (!resp.error_code) results = resp.data
    return results
  }

  static async update ({ category }) {
    const id = category._id
    delete category._id
    delete category.createdAt
    delete category.updatedAt
    delete category.isDeleted
    delete category.__v
    const resp = await request.put(`/api/categories/${id}`, category)
    return resp.data
  }

  static async delete ({ category }) {
    const id = category._id
    const resp = await request.delete(`api/categories/${id}`)
    return resp.data
  }
}
