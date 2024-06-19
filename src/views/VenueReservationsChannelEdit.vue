<script setup lang="ts">
import {ref} from "vue";
import {avatarEmits} from "element-plus";
//import {addUserService, updateUserService} from "@/api/user";
const dialogVisible=ref(false)
const fromModel=ref({
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

// const options=[
//   {
//     value:'青铜会员',
//     label:'青铜会员'
//   },{
//     value:'白银会员',
//     label:'白银会员'
//   },{
//     value:'黄金会员',
//     label:'黄金会员'
//   },{
//     value:'至尊会员',
//     label:'至尊会员'
//   }]
const open=(row)=>{
  dialogVisible.value=true
  fromModel.value={...row}
}
const emit=defineEmits(['success'])
const onSubmit=async ()=>{
  const isEdit=fromModel.value.coachId
  if(isEdit){
    //const response= await updateUserService(fromModel.value)
    //console.log("修改"+response)

  }else {
    console.log(fromModel.value)
    //const response =await addUserService(fromModel.value)

  }
  dialogVisible.value=false;
  emit('success')
}
defineExpose({
  open
})

const rules={
  name:[{required:true,message:'请输入姓名',trigger:'blur'}],
  age:[{required:true,message:'请输入年龄',trigger:'blur'}],
  sex:[{required:true,message:'请输入年龄',trigger:'blur'}],
  type:[{required:true,message:'请输入年龄',trigger:'blur'}],
  phone:[{required:true,message:'请输入年龄',trigger:'blur'}],
  identityCard:[{required:true,message:'请输入年龄',trigger:'blur'}]
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