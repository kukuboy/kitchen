import Axios from 'axios'

const httpA = Axios.create()
export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, '$http', {
      value: this, // 设置值
      writable: false // 是否可以改变，默认false，更改会报undefined
    })
    httpA.defaults.baseURL = '/api/serveltDemo_war_exploded'
    httpA.defaults.headers.common['token'] = localStorage.invest_h5_token
    // 设置请求拦截器
    httpA.interceptors.request.use(
      config => {
        config.headers.common['token'] = localStorage.invest_h5_token
        return config
      },
      err => {
        return Promise.reject(err)
      }
    )
    // 设置响应拦截器
    httpA.interceptors.response.use(
      res => {
        // 统一判断，如果请求成功返回数据
        let data = res.data
        let flag = data.flag
        if (flag === 1) {
          return data
        } else if (flag === 4000) {
          // token过期
          // 返回app界面
          localStorage.invest_h5_token = ''
          window.ws.close()
        } else {
          return Promise.reject(data.msg)
        }
      },
      error => {
        // dialog.toast(error.message ? error.message : error)
        return Promise.reject(error)
      }
    )
  },
  // 查询公告
  addFood (params) {
    return httpA({
      url: '/addFood',
      params: params,
      method: 'POST'
    })
  },
  // 查询置顶消息
  findTopMsg (params) {
    return httpA({
      url: '/advisor/talk/findTopMsg',
      params: params,
      method: 'POST'
    })
  }
}
