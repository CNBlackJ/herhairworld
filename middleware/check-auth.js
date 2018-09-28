import { getUserFromCookie, getUserFromLocalStorage, getAuthTokenFromCookie, getAuthTokenFromLocalStorage } from '~/utils/auth'

export default function ({ store, req }) {
   // If nuxt generate, pass this middleware
  const isServer = process.server
  if (isServer && !req) return
  const loggedUser = isServer ? getUserFromCookie(req) : getUserFromLocalStorage()
  const authToken = isServer ? getAuthTokenFromCookie(req) : getAuthTokenFromLocalStorage()
  store.commit('SET_AUTH_TOKEN', authToken)
  store.commit('SET_USER', loggedUser)
}
