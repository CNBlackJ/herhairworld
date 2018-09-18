import { getUserFromCookie, getUserFromLocalStorage } from '~/utils/auth'

export default function ({ store, req }) {
   // If nuxt generate, pass this middleware
  const isServer = process.server
  if (isServer && !req) return
  const loggedUser = isServer ? getUserFromCookie(req) : getUserFromLocalStorage()
  store.commit('SET_USER', loggedUser)
}
