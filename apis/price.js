import request from './request'

export default class price {
  static async get (_id) {
    const resp = (await request.get(`/api/prices/${_id}`)).data
    let result = {}
    if (!resp.error_code) result = resp.data
    return result
  }

  static async list ({ limit, skip, sort, categoryId, search }) {
    const queryStr = `?limit=${limit || 20}&skip=${skip || 0}&sort=${sort || '-createdAt'}`
    const resp = (await request.get(`/api/prices${queryStr}`)).data
    let results = []
    if (!resp.error_code) results = resp.data
    return results
  }
}
