<template >
  <div class="manage">
    <el-dialog
      :title="operateType=='add'?'新增用户':'更新用户'"
      :visible.sync="isSure"
      >
    <common-form
      :formLabel="operateFormLabel"
      :form="operateForm"
      :inline="true"
      ref="form"
    ></common-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isSure =false">取消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </div>
    </el-dialog>
    <div class="mange-header">
      <el-button type="primary" @click="addUser">+新增</el-button>
          <common-form
            :formLabel="formLabel"
            :form="searchForm"
            :inline="true"
            ref="form"
            @myevent="getList"
          >
          <el-button type="primary" @click="getList">搜索</el-button>
          </common-form>
    </div>

    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @delete="delUser"
    >

    </common-table>
  </div>
</template> 


<script>
import CommonForm from "../../src/components/CommonFrom.vue"
import CommonTable from "../../src/components/CommonTable.vue"
import { getUserList} from "../../api/data"
  export default {
    name: "User",
    components:{
      CommonForm ,
      CommonTable
    },
    data () {
      return {
        operateType:"add",
        isSure:false,
        operateFormLabel: [
          {
            model:'name',
            label:"姓名",
            type:'input'
          },
          {
            model:'age',
            label:"年龄",
            type:"input"
          },
          {
            model:'sex',
            label:'性别',
            type:"select",
            opts:[
              {
                label:"男",
                value:1
              },
              {
                label:"女",
                value:0
              }
            ]
          },
          {
            model:'birth',
            label:'出生日期',
            type:'date'
          },
          {
            model:'addr',
            label:"地址",
            type:"input"
          }
        ],
        operateForm:{
          name:"",
          age:"",
          sex:"",
          birth:"",
          addr:"",
        },
        formLabel:[
          {
            model:"keyword",
            label:"",
            type:'input'
          }
        ],
        searchForm:{
          keyword:''
        },
        tableData:[],
        tableLabel:[
          {
            prop:"name",
            label:'姓名'
          },
          {
            prop:"age",
            label:'年龄'
          },
          {
            prop:"sexLabel",
            label:'性别'
          },
          {
            prop:"birth",
            label:'出生日期',
            width:200
          },
          {
            prop:"addr",
            label:'地址',
            width:340
          },
        ],
        config:{
          page:1,
          total:10
        }
      }
    },
    created(){
      this.getList()
    },
    methods:{
      // doSomething(value){
      //   console.log(value);
      //   // alert(value);
      // },
      addUser(){
        this.isSure = true
        this.operateType = 'add'
        this.operateForm = {
          name:"",
          addr:"",
          age:"",
          birth:"",
          sex:""
        }

      },
      confirm(){
        console.log("我执行了");
        if(this.operateType ==='edit'){
          this.$http.post("/user/edit",this.operateForm).then(res =>{
            console.log(res);
            this.isSure = false
            this.getList()
          })
        }else{
          this.$http.post("/user/add",this.operateForm).then(res =>{
            console.log(res);
            this.isSure = false
            this.getList()
          })
        }
      },
      editUser(row){
        this.operateType = 'edit',
        this.isSure = true
        this.operateForm = row
      },
      delUser(row){
        console.log("hhhhh,删除用户")
        this.$confirm("此操作将永久删除该组件，是否继续？","提示",{
          confirmButtonText:"确认",
          cancelButtonText:"取消",
          type:"warning "
        }).then(() => {
          const id = row.id
          this.$http.post("/user/del",{
            param:{id}
          }).then(() => {
            this.$messsage( {
              type:"success",
              message:"删除成功"
            })
            this.getList()
          })
        })
      },
      getList(name =''){
        console.log(name);
          this.config.loading = true
          name ? (this.config.page =1) :''
        getUserList({
          page:this.config.page,
          name
        }).then(({data:res}) => {   // 对请求结果数据进行解构
          console.log(res);
          this.tableData =  res.list.map(item => {
            item.sexLabel = item.sex === 0 ?"女":"男"
            return item
          })
          this.config.total = res.count
          this.config.loading = false
        })
        
      }
    }
  }
</script>
<style lang="less" scoped>
.mange-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
