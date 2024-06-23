<script setup lang="ts">
import {onMounted, ref} from "vue";
import router from "@/router";
import {userSignInService,userGetCodeService,userLoginService,userLoginCodeService,userLoginPhoneService} from '@/api/user/signIn'
import {venueReservationGetPageService,venueReservationDeleteService} from '@/api/venueReservation'

import type { TabsPaneContext } from 'element-plus'
import {userUserStore, vipUserStore} from '@/stores';
import {Delete} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {userBookService, userLookBook} from "@/api/user";
import request from "@/utils/request";

const activeName = ref('first')
const tableData1=ref([])
const handleClick = async (tab: TabsPaneContext, event: Event) => {
  //console.log(tab, event)

  const vipId1=ref({
    vipId:'',
    courseName:'',
    coachName:'',
    page:'1',
    size:'10'
  })

  vipId1.value.vipId=vipStore.vipId
  const response=await request.post('/user/get/yibooked',vipId1.value)
  tableData1.value=response.data.data.pageList
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


//表格
const searchText=ref('')
const total=ref(0)
const currentPage=ref(1)
const pageSize=ref(5)
const dialog=ref()
const searchText1=ref('')
const isBook=ref(false)

const bookInf=ref({
  vipId: '',
  courseId: '',
  coachId: '',
  time: '',
  period: ''
})
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
  vipStore.setVipId(response.data.data.vipId)
  vipStore.setToken(response.data.data.token)
  vipStore.setUser(formModel.value.account,formModel.value.password)

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
const onBook=async (row)=>{

  if(vipStore.vipId){
    isBook.value=true
    bookInf.value={...row}
    bookInf.value.vipId=vipStore.vipId
    console.log(bookInf.value)

  }else {
    ElMessage.error('您还不是会员，请办理会员卡')
  }

}
const onSearch=()=>{
  fetchData(currentPage.value,pageSize.value)
}
const handleDelete=async ({row}:{row:any})=>{

  const response=await venueReservationDeleteService(row.id)
  fetchData(currentPage.value,pageSize.value)

  const vipId1=ref({
    vipId:'',
    courseName:'',
    coachName:'',
    page:'1',
    size:'10'
  })

  vipId1.value.vipId=vipStore.vipId
  const response1=await request.post('/user/get/yibooked',vipId1.value)
  tableData1.value=response1.data.data.pageList

}
//提交预约
const onSubmit=async ()=>{
   await userBookService(bookInf.value)

  await fetchData(currentPage.value,pageSize.value)
  isBook.value=false
}


const onMyBook=async ()=>{

   // vipId1.value.vipId=vipStore.vipId
   // console.log(vipId1.value)
   // const response=await userLookBook(vipId1.value)
   // tableData1.value=response.data.data
}

const sign=ref({
  vipId:'',
  courseId:'',
  coachId:'',
  classTime:'',
  period:''
})
const isSign=ref(false)
const onSign=(row)=>{

  sign.value={...row}
  console.log(sign.value)

}
</script>

<template>
  <div class="container">

    <el-row class="container2" >
      <el-col :span="3" ></el-col>
      <el-col :span="18">
        <el-card style="height: 800px;background-color:transparent;border: none">
          <el-tabs v-model="activeName" type="border-card" style="font-size: 20px;" @tab-click="handleClick">

            <el-tab-pane label="选课中心" name="first">
              <el-row :gutter="15" style="top: 15px">
                <el-col :span="6">
                  <el-input v-model="searchText" placeholder="请输入要查找的教练"></el-input>
                </el-col>
                <el-col :span="6">
                  <el-input v-model="searchText1" placeholder="请输入要查找的课程"></el-input>
                </el-col>
                <el-col :span="8">
                  <el-button type="primary" @click="onSearch">查询</el-button>
                </el-col>
              </el-row>

              <el-row style="height: 50px">
              </el-row>
              <el-table :data="tableData" style="height: 500px;">
                <el-table-column type="index" label="序号" width="200px"></el-table-column>
                <el-table-column prop="coachId" label="教练ID"></el-table-column>
                <el-table-column prop="coachName" label="教练名称"></el-table-column>
                <el-table-column prop="courseId" label="课程号" ></el-table-column>
                <el-table-column prop="courseName" label="课程名" ></el-table-column>
                <el-table-column prop="time" label="日期"></el-table-column>
                <el-table-column prop="period" label="时间"></el-table-column>
                <el-table-column prop="number" label="剩余"></el-table-column>
                <el-table-column label="操作" width="200px">
                  <template #default="{row}">
                    <el-button type="primary" @click="onBook(row)">预约</el-button>
                  </template>
                </el-table-column>

                <template #empty>
                  <el-empty description="没有数据"></el-empty>
                </template>
              </el-table>

              <el-pagination
                  class="pagination1"
                  v-model:current-page="currentPage"
                  v-model:page-size="pageSize"
                  :page-sizes="[5, 6, 7, 8,9,10]"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                  @current-change="handlePageChange"
                  style="bottom: 20px"
              >
              </el-pagination>
            </el-tab-pane>


            <el-tab-pane label="我的选课" name="fourth" @click="onMyBook">

<!--              <el-row :gutter="15" style="top: 15px">-->
<!--                <el-col :span="6">-->
<!--                  <el-input v-model="searchText" placeholder="请输入要查找的课程"></el-input>-->
<!--                </el-col>-->
<!--                <el-col :span="8">-->
<!--                  <el-button type="primary">查询</el-button>-->
<!--                </el-col>-->
<!--              </el-row>-->

              <el-row style="height: 50px"/>

              <el-table :data="tableData1" style="height: 500px">
                <el-table-column type="index" label="序号" width="100px"></el-table-column>
                <el-table-column prop="id" label="id" v-if="false"></el-table-column>
                <el-table-column prop="coachId" label="教练ID"></el-table-column>
                <el-table-column prop="coachName" label="教练名称"></el-table-column>
                <el-table-column prop="courseId" label="课程号" ></el-table-column>
                <el-table-column prop="courseName" label="课程名" ></el-table-column>
                <el-table-column prop="time" label="日期"></el-table-column>
                <el-table-column prop="period" label="时间"></el-table-column>
                <el-table-column label="操作" width="200px">
                  <template #default="{row}">
                    <el-button
                        :icon="Delete"
                        plain
                        circle
                        type="danger"
                        @click="handleDelete({row})">
                    </el-button>
                    <el-button type="primary" @click="onSign({row})">
                      签到
                    </el-button>
                  </template>
                </el-table-column>

                <template #empty>
                  <el-empty description="没有数据"></el-empty>
                </template>
              </el-table>

              <el-pagination
                  class="pagination1"
                  v-model:current-page="currentPage"
                  v-model:page-size="pageSize"
                  :page-sizes="[5, 6, 7, 8,9,10]"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                  @current-change="handlePageChange"
              ></el-pagination>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
      <el-col :span="6" ></el-col>
    </el-row>

    <el-dialog v-model="isBook" :title="'是否预约该课程？'" width="30%">

      <template #footer >
        <span class="dialog-footer">
          <el-button @click="isBook=false">取消</el-button>
          <el-button type="primary" @click="onSubmit">确认</el-button>
        </span>
      </template>
    </el-dialog>

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

  background: url('@/recourse/image/jpg1.jpg') no-repeat center center;
  background-size: cover;
}
.container2 {
  position: absolute;
  width: 100%;
  height: 100%;
  background: grey;

  background: url('@/recourse/image/jpg1.jpg') no-repeat center center;
  background-size: cover;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>