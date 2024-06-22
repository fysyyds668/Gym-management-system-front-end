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
      <router-link to="/userClass" class="custom-link">课程CLASS</router-link>
    </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/userBook" class="custom-link">预约BOOK</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/userSelf" class="custom-link">个人中心SELF</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link to="/userSelf" class="custom-link">注册</router-link>
      </el-menu-item>

      <el-sub-menu index="6">
        <template #title>你好：{{vipUserStore().userName}}</template>
        <div style="height: 400px;width:300px;color: white;font-size: 20px;">

          <el-row>
            <el-col :span="2"></el-col>
            <span>个人信息：</span>
          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row>
            <el-col :span="2"></el-col>
            <span>网名：</span>
            <span>{{ vipStore.screenName }}</span>
          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row>
            <el-col :span="2"></el-col>
            <span>vipID：</span>
            <span>{{ vipStore.vipId }}</span>
          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row>
            <el-col :span="2"></el-col>
            <span>姓名:</span>
            <span>{{ vipStore.userName }}</span>
          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row>
            <el-col :span="2"></el-col>
            <span>性别：</span>
            <span>{{vipStore.userSex}}</span>
          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row>
            <el-col :span="2"></el-col>
            <span>年龄：</span>
            <span>{{vipStore.userAge}}</span>
          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row>
            <el-col :span="2"></el-col>
            <span>手机号：</span>
            <span>{{ vipStore.userPhone }}</span>
          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row>
            <el-col :span="2"></el-col>
            <span>身份证：</span>
            <span>{{vipStore.userID}}</span>
          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row>
            <el-col :span="2"></el-col>
            <el-button @click="onUpdate">修改数据</el-button>
          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row>
            <el-col :span="2"></el-col>
            <el-button @click="onQuit">退出登录</el-button>
          </el-row>
        </div>
      </el-sub-menu>
      <el-menu-item index="7">Orders</el-menu-item>
    </el-menu>
  </div>

  <el-dialog v-model="dialogVisible" :title="'修改数据'" width="40%">
    <el-form
        :rules="rules"
        ref="form"
        :model="fromModel" >
      <el-form-item  label="姓名" prop="name">
        <el-input v-model="fromModel.name" style="padding-left: 47px"></el-input>
      </el-form-item>
      <el-form-item  label="网名" prop="name">
      <el-input v-model="fromModel.screenName" style="padding-left: 47px"></el-input>
    </el-form-item>
      <el-form-item  label="年龄" prop="age">
        <el-input v-model="fromModel.age" style="padding-left: 47px"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="fromModel.sex" style="padding-left: 47px" size="small">
          <el-radio-button value="男" size="large" >男</el-radio-button>
          <el-radio-button value="女" size="large">女</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item  label="电话号码" prop="phone">
        <el-input v-model="fromModel.phone" style="padding-left: 20px"></el-input>
      </el-form-item>
      <el-form-item  label="身份证号" prop="identityCard">
        <el-input v-model="fromModel.identityCard" style="padding-left: 20px"></el-input>
      </el-form-item>

    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible=false">取消</el-button>
      <el-button type="primary" @click="onSubmit">确认</el-button>
    </span>
    </template>
  </el-dialog>


    <router-view></router-view>
<!--  </div>-->
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {userUpdateService,userFindService} from "@/api/user";
const activeIndex2 = ref('1')
let vipStore=vipUserStore()
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

import {userUserStore, vipUserStore} from "@/stores";
import router from "@/router";

onMounted(async ()=>{

  await router.push('/userHomePage')

  const response=await userFindService(vipStore.vipId)
  console.log(response)

   vipStore.setUserInf(response.data.data.age,response.data.data.sex,
       response.data.data.phone, response.data.data.identityCard,response.data.data.screenName)

})

const onUpdate=()=>{
  dialogVisible.value=true
}

const dialogVisible=ref(false)
const fromModel=ref({
  screenName:'',
  vipId:'',
  name:'',
  age:'',
  sex:'',
  phone:'',
  type:'',
  identityCard:''
})

const form=ref()
const open=(row)=>{
  dialogVisible.value=true
  fromModel.value={...row}
}

const emit=defineEmits(['success'])

const onSubmit=async ()=>{

  console.log(fromModel.value)

    await form.value.validate();
    const response= await userUpdateService(fromModel.value)

  dialogVisible.value=false;

  emit('success')
}
defineExpose({
  open
})

const rules={
  name:[{required:true,message:'请输入姓名',trigger:'blur'}],
  age:[{required:true,message:'请输入年龄',trigger:'blur'}],
  sex:[{required:true,message:'请输入性别',trigger:'blur'}],
  type:[{required:true,message:'请输入类型',trigger:'blur'}],
  phone:[{required:true,message:'请输入手机号',trigger:'blur'}],
  identityCard:[{required:true,message:'请输入身份证',trigger:'blur'}]
}

const onQuit=()=>{
  vipStore.removeUser()
  vipStore.removeToken()
  vipStore.removeVipId()

  router.push('/userHomePage')
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
