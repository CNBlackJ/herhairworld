import LS from '@/apis/localStorage'

export const getTokenFromCookie = (req) => {
  if (!req.headers.cookie) return
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('authToken='))
  if (!jwtCookie) return
  const jwt = jwtCookie.split('=')[1]
  return jwt
}

export const getTokenFromLocalStorage = () => {
  const jwtToken = LS.getVal('authToken')
  return jwtToken
}
