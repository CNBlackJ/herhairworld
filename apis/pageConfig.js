import request from './request'

export default class pageConfig {
  static async create (pageConfig) {
    const resp = (await request.post('/api/pageConfigs', pageConfig)).data
    let result = null
    if (!resp.error_code) result = resp.data
    return result
  }

  static async getById (_id) {
    const resp = (await request.get(`/api/pageConfigs/${_id}`)).data
    let result = null
    if (!resp.error_code) result = resp.data
    return result
  }

  static async list ({ limit, skip, sort }) {
    const queryStr = `?limit=${limit || 20}&skip=${skip || 0}&sort=${sort || '-createdAt'}`
    const resp = (await request.get(`/api/pageConfigs${queryStr}`)).data
    let results = null
    if (!resp.error_code) results = resp.data
    return results
  }

  static async update (pageConfig) {
    const id = pageConfig._id
    delete pageConfig._id
    delete pageConfig.createdAt
    delete pageConfig.updatedAt
    delete pageConfig.isDeleted
    delete pageConfig.__v
    const resp = (await request.put(`/api/pageConfigs/${id}`, pageConfig)).data
    let result = null
    if (!resp.error_code) result = resp.data
    return result
  }

  static async delete (_id) {
    const resp = (await request.delete(`/api/pageConfigs/${_id}`)).data
    let result = null
    if (!resp.error_code) result = resp.data
    return result
  }
}
