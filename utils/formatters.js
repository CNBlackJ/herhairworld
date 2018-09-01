import moment from 'moment'

export default class formatter {
  static formatDate ({ date }) {
    const format = 'YYYY-MM-DD HH:mm:ss'
    return moment(date).format(format)
  }
}
