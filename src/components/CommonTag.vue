<template >
  <div class="tabs">
    <el-tag 
      size="small"
       v-for="(tag,index) in tags" :key="tag.name"
      :closable="tag.name !=='/home'"
      :effect="$route.name == tag.name?'dark':'plain'"
      @click="changeMenu(tag,index)"
      @close="handleClose(tag,index)"
     
      >{{tag.label}}

    </el-tag>
  </div>
</template> 


<script>
import {mapState,mapMutations} from 'vuex'
  export default {
    name: "CommonTag",
    data () {
      return {}
    },
    computed:{
      ...mapState({
        tags:state => state.tab.tabsList
      })
    },
    
    created(){
      console.log(this.tags.length);
    },
    methods:{
      ...mapMutations({      //通过mapmutation辅助函数，将store中的mutation注入到页面中
          close:'closeTag'   // 此方法就是嗲用close属性就是直接调用定义在mutation中的closeTag函数
      }),
      changeMenu(item,index){
        if(this.$route.name == item.name){
          return
        }
        this.$router.push({name:item.name})
        console.log(index);
      },
      handleClose(tag,index){


        const length =  this.tags.length -1
        // if(tag.name !== this.$route.name){
        //     console.log("删除当前");
        //   return 
        // }
        console.log(length);
        console.log(index);

        if(index == length){
          console.log("删除末尾元素");
          this.$router.push({
            name:this.tags[index-1].name 
          })
        }else{
          console.log("删除非末尾元素");
          console.log(index);
          this.$router.push({name:this.tags[index].name})
        }

        this.close(tag)

      }
    }
  }
</script>

<style lang="less" scoped>
.tabs{
  padding:20px;
  .el-tag{
    margin: 0 15px 0 0;
    cursor: pointer;
  }
}
</style>
