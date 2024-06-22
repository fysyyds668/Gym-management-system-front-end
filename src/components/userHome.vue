<template>
  <div class="menu-container">

    <div class="h-6" />
    <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#000000"
        text-color="#ffffff"
        active-text-color="#ffd04b"
        @select="handleSelect"

    >

      <el-menu-item style="font-size: 30px;color:white">熟&nbsp;男&nbsp;健&nbsp;身&nbsp;房</el-menu-item>
      <div class="flex-grow"></div>
      <el-menu-item index="1">
        <router-link to="/userHomePage" class="custom-link">首页HOMEPAGE</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/userBook" class="custom-link">预约BOOK</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/userClass" class="custom-link">课程CLASS</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/userSelf" class="custom-link">个人中心SELF</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link to="/userSelf" class="custom-link">注册</router-link>
      </el-menu-item>
      <el-menu-item index="6">Orders</el-menu-item>

    </el-menu>

  </div>



    <router-view></router-view>
<!--  </div>-->
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const user=userUserStore()
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting, House, Position, List, Bicycle, DocumentCopy, HomeFilled, ToiletPaper,Select
} from '@element-plus/icons-vue'
import {userUserStore} from "@/stores";
import router from "@/router";
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const onQuit=()=>{
  router.push('/')
}

onMounted(()=>{
  router.push('/userHomePage')
})
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
  height: 1px; /* 两个菜单之间的间距 */
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
.flex-grow {
  flex-grow: 1;
}
</style>
