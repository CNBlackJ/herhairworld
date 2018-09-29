import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

import user from '@/apis/user'

const getQueryParams = () => {
  const params = {}
  window.location.href.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    params[$1] = $3
  })
  return params
}

export const extractInfoFromHash = () => {
  if (process.SERVER_BUILD) return
  const { id_token, state } = getQueryParams()
  return {
    token: id_token,
    secret: state
  }
}

export const setToken = async (token) => {
  if (process.SERVER_BUILD) return
  const userInfo = jwtDecode(token)
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(userInfo))
  Cookie.set('token', token)
  // craete auth0 user
  const auth0User = { auth0Sub: userInfo.sub, auth0User: JSON.stringify(userInfo) }
  const auth0UserInfo = await user.auth0Create({ auth0User })
  window.localStorage.setItem('authToken', auth0UserInfo.authToken)
  Cookie.set('authToken', auth0UserInfo.authToken)
}

export const unsetToken = () => {
  if (process.SERVER_BUILD) return
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')
  window.localStorage.removeItem('secret')
  Cookie.remove('token')
  window.localStorage.setItem('logout', Date.now())
}

export const getUserFromCookie = (req) => {
  if (!req.headers.cookie) return
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('token='))
  if (!jwtCookie) return
  const jwt = jwtCookie.split('=')[1]
  return jwtDecode(jwt)
}

export const getUserFromLocalStorage = () => {
  const authToken = window.localStorage.user
  return authToken
}

export const getAuthTokenFromCookie = (req) => {
  if (!req.headers.cookie) return
  const authToken = req.headers.cookie.split(';').find(c => c.trim().startsWith('authToken='))
  if (!authToken) return
  return authToken.split('=')[1]
}

export const getAuthTokenFromLocalStorage = () => {
  return window.localStorage.authToken || ''
}

export const setSecret = (secret) => window.localStorage.setItem('secret', secret)

export const checkSecret = (secret) => window.localStorage.secret === secret
