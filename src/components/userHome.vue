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

      <el-menu-item index="5" v-if="!vipStore.token">
        <router-link to="/userSelf" class="custom-link">注册/登录</router-link>
      </el-menu-item>

      <el-sub-menu index="6" v-else>
        <template #title v-if="vipStore.token">你好：{{vipUserStore().screenName}}</template>
        <template #title v-else>未登录</template>
        <div style="height: 500px;width:300px;color: white;font-size: 20px;border: black" v-if="!vipStore.vipId">

          <el-row><el-col :span="2"></el-col><span>个人信息:</span></el-row><el-row style="height: 20px"></el-row>
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
            <el-button type="primary" @click="onUpdate">修改数据</el-button>
          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row>
            <el-col :span="2"></el-col>
            <el-button type="primary" @click="onSignInVip">注册会员</el-button>
          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row>
            <el-col :span="2"></el-col>
            <el-button type="primary" @click="onQuit">退出登录</el-button>
          </el-row>
        </div>

        <div style="height: 500px;width:450px;color: white;font-size: 20px;" v-else>
          <el-row>
            <el-col :span="2"></el-col>
            <el-col :span="12"><span>个人信息:</span></el-col>
            <el-col :span="10"><span>健身数据跟踪:</span></el-col>
          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row>
            <el-col :span="2"></el-col>
            <el-col :span="12">
              <span>网名：</span>
              <span>{{ vipStore.screenName }}</span>
            </el-col>
            <el-col :span="10">
              <span>身高：</span>
              <span>{{vipStore.height}}cm</span>
            </el-col>
          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row>
            <el-col :span="2"></el-col>
            <el-col :span="12">
            <span>会员号：</span>
            <span>{{ vipStore.vipId }}</span>
            </el-col>
            <el-col :span="10">
              <span>体重：</span>
              <span>{{vipStore.weight}}kg：</span>
            </el-col>
          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row>
            <el-col :span="2"></el-col>
            <el-col :span="12">
            <span>姓名:</span>
            <span>{{ vipStore.userName }}</span>
            </el-col>
            <el-col :span="10">
              <span>心率：</span>
              <span>{{vipStore.heart}}次/分</span>
            </el-col>
          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row>
            <el-col :span="2"></el-col>
            <el-col :span="12">
            <span>性别：</span>
            <span>{{vipStore.userSex}}</span>
            </el-col>
            <el-col :span="10">
              <span>血压：</span>
              <span>{{vipStore.blood}}</span>
            </el-col>
          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row>
            <el-col :span="2"></el-col>
            <el-col :span="12">
            <span>年龄：</span>
            <span>{{vipStore.userAge}}</span>
            </el-col>
            <el-col :span="10">
              <span>上课次数：</span>
              <span>{{vipStore.classNum}}</span>
            </el-col>
          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row>
            <el-col :span="2"></el-col>
            <el-col :span="12">
            <span>手机号：</span>
            <span>{{ vipStore.userPhone }}</span>
            </el-col>
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
            <el-col :span="12">
              <el-button type="primary" @click="onUpdate">修改信息</el-button>
            </el-col>

            <el-col :span="10">
              <el-button type="primary" @click="onUpdate1">修改数据</el-button>
            </el-col>

          </el-row>
          <el-row style="height: 20px"></el-row>
          <el-row>
            <el-col :span="2"></el-col>
            <el-col :span="10"><el-button type="primary" @click="onQuit">退出登录</el-button></el-col>
          </el-row>
          <el-row style="height: 20px"></el-row>

        </div>
      </el-sub-menu>

<!--      <el-menu-item index="8" v-if="vipStore.token"> <div ></div></el-menu-item>-->
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
<!--注册会员-->
  <el-dialog v-model="isSignInVip" :title="'注册会员'" width="30%" >
    <el-form
        :rules="rules"
        ref="form"
        v-model="fromModel1">
      <el-form-item  label="姓名" prop="name">
        <el-input v-model="fromModel1.name" style="padding-left: 47px"></el-input>
      </el-form-item>
      <el-form-item  label="年龄" prop="age">
        <el-input v-model="fromModel1.age" style="padding-left: 47px"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="fromModel1.sex" style="padding-left: 47px" size="small">
          <el-radio-button value="男" size="large" >男</el-radio-button>
          <el-radio-button value="女" size="large">女</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="会员类型" prop="type" >
        <el-select
            v-model="fromModel1.type"
            placeholder="Select"
            style="width: 100%;padding-left: 20px;">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="身份证号" prop="identityCard">
        <el-input v-model="fromModel1.identityCard" style="padding-left: 20px"></el-input>
      </el-form-item>

    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="isSignInVip=false">取消</el-button>
      <el-button type="primary" @click="onSignInVip1" v-loading.fullscreen.lock="loading" element-loading-text="收银姐姐马上赶来！">确认</el-button>
    </span>
    </template>

  </el-dialog>

  <el-dialog v-model="isEWM" :title="'微信支付'" width="30%" >
    <div class="container4"></div>
<!--    <img src="@/recourse/image/img20.jpg"  alt="#">-->
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="isEWM=false">取消</el-button>
      <el-button type="primary" @click="onSignInVip2" >确认</el-button>
    </span>
    </template>
  </el-dialog>

