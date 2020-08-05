<template>
    <div>
        <el-row class="operate">
            <el-col :span="24">
                <el-button type="primary" @click.native="newadduser()">新增用户</el-button>
            </el-col>
        </el-row>
        <el-dialog title="新增修改用户信息" :visible.sync="dialogFormVisible" width="700px">

            <el-form ref="userform" :model="userform" :rules="userform">
                <el-form-item label="用户名称：" prop="user_account"
                              :rules="[
      { required: true, message: '用户名称不能为空', trigger: 'blur' }]">
                    <el-input v-model="userform.user_account" autocomplete="off" style="width: 500px"></el-input>
                </el-form-item>
                <el-form-item label="账户名称：" prop="name"
                              :rules="[
      { required: true, message: '登录名称不能为空', trigger: 'blur' }]"
                >
                    <el-input v-model="userform.name" uto-complete="new-password" autocomplete="off"
                              style="width: 500px"></el-input>
                </el-form-item>

                <el-form-item label="用户密码：" prop="password"
                              :rules="[
      { required: true, message: '用户密码不能为空', trigger: 'blur' }]">

                    <el-input v-model="userform.password" auto-complete="new-password" type="password" show-password
                              style="width: 500px"></el-input>
                    <span style="margin-left: 15%;color: red">{{this.spannew}}</span>
                </el-form-item>


                <el-form-item label="用户权限："
                              prop="user_type"
                              :rules="[
      { required: true, message: '权限不能为空', trigger: 'blur' }]"
                >
                    <el-select v-model="userform.user_type" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="adduserPresonnelOBJ('userform')">确 定</el-button>
            </div>
        </el-dialog>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="登录账号"
                    width="280"
            >
                <template slot-scope="scope">
                    {{scope.row.fields.user_name}}
                </template>

            </el-table-column>
            <el-table-column
                    label="姓名"
                    width="280"
            >
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.fields.user_account }}</p>
                        <p>最近登录时间: {{ scope.row.fields.updata_time }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.fields.user_account }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.row.pk)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.pk)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {adduserPresonnel, getALLPresonnel, getPresonnel, delPresonnel} from "../../request/api.js";
    import {Message} from 'element-ui'

    export default {
        name: "Personnel",
        inject: ['reload'],
        data() {
            return {
                dialogFormVisible: false,
                spannew: "",
                userform: {
                    id: "",
                    user_account: "",
                    name: "",
                    password: "",
                    user_type: ""
                },
                options: [{
                    value: 1,
                    label: '超级管理员'
                }, {
                    value: 2,
                    label: '普通管理员'
                }, {
                    value: 3,
                    label: '其他人员'
                }],
                tableData: []
            }
        },
        methods: {
            handleEdit(row) {
                getPresonnel({id: row}).then(response => {
                    var result = response["data"]["data"][0]
                    this.userform.id = result.pk
                    this.userform.user_account = result["fields"]["user_account"]
                    this.userform.name = result["fields"]["user_name"]
                    this.userform.password = "123456"
                    this.userform.user_type = result["fields"]["user_type"]
                    this.spannew = "修改账户信息会把密码初始化成‘123456’(可直接在当前修改密码)"
                    this.dialogFormVisible = true

                })

            },

            handleDelete(row) {
                console.log(row);
                delPresonnel({id: row}).then(response => {
                    var result = response["data"]
                    if (result["code"] == 200) {
                        Message.success(result["msg"])
                        this.reload()
                    }
                })
            },
            newadduser() {
                this.userform.id = ""
                this.userform.user_account = ""
                this.userform.name = ""
                this.userform.password = ""
                this.userform.user_type = ""
                this.spannew = ""
                this.dialogFormVisible = true
            },
            adduserPresonnelOBJ(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var parme = JSON.stringify(this.userform)
                        adduserPresonnel(parme).then(response => {
                            var result = response["data"]
                            if (result["code"] == 200) {
                                Message.success("新增用户成功")
                                this.reload()
                            }
                            if (result["code"] == 201) {
                                Message.warning(result["msg"])
                            }

                            }
                        )

                    } else {
                        Message.warning('error submit!!');
                        return false;
                    }
                });
            },
            getALLPresonnelOBJ() {
                getALLPresonnel().then(response => {
                    var result = response["data"]
                    console.log(result["data"])
                    this.tableData = result["data"]
                })
            }
        },
        mounted: function () {
            this.getALLPresonnelOBJ();
        }
        ,
    }
</script>

<style scoped>

</style>
