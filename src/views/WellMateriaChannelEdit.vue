<script setup lang="ts">
import {wellMaterialUpdateService,wellMaterialAddService} from "@/api/material"
import {ref} from "vue";
import {Promotion} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

const dialogVisble=ref(false)
const fromModel=ref({
  id: '',
  materialId: '',
  name: '',
  num: '',
  unitPrice: '',
  totalPrice: '',
  destroy: ''
})
const emit=defineEmits(['success'])
const form=ref()
const open=(row)=>{

  dialogVisble.value=true
  fromModel.value={...row}
  //console.log(fromModel.value+'from============')
}
const onSubmit=async ()=>{
  const idEdit=fromModel.value.materialId
  if (idEdit){
    await form.value.validate()
    console.log(fromModel.value)
    const response=await wellMaterialUpdateService(fromModel.value)

    console.log(response.data)

  }else {
    await form.value.validate()
    const response=await wellMaterialAddService(fromModel.value)

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
  <el-dialog v-model="dialogVisble" width="40%" :title="fromModel.materialId?'编辑器材':'添加器材'">

    <el-form
        :model="fromModel"
        :rules="rules"
        ref="form"
    >
      <el-form-item label="器材名" prop="name">
        <el-input v-model="fromModel.name" style="padding-left: 47px"></el-input>
      </el-form-item >

      <el-form-item label="器材数量" prop="num">
        <el-input type="number" v-model="fromModel.num" style="padding-left: 47px"></el-input>
      </el-form-item>

      <!--      <el-form-item label="性别" prop="age">-->
      <!--        <el-input v-model="fromModel.sex"></el-input>-->
      <!--      </el-form-item>-->


      <el-form-item label="器材单价" prop="unitPrice">
        <el-input v-model="fromModel.unitPrice" style="padding-left: 47px"></el-input>
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