<!--  修改健身数据-->
<el-dialog v-model="isUpdateFitness" :title="'修改健身数据'" width="30%">
  <el-form
      :model="fromModel3" >

    <el-form-item  label="身高" prop="height">
      <el-input v-model="fromModel3.height" style="padding-left: 47px"></el-input>
    </el-form-item>

    <el-form-item  label="体重" prop="weight">
      <el-input v-model="fromModel3.weight" style="padding-left: 47px"></el-input>
    </el-form-item>

    <el-form-item  label="血压" prop="bloodPressure">
      <el-input v-model="fromModel3.bloodPressure" style="padding-left: 47px"></el-input>
    </el-form-item>

    <el-form-item  label="心率" prop="heartRate">
      <el-input v-model="fromModel3.heartRate" style="padding-left: 47px"></el-input>
    </el-form-item>

  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="isUpdateFitness=false">取消</el-button>
      <el-button type="primary" @click="onUpdateFitness">确认</el-button>
    </span>
  </template>
</el-dialog>

    <router-view></router-view>
<!--  </div>-->
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {userUpdateService, userFindService, userSignInVip} from "@/api/user";
const activeIndex2 = ref('1')
let vipStore=vipUserStore()
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

import {userUserStore, vipUserStore} from "@/stores";
import router from "@/router";
import request from "@/utils/request";

onMounted(async ()=>{

  await router.push('/userHomePage')

  fromModel.value.name=vipStore.userName
  fromModel.value.screenName=vipStore.screenName
  fromModel.value.sex=vipStore.userSex
  fromModel.value.age=vipStore.userAge
  fromModel.value.phone=vipStore.userPhone
  fromModel.value.identityCard=vipStore.screenName

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


const onSubmit=async ()=>{

  console.log(fromModel.value)

    await form.value.validate();
    await userUpdateService(fromModel.value)

  dialogVisible.value=false;
  const response=await userFindService(vipStore.vipId)
  vipStore.setUserInf(response.data.data.age,response.data.data.sex,
      response.data.data.phone, response.data.data.identityCard,response.data.data.screenName)
}

const onQuit=()=>{
  vipStore.removeUser()
  vipStore.removeToken()
  vipStore.removeVipId()
  vipStore.removeFitness()

  router.push('/userHomePage')
  location.reload()
}

const isSignInVip=ref(false)
const selectVip=ref('')
const loading=ref(false)
const isEWM=ref(false)
const onSignInVip=()=>{
  isSignInVip.value=true

}
const onSignInVip1=async ()=>{
  isSignInVip.value=true

  loading.value=true
  setTimeout(() => {
    loading.value = false
    isEWM.value=true
  }, 3000)

  fromModel1.value.phone=vipStore.userPhone

  //注册会员
  const res=await request.post('/user/open/vip',fromModel1.value)
  vipStore.setToken(res.data.data.vipId)

}
const onSignInVip2=async ()=>{
  isEWM.value=false
  await userSignInVip(fromModel1.value)
  isSignInVip.value=false
}


const rules={
  name:[{required:true,message:'请输入姓名',trigger:'blur'}],
  age:[{required:true,message:'请输入年龄',trigger:'blur'}],
  sex:[{required:true,message:'请输入性别',trigger:'blur'}],
  type:[{required:true,message:'请输入类型',trigger:'blur'}],
  phone:[{required:true,message:'请输入手机号',trigger:'blur'}],
  identityCard:[{required:true,message:'请输入身份证',trigger:'blur'}]
}
const options=[
  {
    value:'青铜会员',
    label:'青铜会员'
  },{
    value:'白银会员',
    label:'白银会员'
  },{
    value:'黄金会员',
    label:'黄金会员'
  },{
    value:'至尊会员',
    label:'至尊会员'
  }]

const fromModel1=ref({
  vipId:'',
  name:'',
  age:'',
  sex:'',
  phone:'',
  type:'',
  identityCard:'',
})


//健身数据修改
const fromModel3=ref({
  vipId:'',
  name:'',
  height:'',
  weight:'',
  bloodPressure:'',
  heartRate:'',
  numberClass:'',
})

//修改健身数据
const isUpdateFitness=ref(false)
const onUpdate1=()=>{
  fromModel3.value.vipId=vipStore.vipId
  fromModel3.value.name=vipStore.userName
  fromModel3.value.height=vipStore.height
  fromModel3.value.weight=vipStore.weight
  fromModel3.value.bloodPressure=vipStore.blood
  fromModel3.value.heartRate=vipStore.heart

  isUpdateFitness.value=true

}
//提交修改健身数据
const onUpdateFitness=async ()=>{

  await request.put('/vip/updete/fitness',fromModel3.value)

  vipStore.setFitness(fromModel3.value.height,fromModel3.value.weight,
      fromModel3.value.heartRate,fromModel3.value.bloodPressure,vipStore.classNum)

  isUpdateFitness.value=false
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

.container4{
  position: relative;
  width: 450px;
  height: 450px;
  background: url('@/recourse/image/img20.jpg') ;
  background-size: cover;

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
