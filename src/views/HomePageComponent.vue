<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

const myEcharts = ref(null);
let chartInstance = null;

onMounted(() => {
  // 使用正确的 ref 名称
  chartInstance = echarts.init(myEcharts.value);
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },

    series: [
      {
        name: '会员类型数量',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '70%'],
        startAngle: 180,
        endAngle: 360,
        data: [
          { value: 20, name: '青铜会员' },
          { value: 10, name: '白银会员' },
          { value: 40, name: '黄金会员' },
          { value: 30, name: '至尊会员' },
          //{ value: 300, name: 'Video Ads' }
        ]
      }
    ]
  };
  chartInstance.setOption(option);
})


</script>


<template>
  <div class="frame">
    <div ref="myEcharts" style="width: 50%; height: 50%;border: #181818 solid 1px"></div>
    <div class="div2"></div>
    <div class="div3"></div>
    <div class="div4"></div>
  </div>
</template>

<style scoped>
.div2{
  border: #181818 solid 1px;
  position: absolute;
  top: 0%;
  left: 50%;
  right: 0%;
  bottom: 50%;
}
.div3{
  border: #181818 solid 1px;
  position: absolute;
  top: 50%;
  left: 0%;
  right: 50%;
  bottom: 0%;
}
.div4{
   border: #181818 solid 1px;
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