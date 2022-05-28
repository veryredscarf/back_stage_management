<template >
  <header>
    <div class="l-content">
      <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
      <!-- <h3 style="color:#fff">首页</h3> -->
      <el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>


    </div>

    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        
          <img class="userImg" :src="userImg">
        
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item >个人中心</el-dropdown-item>
          <!-- 在组件中添加点击事件需要加一个native属性 -->
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </header>
</template> 


<script>
import {mapState} from 'vuex'

  export default {
    name: "CommonHeader",
    data () {
      return {
        userImg:require("../assets/userImg.webp")
      }
    },
    methods:{
      handleMenu(){
        this.$store.commit("collapseMenu")
      },
      
      logOut(){
        // 退出时清除数据操作
        this.$store.commit('clearToken')
        this.$store.commit('clearMenu')
        this.$router.push('/login')
        
      }
    },
    computed:{
      ...mapState({
        tags:state => state.tab.tabsList
        
        
      })
    }
  }
</script>

<style lang="less" scoped>
// .el-breadcrumb .el-breadcrumb-item{
//   color: red;
// }



h3{
  display: inline-block;
}
header{
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
.l-content{
  display: flex;
  align-items: center;
  .el-button{
    margin-right: 20px;
  }
}
.r-content{
  .userImg{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

}

.el-breadcrumb ::v-deep .el-breadcrumb__inner {
  color: #a1a1a1 ;
}

</style>
