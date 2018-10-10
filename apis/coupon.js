import request from './request'

export default class coupon {
  static async list ({ limit, skip, sort }) {
    const queryStr = `?limit=${limit || 20}&skip=${skip || 0}&sort=${sort || '-createdAt'}`
    const resp = (await request.get(`/api/coupons${queryStr}`)).data
    let results = []
    if (!resp.error_code) results = resp.data
    return results
  }
}
