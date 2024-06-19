<script setup lang="ts">
import {ref} from "vue";
import {addUserService, updateFitnessService} from "@/api/user";
const dialogVisible=ref(false)
const fromModel=ref({
  vipId:'',
  name:'',
  height:'',
  weight:'',
  bloodPressure:'',
  heartRate:'',
  numberClass:'',
})

const form=ref()
const open=(row)=>{
  dialogVisible.value=true
  fromModel.value={...row}
}

const emit=defineEmits(['success'])

const onSubmit=async ()=>{
  const isEdit=fromModel.value.vipId
  if(isEdit){
    await form.value.validate();
    const response= await updateFitnessService(fromModel.value)



  }else {
    await form.value.validate();
    const response =await addUserService(fromModel.value)

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
  sex:[{required:true,message:'请输入性别',trigger:'blur'}],
  type:[{required:true,message:'请输入类型',trigger:'blur'}],
  phone:[{required:true,message:'请输入手机号',trigger:'blur'}],
  identityCard:[{required:true,message:'请输入身份证',trigger:'blur'}]
}


</script>

<template>
  <el-dialog v-model="dialogVisible" :title="fromModel.vipId?'编辑数据':'添加数据'" width="40%">
    <el-form
        :rules="rules"
        ref="form"
        :model="fromModel" >
      <el-form-item  label="姓名" prop="name">
        <el-input v-model="fromModel.name" style="padding-left: 47px"></el-input>
      </el-form-item>
      <el-form-item  label="身高" prop="height">
        <el-input v-model="fromModel.height" style="padding-left: 47px"></el-input>
      </el-form-item>

      <el-form-item  label="血压" prop="bloodPressure">
        <el-input v-model="fromModel.bloodPressure" style="padding-left: 20px"></el-input>
      </el-form-item>

      <el-form-item  label="心率" prop="heartRate">
        <el-input v-model="fromModel.heartRate" style="padding-left: 20px"></el-input>
      </el-form-item>

      <el-form-item  label="上课数量" prop="numberClass">
        <el-input v-model="fromModel.numberClass" style="padding-left: 20px"></el-input>
      </el-form-item>

      <el-form-item  label="体重" prop="weight">
        <el-input v-model="fromModel.weight" style="padding-left: 20px"></el-input>
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