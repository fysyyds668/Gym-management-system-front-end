<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import {options} from "axios";
import request from "@/utils/request";

const myEcharts = ref(null);
const myEcharts1 = ref(null);
const myEcharts2 = ref(null);
const myEcharts3 = ref(null);
let chartInstance = null;
let chartInstance1 = null;
let chartInstance2 = null;
let chartInstance3 = null;

const total=ref('')


const dates = ref([])
const getDatesForLastWeek=()=> {
  const today = new Date()
  const result = []

  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)

    const formattedDate = `${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
    result.push(formattedDate)
  }

  result.reverse()
  dates.value= result
}



onMounted(async () => {

  const response=await request.get('/backstage/homepage/data')
  total.value=response.data.data
  console.log(total.value)

  const data=ref([
    { value: total.value.bronzeMember, name: '青铜会员\nbronze' },
    { value: total.value.silverMemberNum, name: '白银会员\nsilver' },
    { value: total.value.goldMemberNum, name: '黄金会员\ngold' },
    { value: total.value.supremeMemberNum, name: '至尊会员\nsupreme' },
    { value: total.value.nonmember, name: '非会员数\nnon' },
  ])

  chartInstance = echarts.init(myEcharts.value);

  const option = {
    title: {
      text: '会员统计'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data.value
      }
    ]
  };

  chartInstance.setOption(option);


  getDatesForLastWeek()
  console.log(dates.value)

//图表二
  chartInstance1 = echarts.init(myEcharts1.value);
  const option1 = {
    title: {
      text: '网站访问数据'
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dates.value
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '接口点击量',
        type: 'line',
        data: total.value.interfaceClicks.reverse()
      },
      {
        name: '用户访问量',
        type: 'line',
        data: total.value.userVisits.reverse()
      }
    ]
  };

  chartInstance1.setOption(option1);

  //图三
  chartInstance2 = echarts.init(myEcharts2.value);
  const option2 = {
    title: {
      text: '会员年龄段'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['13-18岁', '19-35岁', '36-55岁', '56-80岁'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '人数',
        type: 'bar',
        barWidth: '60%',
        data: total.value.ageGroupNum
      }
    ]
  };
  chartInstance2.setOption(option2);

  //图表四
  chartInstance3 = echarts.init(myEcharts3.value);
  const option3 = {
    title: {
      text: '器材统计'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [
      {
        name: '器材统计',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '30%'],
        label: {
          position: 'inner',
          fontSize: 14
        },
        labelLine: {
          show: false
        },
        data: [
          { value: total.value.damageMaterialNum, name: '坏器材' },
          { value: total.value.fullMaterialNum, name: '好器材' },
        ]
      },
      {
        name: '器材统计',
        type: 'pie',
        radius: ['45%', '60%'],
        labelLine: {
          length: 30
        },
        label: {
          formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
          backgroundColor: '#F6F8FC',
          borderColor: '#8C8D8E',
          borderWidth: 1,
          borderRadius: 4,
          rich: {
            a: {
              color: '#6E7079',
              lineHeight: 22,
              align: 'center'
            },
            hr: {
              borderColor: '#8C8D8E',
              width: '100%',
              borderWidth: 1,
              height: 0
            },
            b: {
              color: '#4C5058',
              fontSize: 14,
              fontWeight: 'bold',
              lineHeight: 33
            },
            per: {
              color: '#fff',
              backgroundColor: '#4C5058',
              padding: [3, 4],
              borderRadius: 4
            }
          }
        },
        data: [
          { value: total.value.fullMaterialPriceTotal, name: '好器材总价(元)' },
          { value: total.value.damageMaterialPriceTotal, name: '坏器材总价(元)' }
        ]
      }
    ]
  };
  chartInstance3.setOption(option3);
})


</script>


<template>
  <div class="frame">
    <div ref="myEcharts" style="width: 50%; height: 50%;"></div>
    <div ref="myEcharts1" class="div2"></div>
    <div ref="myEcharts2" class="div3"></div>
    <div ref="myEcharts3" class="div4"></div>
    <div ref="myEcharts3" class="div5"></div>
  </div>
</template>

<style scoped>
.div2{
  position: absolute;
  top: 0%;
  left: 50%;
  right: 0%;
  bottom: 50%;
}
.div3{
  position: absolute;
  top: 50%;
  left: 0%;
  right: 50%;
  bottom: 0%;
}
.div4{
   position: absolute;
   top: 50%;
   left: 50%;
   right: 0%;
   bottom: 0%;
 }
.div5{
  position: absolute;
  top: 50%;
  left: 50%;
  right: 0%;
  bottom: 0%;
}

.frame {
  position: fixed;
  top: 100px;
  left: 220px;
  right: 20px;
  bottom: 20px;
}
.text-type{
  font-size: 30px

}
</style>