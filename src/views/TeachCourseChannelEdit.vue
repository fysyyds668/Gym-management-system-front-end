<script setup lang="ts">
import {teachCourseUpdateService,teachCourseAddService} from "@/api/teach"
import {ref} from "vue";
import {ElMessage} from "element-plus";

const dialogVisble=ref(false)
const fromModel=ref({
  id:'',
  coachId: '',
  coachName: '',
  courseId: '',
  courseName: '',
  time: '',
  period: '',
  number: ''
})

const form=ref()
const open=(row)=>{
  dialogVisble.value=true
  fromModel.value={...row}
}
const emit=defineEmits(['success'])
const onSubmit=async ()=>{
  const idEdit=fromModel.value.id
  if (idEdit){
    await form.value.validate();
    console.log(fromModel.value)
    //fromModel.value.number=parseInt(fromModel.value.number)
    const response=await teachCourseUpdateService(fromModel.value)

  }else {
    await form.value.validate();
    await teachCourseAddService(fromModel.value)

  }
  dialogVisble.value=false
  emit('success')
}

defineExpose({
  open
})
const rules={
  coachId:[{required:true,message:'请输入教练ID',trigger:'blur'}],
  courseId:[{required:true,message:'请输入课程ID',trigger:'blur'}],
  time:[{required:true,message:'请输入日期',trigger:'blur'}],
  period:[{required:true,message:'请输入时间',trigger:'blur'}],
  number:[{required:true,message:'请输入数量',trigger:'blur'}],
}

</script>

<template>
  <el-dialog v-model="dialogVisble" width="40%" :title="fromModel.id?'编辑授课':'添加授课'" >
    <el-form
        :model="fromModel"
        :rules="rules"
        ref="form">
      <el-form-item label="教练ID" prop="coachId">
        <el-input v-model="fromModel.coachId"></el-input>
      </el-form-item>
      <!--    <el-form-item label="类型" prop="type">-->
      <!--      <el-input v-model="fromModel.type" style="padding-left: 16px"></el-input>-->
      <!--    </el-form-item>-->
      <el-form-item label="课程ID" prop="courseId">
        <el-input v-model="fromModel.courseId"></el-input>
      </el-form-item>
      <el-form-item label="日期" prop="coachId">
        <el-input v-model="fromModel.time"></el-input>
      </el-form-item>
      <el-form-item label="时间" prop="coachId">
        <el-input v-model="fromModel.period"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="number">
        <el-input type="number" v-model="fromModel.number"></el-input>
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