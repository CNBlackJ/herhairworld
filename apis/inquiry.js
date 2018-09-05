import request from './request'

export default class inquiry {
  static async create ({ inquiry }) {
    const resp = await request.post('/api/inquiries', inquiry)
    return resp.data
  }

  static async list ({ limit, skip, sort }) {
    const queryStr = `?limit=${limit || 20}&skip=${skip || 0}&sort=${sort || '-createdAt'}`
    const resp = await request.get(`/api/inquiries${queryStr}`)
    return resp.data
  }

  static async update ({ inquiry }) {
    const id = inquiry._id
    delete inquiry._id
    delete inquiry.createdAt
    delete inquiry.updatedAt
    delete inquiry.isDeleted
    delete inquiry.__v
    const resp = await request.put(`/api/inquiries/${id}`, inquiry)
    return resp.data
  }

  static async delete ({ id }) {
    const resp = await request.delete(`/api/inquiries/${id}`)
    return resp.data
  }
}
