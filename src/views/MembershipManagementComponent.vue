<template>
  <div class="frame">
    <el-card class="card1">

      <el-row >
        <el-col :span="12"><span style="font-size: 30px">会籍管理</span></el-col>
      </el-row>
      <el-row>
        <div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home/homePage' }">主页</el-breadcrumb-item>
            <el-breadcrumb-item>
              <span>会籍管理</span>
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
        <el-table-column prop="type" label="会员类型"></el-table-column>
        <el-table-column prop="joinDate" label="注册日期"></el-table-column>
        <el-table-column prop="expirationDate" label="结束日期"></el-table-column>

        <el-table-column label="操作" width="200px">
          <template #default="{ row }">
            <el-button
                :icon="Edit"
                circle
                plain
                type="primary"
                @click="handleEdit({ row })">
            </el-button>
            <el-button type="primary" @click="renewal(row)">续费</el-button>

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

      <el-dialog v-model="isRenewal" width="30%" :title="'续费'">
        <el-form>
          <el-form-item label="续费">
            <el-input v-model="onRenewal" placeholder="续费时间在1-12个月"></el-input>
          </el-form-item>
        </el-form>

        <template #footer >
        <span class="dialog-footer">
          <el-button @click="isRenewal=false">取消</el-button>
          <el-button type="primary" @click="renewal1">确认</el-button>
        </span>
        </template>
      </el-dialog>

      <MenbershipManagementChannelEdit ref="dialog" @success="onSuccess">
      </MenbershipManagementChannelEdit>

    </el-card>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {vipDeleteService} from "@/api/user";
import request from "@/utils/request";
import {Delete,Edit} from "@element-plus/icons-vue";
import MenbershipManagementChannelEdit from "@/views/MenbershipManagementChannelEdit.vue";

const searchText = ref('');

// const tableData = ref([]);
const handleEdit = ({ row }: { row: any }) => {
  console.log('编辑', row);
  dialog.value.open(row)

  fetchData(currentPage.value, pageSize.value);
};
const handleDelete = ({ row }: { row: any }) => {
  vipDeleteService(row.vipId)

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
const isRenewal=ref(false)
const onRenewal=ref('')
const vipRenwal1=ref({
  vipId:'',
  num:''
})
const renewal=(row)=>{
  isRenewal.value=true
  vipRenwal1.value.vipId=row.vipId


}
const renewal1=async ()=>{
  vipRenwal1.value.num=onRenewal.value
  console.log(vipRenwal1.value)

  await request.post('/vip/renew',vipRenwal1.value)

   isRenewal.value=false
  fetchData(currentPage.value, pageSize.value);
}
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
