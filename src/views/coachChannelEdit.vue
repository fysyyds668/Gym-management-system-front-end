<script setup lang="ts">
import {coachUpdateService,coachAddService} from "@/api/coach"
import {ref} from "vue";
import {Promotion} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

const dialogVisble=ref(false)
const fromModel=ref({
  id:'',
  coachId: '',
  name: '',
  age: '',
  sex: '',
  salary: '',
  identityCard: ''
})
const emit=defineEmits(['success'])
const form=ref()
const open=(row)=>{

  dialogVisble.value=true
  fromModel.value={...row}
  //console.log(fromModel.value+'from============')
}
const onSubmit=async ()=>{
  const idEdit=fromModel.value.coachId
  if (idEdit){
    await form.value.validate()
    const response=await coachUpdateService(fromModel.value)


  }else {
    await form.value.validate()
    const response=await coachAddService(fromModel.value)
    console.log(response+"添加教练")

  }
  dialogVisble.value=false
  emit('success')
}

defineExpose({
  open
})

const rules={
  name:[{required:true,message:'请输入姓名',trigger:'blur'}],
  age:[{required:true,message:'请输入年龄',trigger:'blur'}],
  sex:[{required:true,message:'请输入性别',trigger:'blur'}],
  salary:[{required:true,message:'请输入类型',trigger:'blur'}],
}

</script>

<template>
  <el-dialog v-model="dialogVisble" width="40%" :title="fromModel.coachId?'编辑教练':'添加教练'">

    <el-form
        :model="fromModel"
        :rules="rules"
        ref="form"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="fromModel.name" style="padding-left: 47px"></el-input>
      </el-form-item >

      <el-form-item label="年龄" prop="age">
        <el-input v-model="fromModel.age" style="padding-left: 47px"></el-input>
      </el-form-item>

<!--      <el-form-item label="性别" prop="age">-->
<!--        <el-input v-model="fromModel.sex"></el-input>-->
<!--      </el-form-item>-->

      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="fromModel.sex" style="padding-left: 47px" size="small">
          <el-radio-button value="男" size="large" >男</el-radio-button>
          <el-radio-button value="女" size="large">女</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="薪水" prop="age">
        <el-input v-model="fromModel.salary" style="padding-left: 47px"></el-input>
      </el-form-item>

      <el-form-item label="身份证" prop="age">
        <el-input v-model="fromModel.identityCard" style="padding-left: 34px"></el-input>
      </el-form-item>


    </el-form>

    <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisble=false">取消</el-button>
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