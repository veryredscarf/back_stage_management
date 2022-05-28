<template >
  <el-form
   :model = "form"
   status-icon
   :rules='rules'
   ref="form"
   label-width ='100px'
   class="login-container"
  >
  <h3 class="login_title">系统登陆</h3>
  <el-form-item
  label='用户名'
  label-width='80px'
  prop="username"
  class="username"
  >
  <el-input
    type="input"
    v-model ="form.username"
    autocomplete = "off"
    placeholder="请输入账号"
  ></el-input>
  </el-form-item>
  <el-form-item
    label="密码"
    label-width='80px'
    prop="password"
    class="password"

  >
  <el-input
    type="password"
    v-model ="form.password"
    autocomplete = "off"
    placeholder="请输入密码"
  >

  </el-input>
  </el-form-item>

  <el-form-item 
    class="login_submit">
    <el-button type="primary" @click="login" class="login_submit">登录</el-button>
  </el-form-item>


  </el-form>
</template> 


<script>

// 使用mock随机数来模拟后端返回的token
// import Mock from 'mockjs'



import {getMenu} from '../../api/data'

  export default {
    name: "Login",
    data () {
      return {
        form:{

        },
        rules:{
          // 对于用户名的校验
          username:[{   
            required:true,
            message:'请输入用户名',
            trigger:'blur'
          },
          {
            min:3, //最短长度  
            message:'用户名长度不能小于3位',
            trigger:'blur'
          }],
          // 对于密码的校验
          password:[
            {
            required:true,
            message:'请输入密码',
            trigger:'blur'
            },

          ]
        }
      }
    },
    methods:{
      login(){
        console.log(this.form);
        getMenu(this.form).then(res => {
        
          if(res.data.code===2000){

            this.$store.commit('clearMenu')
            this.$store.commit('setMenu',res.data.data.menu)
            this.$store.commit('setToken',res.data.data.token)
            this.$store.commit('addMenu',this.$router)
            this.$router.push({name:'home'})
          }else{
            this.$message.warning(res.data.data.message)
          }
        })

      }
    }
  }
</script>
<style lang="less" scoped>
.login-container{
  border-radius: 15px;
  background-clip:padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color:white ;
  border: 1px solid #eaeaea;
  box-shadow: 0px 0px 25px #cac6c6;


}
  .login_title{
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;

  } 
  .login_submit{
    margin: 10px auto 0px auto;
  }
</style>
