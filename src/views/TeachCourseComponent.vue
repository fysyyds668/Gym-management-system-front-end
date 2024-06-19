<script setup lang="ts">

import {onMounted, ref} from "vue";
import {Delete, Edit} from "@element-plus/icons-vue";
import {teachCourseGetPageService,teachCourseDeleteService} from "@/api/teach"
import TeachCourseChannelEdit from "@/views/TeachCourseChannelEdit.vue"

const searchText1=ref('')
const searchText2=ref('')
const total=ref(0)
const currentPage=ref(1)
const pageSize=ref(5)
const dialog=ref()
const tableData=ref([])
const addCoach=()=>{
  dialog.value.open({})
}

const handleEdit=({row}:{row:any})=>{
  console.log("编辑",row)
  dialog.value.open(row)
}
const handleDelete=({row}:{row:any})=>{
  console.log(row.id)
  const response=teachCourseDeleteService(row.id)
  fetchData(currentPage.value,pageSize.value)
}

const fetchData=async (page,size)=>{
  try {
    const courseName=searchText2.value
    const coachName=searchText1.value

    const response=await teachCourseGetPageService({coachName,courseName,page,size})
    tableData.value=response.data.data.pageList
    total.value=response.data.data.total
    console.log(total.value+'total')
    console.log(response)

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
const onSuccess=()=>{
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
            授课信息
          </span>
        </el-col>
      </el-row>

      <el-row>
        <div>
          <el-breadcrumb>
            <el-breadcrumb-item :to="{path:'/home/homePage'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item><span>授课信息</span></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-row>

      <el-row :gutter="15" style="top: 15px">
        <el-col :span="6">
          <el-input v-model="searchText1" placeholder="请输入要查找的教练"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="searchText2" placeholder="请输入要查找的课程"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="primary" @click="addCoach">添加课程</el-button>
        </el-col>
      </el-row>

      <el-table :data="tableData">
        <el-table-column type="index" label="序号" width="200px"></el-table-column>
        <el-table-column prop="id" label="授课Id" v-if="false"></el-table-column>
        <el-table-column prop="coachId" label="教练ID"></el-table-column>
        <el-table-column prop="coachName" label="教练名称"></el-table-column>
        <el-table-column prop="courseId" label="课程号" ></el-table-column>
        <el-table-column prop="courseName" label="课程名" ></el-table-column>
        <el-table-column prop="time" label="日期"></el-table-column>
        <el-table-column prop="period" label="时间"></el-table-column>
        <el-table-column prop="number" label="数量"></el-table-column>
        <el-table-column label="操作" width="200px">
          <template #default="{row}">
            <el-button
                :icon="Edit"
                plain
                circle
                type="primary"
                @click="handleEdit({row})">
            </el-button>
            <el-button
                :icon="Delete"
                plain
                circle
                type="danger"
                @click="handleDelete({row})">
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

      <TeachCourseChannelEdit ref="dialog" @success="onSuccess">

      </TeachCourseChannelEdit>

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