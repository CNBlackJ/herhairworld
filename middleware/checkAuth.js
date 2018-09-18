import LS from '@/apis/localStorage'
import user from '@/apis/user'

import { getTokenFromCookie } from '@/utils/authV1'

const needAuth = [
  '/user'
]

export default async function ({ route, req, res, redirect, store }) {
  const isClient = process.client
  const isServer = process.server
  // 在服务端判读是否需要登陆(如果直接输地址，在客户端是判断不到的)
  if (isServer) {
    const path = req.originalUrl
    const authToken = getTokenFromCookie(req)

    if (authToken) {
      store.commit('setAuthToken', { authToken })
      const resp = await user.getUser()
      if (!resp.error_code) {
        const loginUser = resp.data
        store.dispatch('setLoginUser', { loginUser })
        if (path === '/login') redirect('/user')
      } else {
        console.log(`isServer: ${JSON.stringify(resp.error_msg)}`)
      }
    }

    if (needAuth.indexOf(path) > -1 && !authToken) {
      redirect('/login')
    }
  }
    // 在客户端判读是否需要登陆
  if (isClient) {
    const authToken = LS.getVal('auth_token')
    const path = route.path
    if (authToken) {
      store.commit('setAuthToken', { authToken })
      const resp = await user.getUser()
      if (!resp.error_code) {
        const loginUser = resp.data
        store.dispatch('setLoginUser', { loginUser })
        if (path === '/login') redirect('/user')
      } else {
        console.log(`isClient: ${JSON.stringify(resp.error_msg)}`)
      }
    }
  }
}
