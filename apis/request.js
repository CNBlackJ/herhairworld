import * as axios from 'axios'

// import LS from './localStorage'

// const env = process.env.NODE_ENV
// const url = env === 'production' ? 'https://www.wifihi.cn' : 'http://127.0.0.1:3010'

// const request = axios.create({
//   baseURL: url,
//   timeout: 1000
// })

// request.interceptors.request.use(req => {
//   const authToken = LS.getVal('auth_token')
//   if (authToken) req.headers['Authorization'] = `Bearer ${authToken}`
//   return req
// })

const request = axios

export default request
