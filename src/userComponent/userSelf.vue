<script setup lang="ts">
import {ref} from "vue";
import router from "@/router";
import {userSignInService,userGetCodeService,userLoginService,userLoginCodeService,userLoginPhoneService} from '@/api/user/signIn'

import type { TabsPaneContext } from 'element-plus'

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
const onLoginSuccess=ref(true)

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
  if(isPhoneLogin.value){
    await userLoginPhoneService(formModel.value.phone,formModel.value.code)
  }else{
    await userLoginService(formModel.value)
  }

  onLoginSuccess.value=true

}
const onPwdLogin=()=>{
  isPhoneLogin.value=true
}
//登录获取验证码
const onCodeLogin=()=>{
  userLoginCodeService(formModel.value.phone)
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
    <el-row class="container2" v-if="onLoginSuccess">
      <el-col :span="3" ></el-col>
      <el-col :span="18">
        <el-card style="height: 150%">
          <el-tabs v-model="activeName" type="border-card" style="font-size: 20px;" @tab-click="handleClick">
            <el-tab-pane label="个人信息" name="first">个人信息</el-tab-pane>
            <el-tab-pane label="健身数据" name="second">健身数据</el-tab-pane>
            <el-tab-pane label="选课中心" name="third">选课中心</el-tab-pane>
            <el-tab-pane label="我的选课" name="fourth">我的选课</el-tab-pane>
          </el-tabs>
          <el-form>


          </el-form>
        </el-card>


      </el-col>

      <el-col :span="6" ></el-col>

    </el-row>

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
  border: white solid 1px;
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