<template>

    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
       :collapse="isCollapse">
     
      <h3 >{{isCollapse?'后台':'通用后台管理系统'}}</h3>
      
      <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
        <i :class="'el-icon-'+item.icons"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>

      <el-submenu v-for="item in hasChildren" :index="item.path+''" :key="item.path">
        <template slot="title">
          <i :class="'el-icon-'+item.icons"></i>
          <span slot="title">{{item.label}}</span>
        </template>

        <el-menu-item-group  v-for="(subItem,subIndex) in item.children" :key="subItem.path">
          
          <el-menu-item @click="clickMenu(subItem)" :index="subIndex+''">
            <i :class="'el-icon-'+subItem.icon"></i>
            <span>{{subItem.label}}</span>
            </el-menu-item>
        </el-menu-item-group>

      </el-submenu>
    </el-menu>


  
</template>
<script>
export default {
  name:"CommonAside",
  data(){
    return{
  
      menu:[]
     }
  },
  computed:{
    // 数据处理：处理菜单栏是否有子项目分页,对菜单栏数据进行过滤,

    // 如果有子项目就进行过滤
    noChildren(){
      return this.asyncMenu.filter(item => !item.children)
    },
    
    hasChildren(){
      return this.asyncMenu.filter(item => item.children)
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    },
    // 获取菜单信息
    asyncMenu(){
      return this.$store.state.tab.menu
    }
  },
  methods:{
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){
      if(item.name == this.$route.name){
        return
      }
      this.$router.push({
        name:item.name
      })
      this.$store.commit("selectMenu",item)
    }
    
  }
}

</script>

<style lang="less" scope>
.el-menu-vertical-demo:not(.el-menu--collapse){
  width:200px;
  min-height:400px;

}
.el-menu{
  height: 100%;
  border: none;
  h3{
    color: #fff;
    text-align: center;
    line-height: 48px;

  }
}
</style>