<script setup lang="ts">
import {courseUpdateService,courseAddService} from "@/api/course"
import {ref} from "vue";
import {ElMessage} from "element-plus";

const dialogVisble=ref(false)
const fromModel=ref({
  id:'',
  courseId:'',
  name:'',
  type:''
})
const options=[{
  value:'游泳课',
  label:'游泳课'
},{
  value: '减脂课',
  label: '减脂课'
},{
  value: '健身课',
  label: '健身课'
},{
  value: '骑行课',
  label: '骑行课'
},{
  value: '瑜伽课',
  label: '瑜伽课'
}
]
const form=ref()
const open=(row)=>{
  dialogVisble.value=true
  fromModel.value={...row}
}
const emit=defineEmits(['success'])
const onSubmit=async ()=>{
  const idEdit=fromModel.value.courseId
  if (idEdit){
    await form.value.validate();
    const response=await courseUpdateService(fromModel.value)

  }else {
    await form.value.validate();
    console.log(fromModel.value)
    await courseAddService(fromModel.value)

  }
  dialogVisble.value=false
  emit('success')
}

defineExpose({
  open
})
const rules={
  name:[{required:true,message:'请输入姓名',trigger:'blur'}],
  type:[{required:true,message:'请输入类型',trigger:'blur'}],
}

</script>

<template>
<el-dialog v-model="dialogVisble" width="40%" :title="fromModel.courseId?'编辑课程':'添加课程'">
  <el-form
      :model="fromModel"
      :rules="rules"
      ref="form">
    <el-form-item label="课程名" prop="name">
      <el-input v-model="fromModel.name"></el-input>
    </el-form-item>
<!--    <el-form-item label="类型" prop="type">-->
<!--      <el-input v-model="fromModel.type" style="padding-left: 16px"></el-input>-->
<!--    </el-form-item>-->
    <el-form-item label="类型" prop="type">
      <el-select v-model="fromModel.type" placeholder="Select" style="padding-left: 16px">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled">
        </el-option>
      </el-select>
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