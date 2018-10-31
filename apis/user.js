import md5 from 'md5'

import request from './request'

export default class user {
  static async getUser () {
    const resp = (await request.get('/api/user')).data
    let userInfo = null
    if (!resp.error_code) userInfo = resp.data
    return userInfo
  }

  static async auth0Create ({ auth0User }) {
    const resp = (await request.post('/api/users/auth0', auth0User)).data
    let userInfo = null
    if (!resp.error_code) userInfo = resp.data
    return userInfo
  }

  static async login ({ email, password }) {
    const resp = await request.post('/api/users/login', { email, password: md5(password) })
    return resp.data
  }

  static async autoCreate () {
    // generate unique user._id
    const user = {
      uniqueId: md5(new Date()),
      type: 'visitor'
    }
    const resp = (await request.post('/api/users/visitor', user)).data
    let userInfo = null
    if (!resp.error_code) userInfo = resp.data
    return userInfo
  }
}
