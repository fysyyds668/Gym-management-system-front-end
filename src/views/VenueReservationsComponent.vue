<script setup lang="ts">

import {onMounted, ref} from "vue";
import {Delete, Edit} from "@element-plus/icons-vue";
import {venueReservationGetPageService,venueReservationDeleteService} from "@/api/venueReservation"
import VenueReservationsChannelEdit from "@/views/VenueReservationsChannelEdit.vue"

const searchText=ref('')
const total=ref(0)
const currentPage=ref(1)
const pageSize=ref(5)
const dialog=ref()
const tableData=ref([])

const fetchData=async (page,size)=>{
  try {
    const response=await venueReservationGetPageService({page,size})
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
const onSuccess=()=>{
  fetchData(currentPage.value,pageSize.value)
}
const onBook=(row)=>{
  dialog.value.open(row)
  console.log(row)
}
</script>

<template>
  <div class="frame">
    <el-card class="card1">
      <el-row>
        <el-col :span="12">
          <span style="font-size: 30px">
            场地预约
          </span>
        </el-col>
      </el-row>

      <el-row>
        <div>
          <el-breadcrumb>
            <el-breadcrumb-item :to="{path:'/home/homePage'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item><span>场地预约</span></el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-row>

      <el-row :gutter="15" style="top: 15px">
        <el-col :span="6">
          <el-input v-model="searchText" placeholder="请输入要查找的场地"></el-input>
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
      ></el-pagination>

      <VenueReservationsChannelEdit ref="dialog" @success="onSuccess">

      </VenueReservationsChannelEdit>

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