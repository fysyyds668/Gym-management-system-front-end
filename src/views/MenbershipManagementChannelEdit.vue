<script setup lang="ts">
import {ref} from "vue";
import {avatarEmits, ElMessage} from "element-plus";
import {updateInfService} from "@/api/user";
const dialogVisible=ref(false)
const fromModel=ref({
  vipId:'',
  name:'',
  age:'',
  sex:'',
  phone:'',
  type:'',
  identityCard:'',
})

const options=[
  {
    value:'青铜会员',
    label:'青铜会员'
  },{
    value:'白银会员',
    label:'白银会员'
  },{
    value:'黄金会员',
    label:'黄金会员'
  },{
    value:'至尊会员',
    label:'至尊会员'
  }]
const open=(row)=>{
  dialogVisible.value=true
  fromModel.value={...row}
}

const emit=defineEmits(['success'])

const onSubmit=async ()=>{

  console.log(fromModel.value)
  const response= await updateInfService(fromModel.value)

  dialogVisible.value=false;

  emit('success')
}
defineExpose({
  open
})

const rules={
  type:[{required:true,message:'请输入类型',trigger:'blur'}]
}


</script>

<template>
  <el-dialog v-model="dialogVisible" :title="fromModel.vipId?'编辑用户':'添加用户'" width="40%">
    <el-form
        :rules="rules"
        ref="from"
        :model="fromModel" >

      <el-form-item label="会员类型" prop="type">
        <el-select
            v-model="fromModel.type"
            placeholder="Select"
            style="width: 240px;padding-left: 20px">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
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