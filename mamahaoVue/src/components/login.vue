<template >

    <el-main class="man">
      <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
        <h3 class="login-title">欢迎登录</h3>
        <el-form-item label="账号" prop="username">
          <el-input type="text" placeholder="请输入账号" v-model="form.username"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-main>

</template>

<script>
  import {login} from "../request/api.js";
  import {Message} from 'element-ui'
  import router from '../router/index'

  export default {
    name: "Login",
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        rules: {
          username: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ]
        },

      }
    },
    methods: {

      onSubmit() {
        // 为表单绑定验证功能
        var info = {
          data: JSON.stringify(
            {
              username: this.form.username,
              password: this.form.password
            }
          )
        }
        login(info).then(function (data) {

          var msgcode = data.data["code"]
          console.log(data)
          if (msgcode == 200) {
            sessionStorage.setItem('uuid', data.data.data["uuid"]);
            sessionStorage.setItem('token', data.data.data["token"]);
            sessionStorage.setItem('position', data.data.data["type"]);
            sessionStorage.setItem('uname', data.data.data["uname"]);
            router.replace({ path: "/index" });
          }
          if (msgcode == 201) {
            Message.error(data.data["message"])
          }
          if (msgcode == 500) {
            Message.error(data.data["message"])
          }
          // var indexUrl1
          // indexUrl1 = sessionStorage.getItem('uuid');
          // Message.info(indexUrl1)
        })


      }
    }
  }
</script>

<style lang="scss" scoped>

  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }

.man{

}

</style>




