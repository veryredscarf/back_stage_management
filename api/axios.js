import axios from "axios"

import config from "../config/index"

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev:config.baseUrl.pro   //通过判断当前运行环境来获取请求地址  process.env.NODE_ENV

class HttpRequest {
   constructor(baseUrl){
    this.baseUrl = baseUrl
   }
   getInsideConfig(){  //定义axios的相关配置

     const config  = {
       baseUrl :this.baseUrl,
       header:{}
     }
     return config
   }

   interceptors (instance) {  // 设置axios拦截器方法
    // 添加请求拦截器
    instance.interceptors.request.use(function(config){
      // 在请求之前做些什么
      return config
    },function (error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    })

    instance.interceptors.response.use(function(response){
      // 对响应数据处理
      console.log(response);
      return response
     
    },function(error){
      // 对响应错误做些什么
      console.log(error);
      return Promise.reject(error)
    })
   }

   request(options){  //定义请求方法
    const instance = axios.create()
    options = {...this.getInsideConfig(),...options}
    this.interceptors(instance)
    return instance(options)
   }

} 

export default new HttpRequest(baseUrl)