<script setup lang="ts">
import {ref} from "vue";
import {avatarEmits} from "element-plus";
import {venueReservationAddService} from "@/api/venueReservation";
const dialogVisible=ref(false)
const fromModel=ref({
  id:'',
  vipId: '',
  vipName: '',
  coachId: '',
  coachName: '',
  courseId: '',
  courseName: '',
  materialId: '',
  materialName: '',
  classTime: '',
  period: '',
  sign: '',
})

const open=(row)=>{
  dialogVisible.value=true
  fromModel.value={...row}
  //console.log(fromModel.value.coachId+'========================')
}
const emit=defineEmits(['success'])
const onSubmit=async ()=>{

    const response= await venueReservationAddService(fromModel.value)

  dialogVisible.value=false;
  emit('success')
}
defineExpose({
  open
})

const rules={
  vipId:[{required:true,message:'请输入姓名',trigger:'blur'}],
}


</script>

<template>
  <el-dialog v-model="dialogVisible" :title="'预约课程'" width="40%">
    <el-form
        :rules="rules"
        ref="from"
        :model="fromModel" >
      <el-form-item  label="用户ID" prop="vipID">
        <el-input v-model="fromModel.vipId" style="padding-left: 47px"></el-input>
      </el-form-item>


    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible=false">取消</el-button>
      <el-button type="primary" @click="onSubmit">确认</el-button>
    </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-form-item{
  padding-right: 50px;
  padding-left: 50px;
}

</style>