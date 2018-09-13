import md5 from 'md5'

import request from './request'

export default class user {
  static async getUser () {
    const resp = await request.get('/api/user')
    return resp.data
  }

  static async create ({ user }) {
    delete user.pwConfirm
    user.password = md5(user.password)
    const resp = await request.post('/api/users', user)
    return resp.data
  }

  static async login ({ email, password }) {
    const resp = await request.post('/api/users/login', { email, password: md5(password) })
    return resp.data
  }

  static async autoCreate (mobile) {
    const user = {
      username: mobile,
      mobile,
      password: md5(mobile)
    }
    return this.create({ user })
  }
}
