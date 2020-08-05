<template>

    <div style="width: 800px">
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
            <el-form-item
                    prop="sender"
                    label="发件邮箱:"
                    :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
            >
                <el-input v-model="dynamicValidateForm.sender" style="width: 400px"></el-input>
            </el-form-item>

            <el-form-item
                    label="SMTP服务:"
                    prop="host"
                    :rules="[
      { required: true, message: 'SMTP服务器不能为空', trigger: 'blur' }]"
            >
                <el-input v-model="dynamicValidateForm.host" style="width: 400px"></el-input>
            </el-form-item>

            <el-form-item
                    label="邮件端口:"
                    prop="port"
                    :rules="[
      { required: true, message: '邮件端口不能为空', trigger: 'blur' }]"
            >
                <el-input v-model="dynamicValidateForm.port" style="width: 400px"></el-input>
            </el-form-item>

            <el-form-item
                    label="用户名:"
                    prop="user"
                    :rules="[
      { required: true, message: '用户名不能为空', trigger: 'blur' }]"
            >
                <el-input v-model="dynamicValidateForm.user" style="width: 400px"></el-input>
            </el-form-item>

            <el-form-item
                    label="授权码:"
                    prop="passWD"

                    :rules="[
      { required: true, message: '授权码不能为空', trigger: 'blur' }]"
            >
                <el-input show-password v-model="dynamicValidateForm.passWD" style="width: 400px"></el-input>
            </el-form-item>

            <el-form-item
                    v-for="(domain, index) in dynamicValidateForm.domains"
                    :label="'收件邮箱' + index"
                    :key="domain.key"
                    :prop="'domains.' + index + '.value'"
                    :rules="[
      { required: true, message: '请输入收件邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的收件邮箱地址', trigger: ['blur', 'change'] }
    ]"
            >
                <el-input v-model="domain.value" style="width: 400px"></el-input>
                <el-button @click="addDomain">新增收件人</el-button>
                <el-button @click.prevent="removeDomain(domain)" type="danger" v-show="index>0">删除</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="warning" @click="testEmailOBJ('dynamicValidateForm')">测试发送邮件</el-button>
                <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    import {addEmail, getEmail, testEmail} from "../../request/api.js";
    import {Message} from 'element-ui'
    export default {
        inject: ['reload'],
        name: "TestMail",
        data() {
            return {

                dynamicValidateForm: {
                    id: "",
                    domains: [{
                        value: ''
                    }],
                    sender: '',
                    host: '',
                    port: '',
                    passWD: '',
                    user: "",
                }
            };
        },
        methods: {
            testEmailOBJ(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var parme = JSON.stringify(this.dynamicValidateForm)
                        testEmail(parme).then(response => {
                            var result = response["data"]
                            if (result["code"] == 200) {
                                Message.success(result["msg"])
                            }
                            if (result["code"] == 201) {
                                Message.warning(result["msg"])
                            }

                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });


            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.dynamicValidateForm)
                        var parme = JSON.stringify(this.dynamicValidateForm)
                        console.log(parme)
                        addEmail(parme).then(response => {
                            var result = response["data"]
                            if (result["code"] == 200) {
                                this.reload()
                            }
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item)
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
                }
            },
            addDomain() {
                this.dynamicValidateForm.domains.push({
                    value: '',
                    key: Date.now()
                });
            },
            getEmailOBJ() {
                getEmail().then(response => {
                    var result = response["data"]
                    if (result["code"] == 200) {
                        this.dynamicValidateForm.id = result["data"][0]["pk"]
                        let list = result["data"][0]["fields"]
                        var receivers = new Array()
                        let maxI = eval(list["receivers"]).length
                        for (var i = 0; i < maxI; i++) {
                            let a = {value: eval(list["receivers"])[i]}
                            receivers.push(a)
                        }
                        this.dynamicValidateForm.domains = receivers,
                            this.dynamicValidateForm.sender = list["sender"],
                            this.dynamicValidateForm.host = list["host"],
                            this.dynamicValidateForm.port = list["port"],
                            this.dynamicValidateForm.passWD = list["passWD"],
                            this.dynamicValidateForm.user = list["user"]
                    }
                })


            }
        }
        ,
        mounted: function () {
            this.getEmailOBJ();
        }
        ,
    }
</script>

<style scoped>

</style>
