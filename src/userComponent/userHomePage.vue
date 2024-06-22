<script setup lang="ts">
import img5 from '@/recourse/image/img5.jpg'
import img6 from '@/recourse/image/img6.jpg'
import img7 from '@/recourse/image/img7.jpg'
import img8 from '@/recourse/image/img8.jpg'
import img9 from '@/recourse/image/img9.jpg'
import router from "@/router";
const img=([{
  id:0,
  url:img5
},{
  id:1,
  url:img6
},{
  id:2,
  url:img7
},{
  id:3,
  url:img8
},{
  id:4,
  url:img9
}])

const onJoin=()=>{
  router.push('/userSelf')
}

</script>

<template>
<div class="container">

  <el-row >
    <el-col :span="10"></el-col>
    <el-col :span="4"><span style="font-size: 30px;color: white">环境SURROUNDING</span></el-col>
    <el-col :span="10"></el-col>
  </el-row>

  <el-row >
    <el-col>
      <el-carousel :interval="4000" type="card" height="500px" motion-blur>
        <el-carousel-item v-for="item in img" :key="item.id">
          <el-image :src="item.url" />
        </el-carousel-item>
      </el-carousel>
    </el-col>
  </el-row>

  <el-row style="height: 50px"></el-row>
  <el-row style="height: 120px">

    <el-col :span="7"></el-col>
    <el-col :span="10">
      <span style="color: white;font-size: 30px">熟男健身房：你也想两个月逆袭成熟男?那就来吧！</span>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="24">
      <div style="background: #181818;width: 100%;height: 300px">
        <el-row style="height: 30px"/><el-row >
        <el-col :span="2"> </el-col>
        <el-col :span="5">
          <span style="color: white;font-size: 20px" @click="onJoin">加入我们JOIN US</span>

        </el-col>

          <el-col :span="7">
            <span style="color: white;font-size: 20px">技术支持：Vue3+elementplus</span>
          </el-col>

      </el-row>
        <el-row style="height: 30px"/>
        <el-row >
          <el-col :span="2">
          </el-col>
          <el-col :span="5">
            <span style="color: white;font-size: 20px">联系电话:18874415646</span>
          </el-col>
          <el-col :span="6">
            <span style="color: white;font-size: 20px">商务合作 BUSINESS COOPERATION</span>
          </el-col>
        </el-row>

      </div>
    </el-col>
  </el-row>

</div>
</template>

<style scoped>
.container{
  border: #181818 solid 2px;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 60px;
  bottom: 0px;
  background: grey;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>