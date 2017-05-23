import axios from 'axios'
import qs from 'qs'
const instance = axios.create({
  baseURL: global.host,
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  transformRequest: [function (data) {
    /* 做任何你想要的数据转换 */
    // console.info(data)
    return qs.stringify(data)
  }]
})
export default instance
