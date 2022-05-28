import Vue from 'vue'
import App from './App.vue'
import Element from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import http from "axios"

import router from "../router/index"
import store from "../store/index"

import  '../api/mock'

Vue.prototype.$http = http
Vue.prototype.$confirm = Element.MessageBox.confirm
Vue.prototype.$messsage = Element.Message

Vue.use(Element)

Vue.config.productionTip = false

router.beforeEach((to,form,next) => {
  console.log("lllll");
  // 目的：防止页面刷新之后，存储在vueX的数据中token信息丢失
  store.commit("getToken")
  let token = store.state.user.token
  if(!token && to.name !== 'login'){
    next({name:'login'})
    console.log("未登录");
  }else if(token&&to.name == 'login'){
    next({name:'home'})
  }
  else{
    console.log("已登录");
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  // 利用vue生命周期函数，页面在渲染之前，完成动态路由的添加使得页面刷新后白屏的问题
  mounted() {
    store.commit('addMenu',router)
    router.push({name:'home'})
  },

}).$mount('#app')
