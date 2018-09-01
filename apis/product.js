import request from './request'

export default class product {
  static async create (prod) {
    const resp = await request.post('/api/products', prod)
    console.log(resp)
    return resp.data
  }
}
