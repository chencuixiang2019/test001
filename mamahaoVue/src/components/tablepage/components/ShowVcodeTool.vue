<template>
    <div>
        <!-- 列表 -->
        <div style="margin-top: 40px">
            <h3 style="color: #8c939d">手机号验证码工具（默认最近10条,
                <el-button @click="getVcodeList" type="text" style="font-size: 20px">刷新验证码</el-button>
                ）：
            </h3>
            <el-table
                    :data="vcodeList"
                    style="width: 100%"
                    border
                    tooltip-effect="dark"
                    highlight-current-row>
                <el-table-column
                        prop="mobile"
                        label="手机号码">
                </el-table-column>
                <el-table-column
                        prop="content"
                        label="内容">
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="发送时间">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>

    import {getVcode} from '../../../request/api.js'

    export default {
        name: "ShowVcodeTool",
        data() {
            return {
                vcodeList: [],//验证码列表数据
            }
        },
        created() {
            this.getVcodeList()
        },
        methods: {
            getVcodeList() {
                let query = {}
                getVcode(query).then(res => {
                    this.$message({
                        message: res["data"]["message"],
                        type: 'success'
                    })
                    this.vcodeList = eval(res["data"]["data"])
                })
            }
        }
    }
</script>

<style scoped>

</style>
