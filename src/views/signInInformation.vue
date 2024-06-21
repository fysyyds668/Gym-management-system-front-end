<script setup lang="ts">

const props=defineProps({
  formModel:{
    type:Object,
    required:true
  },
})


import {onMounted, reactive, ref} from "vue";
import {signInGetPageCourseService,signInAddInformationService,signInInformationService} from "@/api/signIn"

const searchText=ref('')
const total=ref(0)
const currentPage=ref(1)
const pageSize=ref(5)
const dialog=ref()
const tableData=ref([])
const tableData1=ref([])
const dialogVisible=ref(false)
const isSignIn=ref('已签')
const formModel1=ref({
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

const fetchData=async (page,size)=>{
  try {

    //console.log(formModel1.value)
    const vipName=searchText.value
    //console.log(formModel1.value,isSignIn.value,page,size)
    const response = await signInInformationService({
      vipName:vipName.value,
      coachId: formModel1.value.coachId,
      courseId: formModel1.value.courseId,
      classTime: formModel1.value.classTime,
      period: formModel1.value.period,
      sign: isSignIn.value,
      page: page,
      size: size
    });

    console.log(response)

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
  if (typeof props.formModel === 'string') {
    formModel1.value = JSON.parse(props.formModel);
  }
  fetchData(currentPage.value,pageSize.value)
})

const onSignIn1=async ()=>{
  await signInAddInformationService(formModel1.value)

  fetchData(currentPage.value,pageSize.value)
}
const onSearch=()=>{
  fetchData(currentPage.value,pageSize.value)
}
</script>

<template>
  <div class="frame">
    <el-card class="card1">
      <el-row>
        <el-col :span="12">
          <span style="font-size: 30px">
            签到情况
          </span>
        </el-col>
      </el-row>

      <el-row>
        <div>
          <el-breadcrumb>
            <el-breadcrumb-item :to="{path:'/home/homePage'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/home/signIn'}">签到</el-breadcrumb-item>
            <el-breadcrumb-item><span>签到情况</span></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-row>

      <el-row :gutter="15" style="top: 15px">
        <el-col :span="6">
          <el-input v-model="searchText" placeholder="请输入要查找的用户"></el-input>
        </el-col>
        <el-col :span="2">
        <el-select style="border: 0" v-model="isSignIn">
          <el-option value='已签'>已签</el-option>
          <el-option value='未签'>未签</el-option>
        </el-select>
      </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-col>
      </el-row>

      <el-row :gutter="50">
        <span><br/></span>
      </el-row>

      <el-row>
        <el-col>
          <el-table :data="tableData" v-if="isSignIn=='已签'">
            <el-table-column type="index" label="序号" width="200px"></el-table-column>
            <el-table-column prop="vipId" label="用户ID"></el-table-column>
            <el-table-column prop="vipName" label="用户名"></el-table-column>
            <el-table-column prop="signTime" label="签到时间"></el-table-column>
            <template #empty>
              <el-empty description="没有数据"></el-empty>
            </template>
          </el-table>
          <el-table :data="tableData" v-if="isSignIn=='未签'">
            <el-table-column type="index" label="序号" width="200px"></el-table-column>
            <el-table-column prop="vipId" label="用户ID"></el-table-column>
            <el-table-column prop="vipName" label="用户名"></el-table-column>
            <template #empty>
              <el-empty description="没有数据"></el-empty>
            </template>
          </el-table>
        </el-col>
      </el-row>

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
            <el-input v-model="formModel1.vipId"></el-input>
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