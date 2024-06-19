<template>
  <div class="frame">
    <el-card class="card1">

      <el-row >
        <el-col :span="12"><span style="font-size: 30px">健身数据跟踪</span></el-col>
      </el-row>
      <el-row>
        <div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home/homePage' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>
              <span>健身数据跟踪</span>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-row>

      <el-row :gutter="15" style="top: 15px">
        <el-col :span="6">
          <el-input v-model="searchText" placeholder="请输入要查找的姓名"></el-input>
        </el-col >
        <el-col :span='8'>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-col>
      </el-row>

      <el-table
          v-loading="loading"
          :data="tableData">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="vipId" label="VIP ID"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="height" label="身高"></el-table-column>
        <el-table-column prop="weight" label="体重"></el-table-column>
        <el-table-column prop="bloodPressure" label="血压"></el-table-column>
        <el-table-column prop="heartRate" label="心率"></el-table-column>
        <el-table-column prop="numberClass" label="上课数量"></el-table-column>

        <el-table-column label="操作" width="200px">
          <template #default="{ row }">
            <el-button
                :icon="Edit"
                circle
                plain
                type="primary"
                @click="handleEdit({ row })">
            </el-button>
            <el-button
                :icon="Delete"
                circle
                plain
                type="danger"
                @click="handleDelete({ row })">
            </el-button>

          </template>
        </el-table-column>

        <template #empty>
          <el-empty description="没有数据"></el-empty>
        </template>
      </el-table>

      <!--    <el-pagination-->
      <!--        class="pagination1"-->
      <!--        background-->
      <!--        layout="prev, pager, next"-->
      <!--        :total="total"-->
      <!--        :page-size="pageSize"-->
      <!--        @current-change="handlePageChange">-->
      <!--    </el-pagination>-->
      <el-pagination
          class="pagination1"
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 6, 7, 8,9,10]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="handlePageChange"
      ></el-pagination>

      <FitnessDataChannelEdit ref="dialog" @success="onSuccess">
      </FitnessDataChannelEdit>

    </el-card>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {vipDeleteService, vipPageService} from "@/api/user";
import axios from "axios";
import request from "@/utils/request";
import {Delete,Edit} from "@element-plus/icons-vue";
import FitnessDataChannelEdit from "@/views/FitnessDataChannelEdit.vue";
import {ElMessage, ElMessageBox} from "element-plus";

const searchText = ref('');

// const tableData = ref([]);
const handleEdit = async ({ row }: { row: any }) => {
  console.log('编辑', row);
  await dialog.value.open(row)

  fetchData(currentPage.value, pageSize.value);
};
const handleDelete = async ({ row }: { row: any }) => {
  await ElMessageBox.confirm('你确定要删除吗','温馨提示',{
    type:'warning',
    confirmButtonText:'确定',
    cancelButtonText:'取消'
  })
  await vipDeleteService(row.vipId)
  console.log('删除', row);

  fetchData(currentPage.value, pageSize.value);
};

const tableData = ref([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(5);
const loading=ref(false)
const dialog=ref()

const fetchData = async (page, size) => {
  try {
    loading.value=true
    const vipName=searchText.value

    const response = await request.post('/vip/get/page',{vipName,page,size});

    tableData.value = response.data.data.pageList;
    total.value = response.data.data.total;
    console.log(response)
    console.log(total.value+'total')
    loading.value=false
  } catch (error) {
    console.error(error);
  }
};

const handlePageChange = (page) => {
  currentPage.value = page;
  fetchData(page, pageSize.value);
};

onMounted(() => {
  fetchData(currentPage.value, pageSize.value);

});

const onSuccess=()=>{
  fetchData(currentPage.value, pageSize.value);
}

const onSearch=()=>{
  fetchData(currentPage.value, pageSize.value);
}

// onMounted(async () => {
//   try {
//     const response = await $http.get('/vip/viplistuser');
//     tableData.value = response.data.data;
//
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// });

// $http.post('/vip/viplistuser123',tableData)
// $http.get('/vip/viplistuser123').then(result=>{
//       console.log(result.data)}
// ).catch(err=>{
//     }
//
// )
//
// const searchConditions=ref({
//
// })

// const search=function (){
//   $http.get('/vip/search',{params:{...searchConditions.value}}).then(result=>{
//
//   }).catch(err=>{
//
//   })
// }

</script>

<style scoped>
.card1{
  min-height: 100%;
}

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
  height: 100%;
}
.pagination1{
  position: absolute;
  bottom: 20px;
}
</style>
