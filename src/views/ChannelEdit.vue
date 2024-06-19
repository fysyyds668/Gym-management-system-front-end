<script setup lang="ts">
import {ref} from "vue";
import {avatarEmits, ElMessage} from "element-plus";
import {addUserService, updateUserService} from "@/api/user";
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
    const response= await updateUserService(fromModel.value)

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
<el-dialog v-model="dialogVisible" :title="fromModel.vipId?'编辑用户':'添加用户'" width="40%">
  <el-form
      :rules="rules"
      ref="form"
      :model="fromModel" >
    <el-form-item  label="姓名" prop="name">
      <el-input v-model="fromModel.name" style="padding-left: 47px"></el-input>
    </el-form-item>
    <el-form-item  label="年龄" prop="age">
      <el-input v-model="fromModel.age" style="padding-left: 47px"></el-input>
    </el-form-item>
<!--    <el-form-item  label="性别" prop="sex">-->
<!--      <el-input v-model="fromModel.sex" style="padding-left: 47px"></el-input>-->
<!--    </el-form-item>-->
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="fromModel.sex" style="padding-left: 47px" size="small">
        <el-radio-button value="男" size="large" >男</el-radio-button>
        <el-radio-button value="女" size="large">女</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <el-form-item  label="电话号码" prop="phone">
      <el-input v-model="fromModel.phone" style="padding-left: 20px"></el-input>
    </el-form-item>
<!--    <el-form-item  label="会员类型" prop="type">-->
<!--      <el-input v-model="fromModel.type" style="padding-left: 20px"></el-input>-->
<!--    </el-form-item>-->
    <el-form-item label="会员类型" prop="type" v-if="fromModel.vipId==null">
      <el-select
          v-model="fromModel.type"
          placeholder="Select"
          style="width: 100%;padding-left: 20px;">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item  label="身份证号" prop="identityCard">
      <el-input v-model="fromModel.identityCard" style="padding-left: 20px"></el-input>
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