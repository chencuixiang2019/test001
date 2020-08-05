<template>
    <div>
        <div id="topLayout">
            <div class="topLayout_details" style="background-color: #756082;">
                <div class="span1">
                    <span class="span2">{{this.all_tota}}</span>
                </div>
                <div class="topLayout_details_1">
                    全部用例
                </div>
            </div>
            <div class="topLayout_details" style="background-color: #f6c6a3">
                <div class="span1">
                    <span class="span2">{{this.case_total}}</span>
                </div>
                <div class="topLayout_details_1">
                    当前执行用例
                </div>
            </div>
            <div class="topLayout_details" style="background-color: #6ebdf3">
                <div class="span1">
                    <span class="span2">{{this.successs_case}}</span>
                </div>
                <div class="topLayout_details_1">
                    当前成功用例
                </div>
            </div>
            <div class="topLayout_details" style="background-color: #f39589">
                <div class="span1">
                    <span class="span2">{{this.fail_case}}</span>
                </div>
                <div class="topLayout_details_1">
                    当前失败用例
                </div>
            </div>
        </div>

        <div id="rightLayout">
            <div id="fontThis">
                当前执行测试计划
            </div>
            <el-table
                    :data="tableData"
                    height="288"
                    style="width: 100%;"
                    highlight-current-row
                    @current-change="choiceResult"
            >
                <el-table-column
                        prop="fields.execution_progress"
                        label="进度"
                        width="100px"
                >
                </el-table-column>
                <el-table-column
                        prop="fields.plan_name"
                        label="执行名称"
                        width="200px">
                </el-table-column>
                <el-table-column

                        label="执行状态"
                        width="100px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.fields.execution_state=='1'" style="color: #8c939d">尚未执行</span>
                        <span v-if="scope.row.fields.execution_state=='2'" style="color: #6ebdf3">待执行</span>
                        <span v-if="scope.row.fields.execution_state=='3'" style="color: #5E5694">执行中</span>
                        <span v-if="scope.row.fields.execution_state=='4'" style="color: #599d6b">执行结束</span>
                        <span v-if="scope.row.fields.execution_state=='5'" style="color: red">执行失败</span>
                    </template>
                </el-table-column>

            </el-table>
        </div>

        <div style="float: left;width:70%;margin-top:20px">
            <el-tabs v-model="activeName">
                <el-tab-pane label="用例执行近况" name="first">
                    <div>
                        <tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="当前计划详情" name="second">
                    <!--筛选条件-->
                    <div>
                        <el-row class="operate">
                            <el-col :span="24">
                                <el-form :inline="true" :model="testPlan" style="margin-top: 10px; ">
                                    <el-form-item label="测试名称" style="width: auto">
                                        <el-input v-model="testPlan.case_name" placeholder="支持模糊搜索"
                                                  style="width: 150px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="成功失败" style="width: auto">
                                        <el-select v-model="testPlan.request_code" placeholder="选择请求方式"
                                                   style="width: 150px;">
                                            <el-option label="全部" value=""></el-option>
                                            <el-option label="成功" value="success"></el-option>
                                            <el-option label="失败" value="fail"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item style="width: auto">
                                        <el-button type="primary" @click.native="getCaseMychoise()">查询</el-button>
                                        <el-button type="warning" @click.native="getCaseMychoise(1)">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                    </div>
                    <!--列表页-->
                    <div style="margin-top: 10px">
                        <el-table
                                :data="testData"
                                style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="接口类型:">
                                            <span>{{ props.row.fields.dataType }}</span>
                                        </el-form-item>
                                        <el-form-item label="请求方式:">
                                            <span style="color: #9d7539">{{ props.row.fields.request_mode }}</span>
                                        </el-form-item>
                                        <el-form-item label="关联接口:">
                                            <span>{{ props.row.fields.request_other_type }}</span>
                                        </el-form-item>
                                        <el-form-item label="其他用例:">
                                            <span>{{ props.row.fields.otherCaseid }}</span>
                                        </el-form-item>
                                        <el-form-item label="断言判断:">
                                            <div style="width:500px">
                                                <json-viewer
                                                        :value='JSON.parse(props.row.fields.request_response)'
                                                        :expand-depth=100
                                                        copyable
                                                        boxed>
                                                </json-viewer>
                                            </div>
                                        </el-form-item>
                                        <el-form-item label="接口返回:">
                                            <div style="width:500px">
                                                <json-viewer
                                                        :value='JSON.parse(props.row.fields.request_result_Assertion_content)'
                                                        :expand-depth=10
                                                        copyable
                                                        boxed
                                                ></json-viewer>
                                            </div>
                                        </el-form-item>
                                        <el-form-item label="备注:">
                                            <span>{{ props.row.fields.remark }}</span>
                                        </el-form-item>
                                        <el-form-item label="" style="margin-left: 90%">
                                            <el-button type="success" size="mini" round
                                                       @click="Entrydetails(props.row.fields.case_request_id,props.row.pk)">
                                                进入详情
                                            </el-button>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="#ID"
                                    prop="pk" width="100">
                            </el-table-column>
                            <el-table-column
                                    label="用例名称"
                                    prop="fields.case_name">
                            </el-table-column>
                            <el-table-column
                                    label="接口地址"
                                    prop="fields.request_address">
                            </el-table-column>
                            <el-table-column
                                    label="状态"
                                    width="100"
                            >
                                <template slot-scope="scope">
                                    <span v-if="scope.row.fields.request_code == 'success'"
                                          style="color: #00a854">成功</span>
                                    <span v-else-if="scope.row.fields.request_code == 'fail'"
                                          style="color: red">失败</span>
                                    <span v-else style="color: #a4da89">跳过</span>
                                </template>
                            </el-table-column>

                        </el-table>

                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

    </div>


