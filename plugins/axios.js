import * as axios from 'axios'

export default ({ app, store, redirect }) => {
  axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'http://api.herhairworld.com' : 'http://127.0.0.1:3010'
  let authToken = ''
  if (!process.server) {
    authToken = window.localStorage.getItem('authToken')
  } else {
    authToken = store.state.authToken
  }

  axios.interceptors.request.use(req => {
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
