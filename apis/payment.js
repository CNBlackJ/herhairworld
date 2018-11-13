import request from './request'

export default class payment {
  static async getIsUsingPayment () {
    const queryStr = `?limit=1&skip=0&isUsing=true`
    const resp = (await request.get(`/api/payments${queryStr}`)).data
    let results = []
    if (!resp.error_code) results = resp.data
    return results.rows[0]
  }
}
