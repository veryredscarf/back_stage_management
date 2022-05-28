
import Cookie from "js-cookie"

export default {
  state:{
    //定义菜单栏是否收起 默认false
    isCollapse:false,
    tabsList:[
      {
      path:'/',
      name:'home',
      label:'首页',
      icon:'home'
      }
    ],
    currentMenu:null, // 记录当前选中的路由
    menu:[]  // 接收登录之后后端返回的路由从而做到动态路由的效果，起到权限限制的功能
  },
  mutations:{
    collapseMenu(state){
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state,val){
      if(val.name !== 'home'){
        state.currentMenu = val
        const result = state.tabsList.findIndex(item => item.name === val.name)
        if(result === -1){
          state.tabsList.push(val)
          console.log('刘伟牛逼');
        }
      }else{

        state.currentMenu = null
      }
    },
    // 删除tabs中某一tag
    closeTag(state,val){
      console.log("删除tag");
      console.log(val.name);
      const tagIndex = state.tabsList.findIndex(item => item.name === val.name )
      console.log(tagIndex);
      if(tagIndex){
        state.tabsList.splice(tagIndex,1)
      }

    },
    // 设置menu数据
    setMenu(state,val){
      state.menu = val
      // 同时将获取到的menu数据存储到menu中，避免页面刷新之后，menu数据丢失
      Cookie.set('menu',JSON.stringify(val))
    },
    // 清除menu数据
    clearMenu(state){
      state.menu= []
      Cookie.remove('menu')
    },
    // 添加menu,完成路由的动态添加

    // eslint-disable-next-line
    addMenu(state,router){
      console.log(router);
      if(!Cookie.get('menu')){
        return
      }else{

        const menu = JSON.parse(Cookie.get('menu'))
  
        state.menu = menu
        // 完成动态路由添加
        const menuArray = []
        menu.forEach(item => {
        console.log(item);
          if(item.children){
            // 手动给路由添加conponent属性，完成动态路由的设定
            item.children = item.children.map(item => {
              // 对有子路由的页面进行处理
              item.component = () => import (`../views/${item.url}`)
              return item
            })
            menuArray.push(...item.children)
          }else {

            item.component = () => import (`../views/${item.url}`)
            menuArray.push(item)
          }
        })
        // 完成路由的动态添加
        console.log(menuArray);
        menuArray.forEach(item => {
          console.log(item);
 
          router.addRoute('Main',item)   // 注：此时的vue-router版本需得3.5.3才行，不然就会一直是router.addRoute() is not a function
          
        })
        console.log(router)

      }
    }

  }
}