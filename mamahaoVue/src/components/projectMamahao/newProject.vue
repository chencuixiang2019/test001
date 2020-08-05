<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
           style="width: 600px;margin-left: 20em">
    <el-form-item label="项目图片" class="img">
      <div class="upload">
        <el-upload
          class="avatar-uploader"
          :action=domain
          :http-request=upqiniu
          :show-file-list="false"
          :before-upload="beforeUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </el-form-item>
    <el-form-item label="项目名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="项目描述" prop="describe">
      <el-input v-model="ruleForm.describe"></el-input>
    </el-form-item>
    <el-form-item label="项目环境" prop="select">
      <el-select v-model="ruleForm.searchValue" clearable placeholder="项目运行接口主地址，必填" @change="changeValue"
                 filterable
                 allow-create
                 default-first-option
                 @blur="searchBlur"
                 style="width: 500px">
        <el-option
          v-for="item in options"
          :key="item.label"
          :label="item.value"
          :value="item.label">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="其他环境1" prop="select">
        <el-select v-model="ruleForm.configure" filterable
                   allow-create
                   @blur="searchBlur1"
                   default-first-option clearable placeholder="非必填" style="width: 500px">
        <el-option
          v-for="item in options"
          :key="item.label"
          :label="item.value"
          :value="item.label">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="其他环境2" prop="select">
        <el-select v-model="ruleForm.otherconfigure" filterable
                   @blur="searchBlur2"
                   allow-create
                   default-first-option clearable placeholder="非必填" style="width: 500px">
        <el-option
          v-for="item in options"
          :key="item.label"
          :label="item.value"
          :value="item.label">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>


</template>

<script>
  import {addproject, uploadtoken} from "../../request/api.js";

  import router from '../../router/index'
  var runningAddress = ""
  import {Message} from 'element-ui'
  import axios from 'axios';
  export default {
    name: "newProject",
    data() {
      return {
        ruleForm: {
          name: '',
          describe: '',
          searchValue: "",
          configure: "",
          otherconfigure: ""
        },

        options: [{
            value: 'http://192.168.10.91:8080',
            label: 'http://192.168.10.91:8080'
        },
            {
                value: 'http://192.168.10.92:8080',
                label: 'http://192.168.10.92:8080'
            },
            {
                value: 'http://192.168.10.93:8080',
                label: 'http://192.168.10.93:8080'
            },
            {
                value: 'http://192.168.10.140:8080',
                label: 'http://192.168.10.140:8080'
            },
            {
                value: 'http://192.168.10.73:8018',
                label: 'http://192.168.10.73:8018'
            },
            {
                value: 'http://192.168.10.74:8018',
                label: 'http://192.168.10.74:8018'
            },
            {
                value: 'http://192.168.10.75:8018',
                label: 'http://192.168.10.75:8018'
            },
            {
                value: 'http://192.168.10.140:8018',
                label: 'http://192.168.10.140:8018'
            },
        ],

        imageUrl: '',
        token: {},
        // 七牛云的上传地址，根据自己所在地区选择，我这里是华南区
        domain: 'http://upload-z2.qiniup.com',
        // 这是七牛云空间的外链默认域名
        qiniuaddr: 'chq.lihail.cn',

        rules: {
          name: [
            {required: true, message: '请输入项目名称', trigger: 'blur'},
            {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'}
          ],
          describe: [
            {required: true, message: '请输入项目描述', trigger: 'blur'},
            {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'}
          ],

        }
      };
    },
    methods: {
        searchBlur1(e) {
            console.log(e.target.value)
            this.ruleForm.configure = e.target.value;
        },
        searchBlur2(e) {
            console.log(e.target.value)
            this.ruleForm.ruleForm.otherconfigure = e.target.value;
        },
        searchBlur(e) {
            console.log(e.target.value)
            this.ruleForm.searchValue = e.target.value;
            runningAddress = e.target.value;
        },
      changeValue(label) {
        let obj = {};
        obj = this.options.find((item) => {
          return item.label === label;
        });
          console.log("obj.label:", obj.label)
        runningAddress = obj.label
      },
       resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      var info = {
        data: JSON.stringify({
          imageUrl: this.imageUrl,
          name: this.ruleForm.name,
          describe: this.ruleForm.describe,
          runningAddress: runningAddress,
          configure_address: this.ruleForm.configure,
          otherconfigure: this.ruleForm.otherconfigure
        }),
      }

        try {

        if (runningAddress == null || runningAddress == "") {
          Message.error("请填写正确的项目环境地址")
        } else {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              addproject(info).then(function (data) {
                var datacont=data.data
                if (datacont["code"]==200){
                  Message.success("新增成功")
                  router.push("/index");
                }
                if(datacont["code"]==201){
                  Message.warning(datacont["msg"])
                }
                if(datacont["code"]==500){
                  Message.error(datacont["msg"])
                }
              })
            } else {
              Message.error("提交表单失败，请正确提交")
              return false;
            }
          });
        }
      } finally {
        runningAddress = "";
        this.ruleForm.searchValue = ""
        this.ruleForm.configure = ""
        this.ruleForm.otherconfigure = ""
      }
    },
      upqiniu(file) {
        const config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        let filetype = ''
        if (file.file.type === 'image/png') {
          filetype = 'png'
        } else {
          filetype = 'jpg'
        }
        console.log("req:====", filetype)
        // 重命名要上传的文件
        const keyname = 'mamahao' + new Date().getTime() + Math.floor(Math.random() * 100) + '.' + filetype
        // 从后端获取上传凭证token
        uploadtoken().then(res => {
          const formdata = new FormData()
          formdata.append('file', file.file)
          formdata.append('token', res.data["uptoken"])
          formdata.append('key', keyname)
          console.log(formdata)
          // 获取到凭证之后再将文件上传到七牛云空间
          axios.post(this.domain, formdata, config).then(res => {
            this.imageUrl = 'http://' + this.qiniuaddr + '/' + res.data.key
            console.log(this.imageUrl)
          })
        })
      },
      // 验证文件合法性
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    },

  }
</script>

<style scoped>
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-left: 120px;
  }

  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .img {

    width: 420px;
    height: 200px;
  }
</style>
