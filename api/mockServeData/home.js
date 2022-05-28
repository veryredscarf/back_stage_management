// 定义home页面的数据

import Mock from 'mockjs'

// 定义图表数据

let list =[]

export default {
  getStaticalData: () => {
    for(let i =0;i < 7;i++){
      
      list.push(
        Mock.mock({
          "苹果":Mock.Random.float(100,8000,0,0),  //mock.random.float():随机产生数100-8000之间，保留小数，最小0位，最大0位
          "vivo":Mock.Random.float(100,8000,0,0), 
          "oppo":Mock.Random.float(100,8000,0,0), 
          "小米":Mock.Random.float(100,8000,0,0), 
          "三星":Mock.Random.float(100,8000,0,0), 
          "魅族":Mock.Random.float(100,8000,0,0), 
        })
      )
    }



    return{
      code:20000,
      data:{
        // 饼状图
        videoData:[
          {
            name:"小米",
            value:"2999"
          },
          {
            name:"苹果",
            value:"5999"
          },
          {
            name:"魅族",
            value:"1500"
          },
          {
            name:"vivo",
            value:"2500"
          },
          {
            name:"三星",
            value:"3999"
          },
          {
            name:"oppo",
            value:"2700"
          },
        ],
        // 柱状图
        uerData:[
          {
            date:'周一',
            new:40,
            active:200
          },
          {
            date:'周二',
            new:90,
            active:600         
          },
          {
            date:'周三',
            new:100,
            active:800         
          },
          {
            date:'周四',
            new:90,
            active:400         
          },
          {
            date:'周五',
            new:80,
            active:600         
          },
          {
            date:'周六',
            new:60,
            active:500         
          },
          {
            date:'周天',
            new:120,
            active:800         
          }
        ],
        // 折线图
        oderData:{
          date:["202205015","202205016","202205017","202205018","202205019","202205020","202205021"],
          data:list
        },
        tabelData:[
          {
            name:"oppo",
            todayBuy:500,
            monthBuy:3500,
            totalBuy:22000,

          },
          {
            name:"vivo",
            todayBuy:300,
            monthBuy:2200,
            totalBuy:24000,

          },
          {
            name:"苹果",
            todayBuy:900,
            monthBuy:6300,
            totalBuy:70000,

          },
          {
            name:"小米",
            todayBuy:600,
            monthBuy:4500,
            totalBuy:50000,

          },
          {
            name:"魅族",
            todayBuy:500,
            monthBuy:3000,
            totalBuy:25000,

          },
          {
            name:"三星",
            todayBuy:650,
            monthBuy:5000,
            totalBuy:55000,

          },
        ]

      }
    }
  }
}