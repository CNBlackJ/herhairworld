import request from './request'

export default class price {
  static async get (_id) {
    const resp = (await request.get(`/api/prices/${_id}`)).data
    let result = {}
    if (!resp.error_code) result = resp.data
    return result
  }
}
