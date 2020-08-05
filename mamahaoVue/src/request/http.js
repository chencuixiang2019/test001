import axios from 'axios'
import {Loading, Message} from 'element-ui'
import router from '../router/index'
import base from './base'
// axios.defaults.timeout = 7000
let loading

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '加载中....',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() {
  loading.close()
}

// 请求拦截
axios.interceptors.request.use(
  // confing.headers.Authorization = sessionStorage.getItem('uuid')

  config => {
    startLoading()
    //设置请求头
    console.log("vue请求拦截")
    var token = sessionStorage.getItem('token')
    var uuid = sessionStorage.getItem('uuid')
    // if (uuid == null || token == null) {
    //   console.log("uuid或者token没有时，跳转登录页面")
    //   router.push({path: '/login', replace: true})
      // }x
      var nowurl = config.url.substr(0, 25)
      if (nowurl === base.url) {
          if (token != null && uuid != null) {
              config.headers['token'] = token
              config.headers['uuid'] = uuid
          }
      }
    return config
  },
  (error) => {
    endLoading()
    Message.error("请求超时")

    return Promise.reject(error)
  }
)

//响应拦截

axios.interceptors.response.use(
  (response) => {
    endLoading()
    return response
  },
  (error) => {
    var reg=RegExp("403")
    if (reg.exec(error)) { //权限不足的时候重定向登录页面
      router.push({path: '/login', replace: true})
    }
    endLoading()
    // console.log(error)
    Message.error("请求异常")
    return Promise.reject(error)
  }
)
export default axios
