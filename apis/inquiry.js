import axios from 'axios'

const env = process.env.NODE_ENV
const url = env === 'production' ? 'https://www.wifihi.cn' : 'http://localhost:3010'

const request = axios.create({
  baseURL: url,
  timeout: 1000
})

export default class inquiry {
  static async create ({ inquiry }) {
    const resp = await request.post('/api/inquiries', inquiry)
    console.log(resp.data)
    return resp.data
  }
}
