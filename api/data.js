import axios  from "./axios";  //引入经过二次封装的axios工具类

// 导出请求方法
export const getMenu  = (param) =>{
  console.log(param);
  return axios.request({
    url:'/permission/getMenu',
    method:'post',
    data:param
  })
}
export const getData = () => {
  return axios.request({
    url:'/home/getData'
  })
}

export const getUserList =(param) =>{
  console.log(param);
  if(param.name){
    return axios.request({
      url:'/user/getUser?name='+param.name,
      method:'get',
      param
    })
  }else {
    return axios.request({
      url:'/user/getUser',
      method:'get',
      param
    })
  }

}


