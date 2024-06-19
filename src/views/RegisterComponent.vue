<template>

  <el-button plain @click="dialogFormVisible = true">
    注册
  </el-button>

  <el-dialog v-model="dialogFormVisible" title="注册" width="500">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input type="password" v-model="form.pwd" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth">
        <el-input v-model="form.tem" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth">
        <el-input v-model="form.captcha" style="width: 100px "/>
        <el-button type="primary" style="margin-left: 60px">获取验证码</el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          注册
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  pwd:'',
  tem:'',
  captcha:''
})

</script>
