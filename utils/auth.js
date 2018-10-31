import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'

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

export const setToken = ({ token }) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('token', token)
  Cookie.set('token', token)

  window.localStorage.setItem('authToken', token)
  Cookie.set('authToken', token)
}

export const setServerToken = ({ token }) => {
  if (process.SERVER_BUILD) return
  Cookie.set('token', token)
  Cookie.set('authToken', token)
}

export const setClientToken = ({ token }) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('authToken', token)
}

export const unsetToken = () => {
  if (process.SERVER_BUILD) return
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')
  window.localStorage.removeItem('secret')
  window.localStorage.removeItem('authToken')
  Cookie.remove('token')
  Cookie.remove('authToken')
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
  const authToken = window.localStorage.authToken
  return authToken ? jwtDecode(authToken) : ''
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
