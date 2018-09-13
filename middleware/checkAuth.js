import { getTokenFromCookie, getTokenFromLocalStorage } from '~/utils/auth'

import user from '@/apis/user'

export default function ({ isServer, store, req }) {
  if (isServer && !req) return
  const authToken = isServer ? getTokenFromCookie(req) : getTokenFromLocalStorage()
  if (authToken && !store.state.isLogin) {
    user.getUser().then((resp) => {
      if (!resp.error_code) {
        store.dispatch('setLoginUser', { loginUser: resp.data })
      } else {
        console.log(resp.error_msg)
      }
    })
  }
}
