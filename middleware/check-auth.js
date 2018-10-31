import { setToken, getAuthTokenFromCookie, getAuthTokenFromLocalStorage } from '~/utils/auth'

import user from '@/apis/user'

export default async function ({ store, req }) {
  const isServer = process.server
  if (isServer && !req) return
  const authToken = isServer ? getAuthTokenFromCookie(req) : getAuthTokenFromLocalStorage()
  console.log('++++')
  console.log(authToken)
  if (authToken) {
    store.commit('SET_AUTH_TOKEN', authToken)
    const loggedUser = store.state.user
    console.log('++++')
    console.log(loggedUser)
    if (!loggedUser) {
      const userInfo = await user.getUser()
      console.log('++++')
      console.log(userInfo)
      if (!userInfo) {
        // 创建一个visitor
        await store.dispatch('createVisitor')
        setToken({ token: authToken })
      } else {
        store.commit('SET_USER', userInfo)
      }
    }
  } else {
    await store.dispatch('createVisitor')
  }
  setToken({ token: store.state.authToken })
}
