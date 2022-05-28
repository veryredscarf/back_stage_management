<template>
  <div ref="echart">

  </div>
</template>


<script>
import * as echart from 'echarts'

export default{
  props:{
    // 由于饼状图和折线图，柱状图的配置不一样，用isAxisChart属性来区分

    isAxisChart:{
      type:Boolean,
      default:true,
    },
    chartData:{
      type:Object,
      default(){ // 初始化值用于避免组件没有传值时报错
        return {
          xData:[],
          series:[]
        }
      }
    }
  },
  data(){
    return {
      axisOption:{
        textStyle:{
          color:'#333',
        },
        grid:{
          left:'20%',            
        },
        // 提示框
        tooltip:{
          trigger:'axis',
        },
        xAxis:{
          type:"category", //类目轴
          data:[],
          axisLine:{
            lineStyle:{
              color:"#17b3a3"
            }
          },
          axisLabel:{
            interval:0,
            color:'#333'
          }
          
        },
        yAxis:[
          {
            type:"value",
            axisLine:{
              lineStyle:{
                color:"#17b3a3"
              }
            }
          }
        ],
        color:["#2ec7c9","#b6a2de","#0f78f4","#dd536b","#9462e5","#a6a6a6"],
        series:[],

      },
      // 初始化饼状图信息
      normalOption:{
        tooltip:{
          trigger:'item',
        },
        color:[
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf"
        ],
        series:[]
      },
      echart:null
    }
  },
  computed:{
    options(){
      return this.isAxisChart ? this.axisOption : this.normalOption
    }
  },
  watch:{
    // 当传入的chartData数据发生变化时，chartData做出相应变化
    chartData:{
      handler:function() {
        this.initChart()
      },
      deep:true,
    }
  },
  methods:{
    initChart(){
      this.initChartData()
      if(this.echart){ 
         //判断eachart数据是否渲染
        this.echart.setOption(this.options)
      }else {
        // 如果
        this.echart = echart.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }

    },
    // 处理eachart数据，区分柱状图。折线图还是饼状图
    initChartData(){
      if(this.isAxisChart){
        this.axisOption.xAxis.data =this.chartData.xData
        this.axisOption.series = this.chartData.series
      }else{
        // 饼状图
        this.normalOption.series = this.chartData.series
      }
    }
  }
}
</script>
