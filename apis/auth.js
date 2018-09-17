import md5 from 'md5'

import request from './request'

export default class auth {
  static async getToken ({ email, password }) {
    const resp = await request.post('/api/auth', { email, password: md5(password) })
    return resp.data
  }
}
