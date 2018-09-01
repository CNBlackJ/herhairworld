import axios from 'axios'

const env = process.env.NODE_ENV
const url = env === 'production' ? 'https://www.wifihi.cn' : 'http://localhost:3010'

const request = axios.create({
  baseURL: url,
  timeout: 1000
})

export default request
