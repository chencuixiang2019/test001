<template>
    <div>
        <el-row class="operate">
            <el-col :span="24">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 10px">
                    <el-button type="primary" plain @click.native="dialogFormVisible = true" style="margin-right: 30px">
                        新增接口
                    </el-button>
                    <el-form-item label="接口名称">
                        <el-input v-model="formInline.queryrequest_name" placeholder="支持模糊搜索"
                                  style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="接口地址">
                        <el-input v-model="formInline.queryrequest_address" placeholder="支持模糊搜索"
                                  style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="请求方式">
                        <el-select v-model="formInline.queryrequest_mode" placeholder="选择请求方式" style="width: 150px">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="POST" value="POST"></el-option>
                            <el-option label="GET" value="GET"></el-option>
                            <el-option label="PUT" value="PUT"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getInterfaceList">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-dialog title="新增接口管理内容" :visible.sync="dialogFormVisible" width="700px">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item label="接口名称：" prop="request_name">
                    <el-input v-model="form.request_name" autocomplete="off" style="width: 500px"></el-input>
                </el-form-item>
                <el-form-item label="接口地址：" prop="request_address">
                    <el-input v-model="form.request_address" autocomplete="off" style="width: 500px"></el-input>
                </el-form-item>
                <el-form-item label="请求方式：" prop="request_mode">
                    <el-select v-model="form.request_mode" placeholder="请选择请求方式" autocomplete="off"
                               style="width: 200px">
                        <el-option label="POST" value="POST"></el-option>
                        <el-option label="GET" value="GET"></el-option>
                        <el-option label="PUT" value="PUT"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备------注：">
                    <el-input v-model="form.remake" autocomplete="off" style="width: 500px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onsbmit('form')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改接口内容" :visible.sync="updateInterface" width="700px">
            <el-form ref="interfaceUpdateform" :model="interfaceUpdateform" :rules="rules">
                <el-form-item label="接口名称：" prop="request_name">
                    <el-input v-model="interfaceUpdateform.request_name" autocomplete="off"
                              style="width: 500px"></el-input>
                </el-form-item>
                <el-form-item label="接口地址：" prop="request_address">
                    <el-input v-model="interfaceUpdateform.request_address" autocomplete="off"
                              style="width: 500px"></el-input>
                </el-form-item>
                <el-form-item label="请求方式：" prop="request_mode">
                    <el-select v-model="interfaceUpdateform.request_mode" placeholder="请选择请求方式" autocomplete="off"
                               style="width: 200px">
                        <el-option label="POST" value="POST"></el-option>
                        <el-option label="GET" value="GET"></el-option>
                        <el-option label="PUT" value="PUT"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备------注：">
                    <el-input v-model="interfaceUpdateform.remake" autocomplete="off" style="width: 500px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateInterface = false">取 消</el-button>
                <el-button type="primary" @click.once="updatesbmit('interfaceUpdateform')">确 定</el-button>
            </div>
        </el-dialog>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column label="接口名称">
                <template slot-scope="scope">
                    <span style="margin-left: 10px ;color: #4F4F4F">{{  scope.row.fields.request_name}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="tag"
                    label="请求方式"
                    width="100"
                    filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.fields.request_mode === 'GET' ? 'primary' : 'success'"
                            disable-transitions>{{ scope.row.fields.request_mode}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="接口地址">
                <template slot-scope="scope">
                    <span style="margin-left: 10px ;color: #8B8970">{{  scope.row.fields.request_address}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="修改日期"
                    width="200"
            >
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>创建日期: {{ scope.row.fields.creat_time }}</p>
                        <p>修改日期: {{ scope.row.fields.updata_time }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{scope.row.fields.updata_time }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="备注信息">
                <template slot-scope="scope">
                    <i class="el-icon-chat-line-square"></i>
                    <span style="margin-left: 10px">{{  scope.row.fields.remark }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="320">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="getCase(scope.row.pk)">查看用例
                    </el-button>
                    <el-button
                            size="mini"
                            type="success"
                            @click.native="handleEdit(scope.row.pk,scope.row.fields.request_name,scope.row.fields.request_address,scope.row.fields.request_mode,scope.row.fields.remark)">
                        编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.pk)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[10, 30, 50, 100]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :hide-on-single-page="value"
                    :total="gourpCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {addInterface, getInterface, updateInterfaceObj, deleteInterfaceObj} from "../../request/api.js";
    import {Message} from 'element-ui'
    import router from '../../router/index'

    export default {
        inject: ['reload'],
        name: "InterfaceManagementList",
        data() {
            return {
                request_group_id: this.$route.params.id,
                dialogFormVisible: false,
                updateInterface: false,
                form: {
                    request_name: '',
                    remake: '',
                    request_address: '',
                    request_mode: '',
                },
                interfaceUpdateform: {
                    request_name: '',
                    remake: '',
                    request_address: '',
                    request_mode: '',
                },
                formInline: {
                    queryrequest_name: '',
                    queryrequest_address: '',
                    queryrequest_mode: "",
                },
                rules: {
                    request_name: [
                        {required: true, message: '请输入接口名称', trigger: 'blur'},
                        {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'}
                    ],
                    request_address: [
                        {required: true, message: '请输入地址', trigger: 'blur'},

                    ],
                    request_mode: [
                        {required: true, message: '请选择方式类型', trigger: 'blur'},
                    ],
                },
                tableData: [],
                value: false,
                pageNum: 1,
                pageSize: 10,
                gourpCount: 0,
                index: ""
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val
                this.getInterfaceList()

            },
            handleCurrentChange(val) {
                this.pageNum = val
                this.getInterfaceList()
            },
            handleEdit(index, request_name, request_address, request_mode, remake) {//修改分组信息
                this.updateInterface = true
                this.interfaceUpdateform.request_name = request_name
                this.interfaceUpdateform.request_address = request_address
                this.interfaceUpdateform.request_mode = request_mode
                this.interfaceUpdateform.remake = remake
                this.index = index
            },
            handleDelete(Interfaceid) {
                var pragma = {
                    data: JSON.stringify(
                        {
                            id: Interfaceid,
                        }
                    )
                }
                console.log(pragma);
                this.$confirm('操作删除前，请确认接口内是否有用例, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteInterfaceObj(pragma).then(reponse => {
                        reponse = reponse["data"]
                        if (reponse["code"] == 200) {
                            Message.success("删除分组成功")
                            this.reload()
                        }
                        if (reponse["code"] == 500 | reponse["code"] == 201) {
                            Message.error(reponse["msg"])
                        }
                    }, 200)

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            getCase(index) {
                console.log(index);
                this.$router.push({name: 'testCaseAction', params: {id: index}})
            },
            updatesbmit(interfaceUpdateform) {
                var pragma = {
                    data: JSON.stringify(
                        {
                            request_name: this.interfaceUpdateform.request_name,
                            request_address: this.interfaceUpdateform.request_address,
                            request_mode: this.interfaceUpdateform.request_mode,
                            remark: this.interfaceUpdateform.remake,
                            interfaceid: this.index,
                        }
                    )
                }
                console.log(pragma)
                this.$refs[interfaceUpdateform].validate((valid) => {
                    if (valid) {
                        updateInterfaceObj(pragma).then(reponse => {
                            var result = reponse.data
                            if (result["code"] == 200) {
                                Message.success("修改成功")
                                setTimeout(() => {
                                    this.reload()
                                }, 500)
                            }
                            if (result["code"] == 201) {
                                Message.error("缺少参数,请退回到上一页重新进入")
                            }
                            if (result["code"] == 500) {
                                Message.error("系统异常，请联系管理员，或者重新登录")
                            }
                        })
                    } else {
                        Message.error("请确认表单正确后，在进行提交")
                        return false;
                    }
                });

            },

            getInterfaceList() {
                var pragma = {
                    data: JSON.stringify(
                        {
                            request_group_id: this.request_group_id,
                            pageNum: this.pageNum,
                            pageSize: this.pageSize,
                            request_name: this.formInline.queryrequest_name,
                            request_address: this.formInline.queryrequest_address,
                            request_mode: this.formInline.queryrequest_mode,
                        }
                    )
                }
                console.log("pragma:", pragma)
                getInterface(pragma).then((response) => {
                    var result = response["data"]
                    if (result["code"] == 200) {
                        this.tableData = result["data"]
                        this.gourpCount = result["gourpCount"]
                        this.pageNum = result["pageNum"]
                        this.pageSize = result["pageSize"]
                        console.log(this.pageSize)
                    }
                })
            },
            onsbmit(form) {
                var pragma = {
                    data: JSON.stringify(
                        {
                            request_mode: this.form.request_mode,
                            request_name: this.form.request_name,
                            request_address: this.form.request_address,
                            remark: this.form.remake,
                            request_group_id: this.request_group_id,
                        }
                    )
                }
                console.log(pragma)
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        addInterface(pragma).then(reponse => {

                            var result = reponse.data
                            if (result["code"] == 200) {
                                Message.success("分组新增成功")
                                this.reload()

                            }
                            if (result["code"] == 201) {
                                Message.error("缺少参数,请退回到上一页重新进入")
                            }
                            if (result["code"] == 500) {
                                Message.error("系统异常，请联系管理员，或者重新登录")
                            }
                        })
                    } else {
                        Message.error("请确认表单正确后，在进行提交")
                        return false;
                    }

                });

            },


        },
        mounted: function () {
            this.getInterfaceList()
        },
    }
</script>
<style scoped>
    .operate {
        padding-bottom: 10px;
    }

</style>
