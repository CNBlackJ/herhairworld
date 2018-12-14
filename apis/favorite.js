import request from './request'

export default class favorite {
  static async create ({ favorite }) {
    const resp = (await request.post('/api/favorites', favorite)).data
    let result = null
    if (!resp.error_code) result = resp.data
    return result
  }

  static async list ({ limit, skip, sort }) {
    const queryStr = `?limit=${limit || 20}&skip=${skip || 0}&sort=${sort || '-createdAt'}`
    const resp = (await request.get(`/api/favorites${queryStr}`)).data
    let result = null
    if (!resp.error_code) result = resp.data
    return result
  }

  static async delete ({ favorite }) {
    const id = favorite._id
    const resp = await request.delete(`api/favorites/${id}`)
    return resp.data
  }
}
