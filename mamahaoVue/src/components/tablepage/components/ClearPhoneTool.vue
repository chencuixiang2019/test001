<template>
    <div>
        <el-card>
            <i class="el-icon-star-on"></i>
            <div style="padding: 14px;">
                <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="clearPhoneDialog = true">清除手机号</el-button>
                </div>
            </div>
        </el-card>
        <!-- 清楚手机号弹框 -->
        <el-dialog title="清除手机号成为一个未注册的会员" :visible.sync="clearPhoneDialog" width="40%">
            <el-form
                    :model="toolForm"
                    status-icon
                    label-width="80px">
                <el-form-item label="手机号" prop="phone_num">
                    <el-input v-model="toolForm.phone" placeholder="请输入手机号" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitPhone">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {deletePhone} from '../../../request/api.js'
    import axios from "axios"

    export default {
        name: "ClearPhoneTool",
        data() {
            return {
                toolForm: {
                    phone: ""
                },//工具表单
                clearPhoneDialog: false,
            }
        },
        methods: {
            //提交表单
            submitPhone() {
                deletePhone(this.toolForm).then(res => {
                    this.$message({
                        message: res["data"]["message"],
                        type: 'success'
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .el-icon-star-on {
        font-size: 40px;
        width: 100%;
        text-align: center;
    }

    .button {
        width: 100%;
        text-align: center;
    }
</style>
