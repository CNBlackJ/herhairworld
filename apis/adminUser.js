import md5 from 'md5'

import request from './request'

export default class user {
  static async getAdminUser (_id) {
    const resp = await request.get(`/api/adminUsers/${_id}`)
    return resp.data
  }

  static async create ({ adminUser }) {
    delete adminUser.pwConfirm
    adminUser.password = md5(adminUser.password)
    const resp = await request.post('/api/adminUsers', adminUser)
    return resp.data
  }

  static async login ({ username, password }) {
    const resp = (await request.post('/api/adminUsers/login', { username, password: md5(password) })).data
    let user = null
    if (!resp.error_code) user = resp.data
    return user
  }
}
