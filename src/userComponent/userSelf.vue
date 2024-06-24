<script setup lang="ts">
import {onMounted, ref} from "vue";
import router from "@/router";
import {userSignInService,userGetCodeService,userLoginService,userLoginCodeService,userLoginPhoneService} from '@/api/user/signIn'
import {venueReservationGetPageService,venueReservationDeleteService} from '@/api/venueReservation'

import type { TabsPaneContext } from 'element-plus'
import {userUserStore, vipUserStore} from '@/stores';
import {Delete} from "@element-plus/icons-vue";
import request from "@/utils/request";

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const formModel=ref({
  account:'',
  password:'',
  phone:'',
  code:''
})
const isSignIn=ref(true)
const isPhoneLogin=ref(false)
const onLoginSuccess=ref(false)
const userStore=userUserStore()
const vipStore=vipUserStore()
const tableData=ref([])
const tableData1=ref([])

//表格
const searchText=ref('')
const total=ref(0)
const currentPage=ref(1)
const pageSize=ref(5)
const dialog=ref()
const searchText1=ref('')


//获取验证码
const onCheck=async ()=>{
  const res=await userGetCodeService(formModel.value.phone)

}
const onSignOn=()=>{
  isSignIn.value=false
}
const onSignIn=()=>{
  isSignIn.value=true
}

const onAdmin=()=>{
  router.push('/login')
}
//注册请求
const signIn=async ()=>{

  const response=await userSignInService(formModel.value)
  console.log(response)

}
//电话号码登录
const onPhoneLogin=()=>{
  isPhoneLogin.value=false
}
//账号登录
const onLogin=async ()=>{
  let response
  if(isPhoneLogin.value){
    response= await userLoginPhoneService(formModel.value.phone,formModel.value.code)
  }else{
    response= await userLoginService(formModel.value)
  }
  onLoginSuccess.value=true

  if(response.data.data.vipId===null)
    response.data.data.vipId=''

  //存入pinia
  vipStore.setVipId(response.data.data.vipId)
  vipStore.setToken(response.data.data.token)
  vipStore.setUser(formModel.value.account,formModel.value.password)

    const vipId=response.data.data.vipId
    console.log(vipStore.token)
    const res=await request.get('/user/get/userinf',{params:{vipId}})

    vipStore.setFitness(res.data.data.height,res.data.data.weight,res.data.data.bloodPressure,
        res.data.data.heartRate,res.data.data.numberClass)
    vipStore.setUserInf(res.data.data.age,res.data.data.sex,
        res.data.data.phone, res.data.data.identityCard,res.data.data.screenName,res.data.data.name)
    vipStore.setDate(res.data.data.vipJoinDate,res.data.data.expirationDate)

  location.reload()
}
const onPwdLogin=()=>{
  isPhoneLogin.value=true
}
//登录获取验证码
const onCodeLogin=()=>{
  userLoginCodeService(formModel.value.phone)
}

const fetchData=async (page,size)=>{
  try {
    const coachName=searchText.value;
    const courseName=searchText1.value;
    const response=await venueReservationGetPageService({coachName,courseName,page,size})
    tableData.value=response.data.data.pageList
    total.value=response.data.data.total

  }catch (error){
    console.error(error)
  }
}
const handlePageChange=(page)=>{
  currentPage.value=page
  fetchData(page,pageSize.value)
}
onMounted(()=>{
  fetchData(currentPage.value,pageSize.value)

  if(vipStore.token){
    onLoginSuccess.value=true
  }

})
const onBook=(row)=>{

  console.log(row)
}
const onSearch=()=>{
  fetchData(currentPage.value,pageSize.value)
}
const handleDelete=async ({row}:{row:any})=>{

  const response=await venueReservationDeleteService(row.id)
  fetchData(currentPage.value,pageSize.value)

}

</script>

<template>
  <div class="container">
    <el-row class="container1" v-if="!onLoginSuccess">
      <el-col :span="6"></el-col>
      <el-col :span="12"  class="content1">
        <el-form
           v-model="formModel"
           v-if="isSignIn">

          <el-row>
            <el-form-item>
            <span style="color: white;font-size: 40px">现在开始，刚刚好</span><div style="width: 300px"></div>
          </el-form-item>
          </el-row>

          <el-row>
            <el-form-item>
            <span style="color: grey;font-size: 15px">让你两个月内蜕变为“熟男”</span>
          </el-form-item>
          </el-row>

          <el-row :gutter="10"  >
            <el-col :span="12">
              <el-form-item label="" prop="userAccount">
              <span style="color: white">用户名</span>
              <el-input v-model="formModel.account" placeholder="请输入用户名"></el-input>
            </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="userPwd">
              <span style="color: white">密码</span>
              <el-input v-model="formModel.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10"  >
            <el-col :span="12">
              <el-form-item label="" prop="userTel">
                <span style="color: white">电话号码</span>
                <el-input v-model="formModel.phone" placeholder="请输入验证码"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-row>
                <el-form-item prop="userCheck">
                <span style="color: white">验证码</span>
                <el-input v-model="formModel.code" placeholder="请输入验证码"></el-input>
                <span style="color: darkorange" @click="onCheck">发送验证码</span>
              </el-form-item>
          </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-button type="warning" @click="signIn">立即体验</el-button>
          </el-row>
          <el-row style="height: 100px">
            <span style="color: darkorange" @click="onSignOn">已有账户？去登录</span>
          </el-row>

        </el-form>

<!--        账号登录-->
        <el-form
            v-model="formModel"
            v-else>
          <el-row>
            <el-form-item>
              <span style="color: white;font-size: 40px">欢迎回来，请登录</span><div style="width: 300px"></div>
            </el-form-item>
          </el-row>

          <el-row>
            <el-form-item>
              <span style="color: grey;font-size: 15px">让你两个月内蜕变为“熟男”</span>
            </el-form-item>
          </el-row>

          <el-row :gutter="10"  >
            <el-col :span="12">
              <el-form-item label="" prop="userAccount">
                <span style="color: white" v-if="isPhoneLogin">电话号码</span>
                <span style="color: white" v-else>用户名</span>

                <el-input v-model="formModel.phone" placeholder="请输入电话号码" v-if="isPhoneLogin"></el-input>
                <el-input v-model="formModel.account" placeholder="请输入用户名" v-else></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="userPwd">
                <span style="color: white" v-if="isPhoneLogin">验证码</span>
                <span style="color: white" v-else>密码</span>
                <el-input v-model="formModel.code"  placeholder="请输入验证码" v-if="isPhoneLogin"></el-input>
                <span style="color: darkorange" @click="onCodeLogin" v-if="isPhoneLogin">发送验证码</span>
                <el-input v-model="formModel.password" type="password" placeholder="请输入密码" v-else></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-button type="warning" @click="onLogin">登录</el-button>
          </el-row>
          <el-row>
          <span style="color: darkorange" @click="onPhoneLogin" v-if="isPhoneLogin">账号密码登录</span>
          <span style="color: darkorange" @click="onPwdLogin" v-else>电话号码登录</span>
        </el-row>

          <el-row style="height: 100px">
            <span style="color: darkorange" @click="onSignIn">没有帐户？去注册</span>
          </el-row>
        </el-form>

      </el-col>
    </el-row>

<!--    个人中心-->

    <span style="color: darkorange;position: absolute;top: 90%;left: 90%" @click="onAdmin">管理员从这里进入</span>
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
  background: #000000;

}
.content1 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container1 {
  position: absolute;
  width: 100%;
  height: 100%;
}
.container2 {
  position: absolute;
  width: 100%;
  height: 100%;
  background: grey;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>