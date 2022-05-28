<template >
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top:20px">
      <el-card shadow="hover">
        <div class="user">
          <img class="userImg" :src="userImg">
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>

        <div class="login-info">
          <p>上次登录时间：<span>2021-7-19</span></p>
          <p>上次登录地点：<span>四川</span></p>
        </div>
      </el-card>

      <el-card style="margin-top:20px;height:400px">
        <el-table :data="tabelData">
          <el-table-column v-for="(val,index) in tabelLabel" 
          :key="index" 
          :prop="index"
          :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col style="margin-top:20px" :span="16" >
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
          <i class="icon" :class="'el-icon-'+item.icon" :style="{background:item.color}"></i>
          <div class="detail">
            <p class="value">￥{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>


      <el-card style="height:280px">
        <!-- <div style="height:280px" ref="echarts"></div> -->
        <echarts style="height:280px" :chartData="echartData.order"></echarts>
      </el-card>


        <div class="graph">
          <el-card style="height:260px">
            <!-- <div style="height:240px" ref="userEcharts"></div> -->
                    <echarts style="height:240px" :chartData="echartData.user"></echarts>
          </el-card>
          <el-card style="height:260px">
            <!-- <div style="height:240px" ref="videoEcharts"></div> -->
                    <echarts style="height:240px" :isAxisChart = "false" :chartData="echartData.video"></echarts>
          </el-card>
        </div>

  

    </el-col>
  </el-row>
</template> 


<script>
import {getData} from '../../api/data'
// import * as echarts from 'echarts'
import Echarts from '../../src/components/ECharts.vue'


export default {
  name: "home",
  components:{
    Echarts
  },
  data () {
    return {
      userImg:require("../../src/assets/userImg.webp"),
      tabelLabel:{
          name:"课程",
          todayBuy:"今日购买",
          monthBuy:"本月购买",
          totalBuy:"总销售"

        },
      tabelData:[],
      countData:[
        {
          name:"今日支付订单",
          value:1234,
          icon:"success",
          color:"#2ec7c9"
        },
        {
          name:"今日收藏订单",
          value:210,
          icon:"star-on",
          color:"#ffb980"
        },
        {
          name:"今日未支付订单",
          value:1234,
          icon:"s-goods",
          color:"#5ab1ef"
        },
        {
          name:"本月支付订单",
          value:1234,
          icon:"success",
          color:"#2ec7c9"
        },
        {
          name:"本月收藏订单",
          value:210,
          icon:"star-on",
          color:"#ffb980"
        },
        {
          name:"本月未支付订单",
          value:1234,
          icon:"s-goods",
          color:"#5ab1ef"
        },
      ],
      echartData:{
        order:{
          xData:[],
          series:[]
        },
        user:{
          xData:[],
          series:[]            
        },
        video:{
          series:[]               
        }
      }
    }
  },
  created(){
        getData().then(res => {
      console.log(res);
      const {code,data} = res.data
      console.log(code);
      console.log(data);
      })
  },
  mounted(){
    getData().then(res => {
      console.log(res);
      const {code,data} = res.data
      if(code == 20000){
        this.tabelData = data.tabelData
        // 处理echarts的数据
        const order = data.oderData
        const xData = order.date
        const keyArray = Object.keys(order.data[0]) 
        const series = []
        keyArray.forEach(key =>{
          series.push({
            name:key,
            data:order.data.map(item => item[key]),
            type:'line'
          })
        })
        console.log(keyArray);



        this.echartData.order.xData = xData
        this.echartData.order.series = series
        


        this.echartData.user.xData = data.uerData.map(item => item.date)
        this.echartData.user.series = [
            {
              name:'新增用户',
              data:data.uerData.map(item => item.new),
              type:'bar'
            },
            {
              name:'活跃用户',
              data:data.uerData.map(item => item.active),
              type:'bar'
            }
          ]

        this.echartData.video.series = [
            {
              data:data.videoData,
              type:'pie'
            }
          ]
      }
  
    // console.log(res);
  }).catch(err => {
    console.log(err);
  })
  }
}
</script>

<style lang="less" scoped>

.user{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid black;
  padding: 0 0 10px 0;

}
.userImg{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 20px 0 0;

}

.login-info{
  position: relative;
  top: 10px;
  p{
    font-size: 12px;
  }
}
.num{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card{
    width: 240px;
    height: 55px;
    margin-bottom: 10px;
    i{
      width:55px;
      height: 55px;
      font-size: 24px;
      text-align: center;
      line-height: 55px;
      color: white;
      margin: 0 10px 0 0;
    }
  }
}
.detail {
  p{
    margin: 4px;
    padding: 0;
    font-size: 14px;
  }
  .value{
    font-size: 18px;
    
  }
  .txt{
    font-size: 12px;
  }
}
.graph{
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin: 20px 0 0 0 ;
  .el-card{
    width: 400px;
  }
}


</style>
