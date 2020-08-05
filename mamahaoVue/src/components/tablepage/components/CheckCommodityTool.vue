<template>
    <div>
        <el-card>
            <i class="el-icon-star-on"></i>
            <div style="padding: 14px;">
                <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="checkDialog = true">商品搜不到原因</el-button>
                </div>
            </div>
        </el-card>
        <!--确认商品为啥搜不到弹框-->
        <el-dialog title="确认商品为啥搜不到" :visible.sync="checkDialog" width="50%">
            <el-form
                    ref="styleForm"
                    :model="styleForm"
                    status-icon
                    label-width="120px">
                <el-form-item prop="env" label="选择环境">
                    <el-select v-model="env" placeholder="请选择环境" clearable>
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="styleNumId" label="styleNumId">
                    <el-input v-model="styleForm.styleNumId" placeholder="请输入styleNumId" clearable></el-input>
                </el-form-item>
                <el-form-item prop="shopId" label="shopId">
                    <el-input v-model="styleForm.shopId" placeholder="请输入shopId" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitStyle">确定</el-button>
                    </el-form-item>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--运行结果弹框-->
        <el-dialog
                title="运行结果"
                :visible.sync="styleDialog"
                width="30%">
            <json-viewer
                    :value="result"
                    :expand-depth=5
                    copyable
                    boxed></json-viewer>
        </el-dialog>
    </div>
</template>

<script>
    import {checkStyle} from '../../../request/api.js'
    import JsonViewer from 'vue-json-viewer'

    export default {
        name: "CheckCommodityTool",
        components: {JsonViewer},
        data() {
            return {
                styleForm: {},//确认商品为啥搜索不到表单
                styleDialog: false,
                checkDialog: false,
                result: {},
                env: '测试',
                options: [{
                    value: '线上',
                    label: '线上'
                }, {
                    value: '测试',
                    label: '测试'
                },]
            }
        },
        methods: {
            submitStyle() {
                let query = this.styleForm
                checkStyle(query).then(res => {
                    this.checkDialog = false
                    this.styleDialog = true
                    this.result = res["data"]
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