</template>

<script>
    import tendency from '../ReportMamahao/tendency'
    import {getReportPlan, getReportCase} from "../../request/api.js";

    export default {
        name: "ReportMamahao",
        data() {
            return {
                successs_case: "",
                fail_case: "",
                case_total: "",
                all_tota: "",
                caseid: "",
                testPlan: {
                    case_name: "",
                    request_code: ""
                },
                activeName: "first",
                tableData: [],
                sevenDay: [],
                sevenDate: [],
                testData: [],
            }

        },
        components: {
            tendency,
        },
        methods: {
            getReportPlanOBJ() {
                getReportPlan().then(response => {
                        var result = response["data"]
                        if (result["code"] == 200) {
                            this.tableData = result["data"]
                            let fields = result["data"][0]["fields"]
                            this.successs_case = fields['successs_case']
                            this.fail_case = fields['fail_case']
                            this.case_total = fields['case_total']
                            this.all_tota = result["result"]
                            var sevenDay = new Array();
                            var successssevenDate = new Array();
                            var failssevenDate = new Array();
                            var spiksevenDate = new Array();
                            var sevenDate = new Array();
                            for (var i = 0; i < result["ReportResul"].length; i++) {
                                let fieldsTwo = result["ReportResul"][i]["fields"]["updata_time"]
                                sevenDay.push(fieldsTwo)//存储时间
                                let successs_caseList = result["ReportResul"][i]["fields"]["successs_case"]
                                successssevenDate.push(successs_caseList)//存储成功用例
                                let spik_caseList = result["ReportResul"][i]["fields"]["skip_case"]
                                spiksevenDate.push(spik_caseList)//存储跳过用例
                                let fail_caseList = result["ReportResul"][i]["fields"]["fail_case"]
                                failssevenDate.push(fail_caseList)//存储失败用例
                            }
                            sevenDate.push(successssevenDate, spiksevenDate, failssevenDate)
                            this.sevenDay = sevenDay
                            this.sevenDate = sevenDate
                            var pragma = JSON.stringify({
                                id: result["data"][0]["pk"],
                                case_name: this.testPlan.case_name,
                                request_code: this.testPlan.request_code,
                                }
                            )
                            getReportCase(pragma).then(response => {
                                let resultReportCase = response["data"]
                                if (resultReportCase["code"] == 200) {
                                    this.testData = resultReportCase["data"]
                                    this.caseid = result["data"][0]["pk"]
                                }
                            })
                        }

                    }
                )
            },
            choiceResult(value) {
                var result = this.tableData
                for (var i = 0; i < result.length; i++) {
                    if (value.pk == result[i].pk) {
                        var fields = result[i]["fields"]
                        this.successs_case = fields["successs_case"]//成功用例
                        this.fail_case = fields["fail_case"]//失败用例
                        this.case_total = fields["case_total"]//当前全部用例
                        this.testPlan.case_name = "",
                            this.testPlan.request_code = ""
                        var pragma = JSON.stringify({
                            id: result[i].pk,
                            case_name: "",
                            request_code: "",
                            }
                        )
                        getReportCase(pragma).then(response => {
                            let resultReportCase = response["data"]
                            if (resultReportCase["code"] == 200) {
                                this.testData = resultReportCase["data"]

                            }
                        })
                        this.caseid = result[i].pk
                    }
                }
            },
            Entrydetails(request_id, case_request_id) {
                this.$router.push({name: 'addCase', params: {id: request_id, case_id: case_request_id}})
            },
            getCaseMychoise(vardata) {
                if (vardata == 1) {
                    this.testPlan.case_name = ""
                    this.testPlan.request_code = ""
                }
                var pragma = JSON.stringify({
                        id: this.caseid,
                        case_name: this.testPlan.case_name,
                        request_code: this.testPlan.request_code,
                    }
                )
                getReportCase(pragma).then(response => {
                    let resultReportCase = response["data"]
                    if (resultReportCase["code"] == 200) {
                        this.testData = resultReportCase["data"]
                    }
                })
            }
        },

        mounted: function () {
            this.getReportPlanOBJ()
        },

    }
</script>

<style scoped>

    h2 {
        text-align: center;
        padding: 30px;
        font-size: 18px;
    }

    .topLayout_details {
        float: left;
        margin-top: 5px;
        margin-left: 10px;
        width: 150px;
        height: 80px;
        border: 1px solid #32484d;

    }

    .span2 {
        color: #fbfffd;
    }

    #rightLayout {
        float: right;
        /*border: 1px solid #2A3331;*/
        width: 400px;
        height: 325px;
        margin: 0 auto;
        background-color: rgba(121, 121, 123, 0.69);
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    }

    .topLayout_details_1 {
        /*margin-top: 1px;*/
        height: 20px;
        text-align: center;
        background-color: #79797b;
        color: #fdfcf9;

    }

    .span1 {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        font-size: 53px;
        text-align: center;
        margin: auto;

    }

    #topLayout {
        float: left;
        width: 70%;
        height: 100px;
        /*border: 1px solid red;*/
        margin: 0 auto;
    }

    #fontThis {
        margin-top: 5px;
        margin-bottom: 5px;
        margin-left: 10px;
        color: #4b4b4b;
        font-weight: bold;
        font-size: 15px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand {


    }

    .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>
