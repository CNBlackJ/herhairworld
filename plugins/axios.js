import * as axios from 'axios'

const baseURL = {
  production: 'http://apiherhairworld.wifihi.cn',
  staging: 'http://apiherhairworld.wifihi.cn',
  development: 'http://127.0.0.1:3010'
}

export default ({ app, store, redirect }) => {
  const BASE_URL = require('~/config.json').BASE_URL || 'http://192.168.0.102:3010'
  axios.defaults.baseURL = BASE_URL || baseURL[process.env.NODE_ENV] || baseURL['staging']
  let authToken = ''
  if (process.client) {
    authToken = window.localStorage.getItem('authToken')
  } else if(process.server) {
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
