import * as axios from 'axios'

// function getCookieInClient (name) {
//   const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
//   const arr = document.cookie.match(reg)
//   console.log(document.cookie)
//   if (arr) {
//     return unescape(arr[2])
//   } else {
//     return null
//   }
// }

export default ({ app, store, redirect }) => {
  axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'http://47.90.207.98:3010' : 'http://127.0.0.1:3010'

  axios.interceptors.request.use(req => {
    const authToken = store.state.authToken
    if (authToken) {
      req.headers.Authorization = `Bearer ${authToken}`
    }
    return req
  }, err => {
    return Promise.reject(err)
  })

  axios.interceptors.response.use(response => {
    if (response.data.code === 401) {
      // redirect('/login')
      console.log('axios 401 error')
    }
    return response
  }, function (error) {
    return Promise.reject(error)
  })
}
