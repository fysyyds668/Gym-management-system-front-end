<script setup lang="ts">

import {onMounted, ref} from "vue";
import {signInGetPageCourseService,signInAddInformationService} from "@/api/signIn"
import signInInformation from './signInInformation.vue'
import router from "@/router";

const searchText=ref('')
const total=ref(0)
const currentPage=ref(1)
const pageSize=ref(5)
const dialog=ref()
const tableData=ref([])
const dialogVisible=ref(false)
const sendInformation=ref(false)

const fetchData=async (page,size)=>{
  try {
    const response=await signInGetPageCourseService({page,size})
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
})

const formModel=ref({
  id: '',
  vipId: '',
  courseId: '',
  coachId: '',
  time: '',
  classTime: '',
  signTime: '',
  period: '',
  sign: ''
})
const onSignIn=async (row)=>{
  dialogVisible.value=true
  formModel.value={...row}
  formModel.value.classTime=formModel.value.time

}
const onSignIn1=async ()=>{

  await signInAddInformationService(formModel.value)
  dialogVisible.value=false
  fetchData(currentPage.value,pageSize.value)
}
const onLook=(row)=>{

  formModel.value={...row}
  formModel.value.classTime=formModel.value.time

  console.log(formModel.value)

  const formModelSerialized = JSON.stringify(formModel.value);

  router.push({ name: 'signInInformation', query: { formModel: formModelSerialized } });

  //sendInformation.value=true
}
</script>

<template>
  <div class="frame">
    <el-card class="card1" >
      <el-row>
        <el-col :span="12">
          <span style="font-size: 30px">
            签到
          </span>
        </el-col>
      </el-row>

      <el-row>
        <div>
          <el-breadcrumb>
            <el-breadcrumb-item :to="{path:'/home/homePage'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item><span>签到</span></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-row>

      <el-row :gutter="15" style="top: 15px">
        <el-col :span="6">
          <el-input v-model="searchText" placeholder="请输入要查找的用户"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary">查询</el-button>
        </el-col>
      </el-row>

      <el-table :data="tableData">
        <el-table-column type="index" label="序号" width="200px"></el-table-column>
        <el-table-column prop="coachId" label="教练ID"></el-table-column>
        <el-table-column prop="coachName" label="教练名称"></el-table-column>
        <el-table-column prop="courseId" label="课程号" ></el-table-column>
        <el-table-column prop="courseName" label="课程名" ></el-table-column>
        <el-table-column prop="time" label="日期"></el-table-column>
        <el-table-column prop="period" label="时间"></el-table-column>
        <el-table-column prop="number" label="未签人数"></el-table-column>
        <el-table-column label="操作" width="200px">
          <template #default="{row}">
            <el-button type="primary" @click="onSignIn(row)">签到</el-button>
            <el-button type="primary" @click="onLook(row)">查看</el-button>
<!--            <signInInformation v-if="sendInformation" :formModel="formModel"></signInInformation>-->
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

      <el-dialog
          v-model="dialogVisible"
          :title="'签到'"
          width="40%">
        <el-form>
          <el-form-item label="会员ID">
            <el-input v-model="formModel.vipId" ></el-input>
          </el-form-item>
        </el-form>

        <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="onSignIn1">确认</el-button>

        </span>
        </template>
      </el-dialog>
    </el-card>

  </div>

</template>

<style scoped>
.frame {
  position: fixed;
  top: 100px;
  left: 220px;
  right: 20px;
  bottom: 20px;
}

.el-table {
  position: relative;
  top: 20px;
  width: 100%;
  height: 500px;
}

.card1{
  min-height: 100%;
}
.pagination1{
  position: absolute;
  bottom: 20px;
}
</style>