import axios from 'axios'

import LS from './localStorage'

const env = process.env.NODE_ENV
const url = env === 'production' ? 'https://www.wifihi.cn' : 'http://192.168.0.183:3010'

const request = axios.create({
  baseURL: url,
  timeout: 1000
})

request.interceptors.request.use(req => {
  const authToken = LS.getLocalStorage('auth_token')
  if (authToken) req.headers['Authorization'] = `Bearer ${authToken}`
  return req
})

export default request
