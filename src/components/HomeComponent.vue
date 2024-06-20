<template>
  <div class="menu-container">

    <div class="h-6" />
    <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
    >
      <span style="color:#f2f6f4;font-size: 25px; position: relative;left: 20px">健身房管理系统</span>
      <div class="spacer"></div>
      <el-sub-menu index="2">
        <template #title>Admin</template>
        <el-menu-item index="2-1">切换</el-menu-item>
        <el-menu-item index="2-2">退出</el-menu-item>

      </el-sub-menu>
      <el-menu-item index="3" disabled> </el-menu-item>
      <el-menu-item index="4"> </el-menu-item>
    </el-menu>
  </div>

  <div class="menu-container2">

        <el-menu
            active-text-color="#D05D5DFF"
            background-color="#F2F6F4FF"
            class="el-menu-vertical-demo"
            default-active="1"
            text-color="black"
            @open="handleOpen"
            @close="handleClose"
        >
          <el-menu-item index="1">
            <el-icon><HomeFilled /></el-icon>
            <router-link to="/home/homePage" class="custom-link">首页</router-link>
          </el-menu-item>

          <el-sub-menu index="2">
            <template #title>
              <el-icon><List /></el-icon>
              <span>会员管理</span>
            </template>
              <el-menu-item index="2-1">
                <router-link to="/home/information" class="custom-link">会员个人信息</router-link>
              </el-menu-item>

              <el-menu-item index="2-2">
                <router-link to="/home/membershipManagement" class="custom-link">会籍信息</router-link>
              </el-menu-item>
              <el-menu-item index="2-3">
                <router-link to="/home/membershipConsumption" class="custom-link">会员卡消费情况</router-link>
              </el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="3">
            <template #title>
              <el-icon><document /></el-icon>
              <span>课程管理</span>
            </template>

            <el-menu-item index="3-1">
              <router-link to="/home/courseManagement" class="custom-link">课程信息</router-link>
            </el-menu-item>
            <el-menu-item index="3-2">
              <router-link to="/home/teachCourse" class="custom-link">授课信息</router-link>
            </el-menu-item>

            </el-sub-menu>

          <el-sub-menu index="4">
            <template #title>
              <el-icon><Position /></el-icon>
              <span>场地预约</span>
            </template>
            <el-menu-item index="4-1">
              <router-link to="/home/venueReservations" class="custom-link">预约场地</router-link>
            </el-menu-item>
            <el-menu-item index="4-2">
              <router-link to="/home/bookCourseInformation" class="custom-link">预约信息</router-link>
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item index="5">
            <el-icon><Bicycle /></el-icon>
            <router-link to="/home/fitnessData" class="custom-link">健身数据跟踪</router-link>
          </el-menu-item>


        <el-menu-item index="6">
          <el-icon><DocumentCopy /></el-icon>
          <router-link to="/home/coachManagement" class="custom-link">教练信息管理</router-link>
        </el-menu-item>

          <el-sub-menu index="7">
            <template #title>
              <el-icon><ToiletPaper /></el-icon>
              <span>器材管理</span>
            </template>
            <el-menu-item index="7-1" >
              <router-link to="/home/wellMaterialManagement" class="custom-link">好器材</router-link>
            </el-menu-item>
            <el-menu-item index="7-2" >
              <router-link to="/home/bedMaterialManagement" class="custom-link">坏器材</router-link>
            </el-menu-item>
          </el-sub-menu>
          
<!--          <el-menu-item index="8">-->
<!--            <el-icon><Select /></el-icon>-->
<!--            <router-link to="/home/signIn" class="custom-link">签到</router-link>-->
<!--          </el-menu-item>-->

          <el-sub-menu index="8">
            <template #title>
              <el-icon><Select /></el-icon>
              <span>签到中心</span>
            </template>
            <el-menu-item index="8-1" >
              <router-link to="/home/signIn" class="custom-link">签到</router-link>
            </el-menu-item>
            <el-menu-item index="8-2" >
              <router-link to="/home/signInInformation" class="custom-link">签到信息</router-link>
            </el-menu-item>
          </el-sub-menu>


    </el-menu>

    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting, House, Position, List, Bicycle, DocumentCopy, HomeFilled, ToiletPaper,Select
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.menu-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

}

.h-6 {
  height: 20px; /* 两个菜单之间的间距 */
}

.el-menu-demo {
  width: 100%;
}

 .menu-container2 {
   position: fixed;
   top: 79px;
   left: 0;
   height: 100%;
   width: 200px;
 }
.menu-container {
  width: 100%;
}
.el-menu-vertical-demo{
  height: 100%;
}

.el-menu-demo {
  display: flex;
  align-items: center;
}

.spacer {
  flex-grow: 1; /* 使 spacer 占据剩余空间 */
}
.custom-link {
  color: inherit;
  text-decoration: none;
  background: none;
}

</style>
