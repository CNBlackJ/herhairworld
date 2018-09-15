import request from './request'

export default class address {
  static async create ({ address }) {
    const resp = await request.post('/api/addresses', address)
    return resp.data
  }

  static async list ({ limit, skip, sort }) {
    const queryStr = `?limit=${limit || 20}&skip=${skip || 0}&sort=${sort || '-createdAt'}`
    const resp = await request.get(`/api/addresses${queryStr}`)
    return resp.data
  }

  static async update ({ address }) {
    const id = address._id
    delete address._id
    delete address.createdAt
    delete address.updatedAt
    delete address.isDeleted
    delete address.__v
    const resp = await request.put(`/api/addresses/${id}`, address)
    return resp.data
  }

  static async delete ({ id }) {
    const resp = await request.delete(`/api/addresses/${id}`)
    return resp.data
  }

  static async setDefault ({ id }) {
    const resp = await request.post(`/api/addresses/setDefault/${id}`)
    return resp.data
  }

  static async getDefault () {
    const queryStr = `?limit=1&sort=-isDefault`
    const resp = await request.get(`/api/addresses${queryStr}`)
    return resp.data
  }
}
