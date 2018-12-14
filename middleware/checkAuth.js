import LS from '@/apis/localStorage'
import user from '@/apis/user'

import { getTokenFromCookie } from '@/utils/authV1'

const needAuth = [
  '/user'
]

export default async function ({ route, req, res, redirect, store }) {
  const isClient = process.client
  const isServer = process.server

  let authToken = null
  let path = ''

  // 在服务端判读是否需要登陆(如果直接输地址，在客户端是判断不到的)
  if (isServer) {
    path = req.originalUrl
    authToken = getTokenFromCookie(req)
  }
  // 在客户端判读是否需要登陆
  if (isClient) {
    authToken = LS.getVal('authToken')
    path = route.path
  }

  if (authToken) {
    store.commit('SET_AUTH_TOKEN', { authToken })
    const userInfo = await user.getUser()
    if (!userInfo) {
      await store.dispatch('createVisitor')
      if (path === '/login') redirect('/user')
    }
  }

}
