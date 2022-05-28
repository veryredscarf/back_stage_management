import Cooke from "js-cookie"
export default {
  state:{
    token:''
  },
  mutations:{
    // 设置token
    setToken(state,val){
      state.token = val
      Cooke.set("token",val)
    },
    // 清楚·token
    clearToken(state){
      state.token = ''
      Cooke.remove('token')
    },
    // 获取token
    getToken(state){

      state.token = state.token || Cooke.get('token')

    }
  }
}