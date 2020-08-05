<template>

  <el-container>
    <el-header>
      <div class="font">基础信息：</div>
      <el-row :gutter="5" class="mian">
        <el-col :span="10" :offset="6">
          <div class="grid-content bg-purple">
            <el-table
              :data="tableData"
              :show-header="false"
              :span-method="objectSpanMethod"
              border
              style="width: 100%;">
              <el-table-column
                :rowspan="2"
              >
                <span>接口信息</span>
              </el-table-column>
              <el-table-column
                prop="date"
              >
              </el-table-column>
              <el-table-column
                prop="name"
              >
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </el-header>

      <div>
    <el-header>
      <div class="font" style="margin-top:12%">前置条件：</div>
      <el-row :gutter="5" class="mian">
        <el-col :span="20" :offset="2">
          <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic"
                   style="margin-top: 20px">
            <el-form-item label="头部取值：">
              <el-form-item
                style="margin-bottom: 20px;margin-left: 20px"
                v-for="(headerData, index) in dynamicValidateForm.headerData"
                :label="'取值' + index"
                :key="headerData.key"
              >
                <el-input v-model="headerData.headerName" style="width: 300px;"></el-input>
                键值：
                <el-select v-model="headerData.headerValues" clearable placeholder="请选择" style="width: 300px;">
                  <el-option label="不进行选择" value=""></el-option>
                  <el-option
                    v-for="item in herdersList"
                    :key="item.pk"
                    :label="item.fields.headrsName"
                    :value="item.pk"
                  >
                  </el-option>
                </el-select>
                <el-button @click="addHerder" type="success">增加</el-button>
                  <el-button @click="refreshHerder(headerData.headerValues)" type="warning">刷新</el-button>
                <el-button @click.prevent="removeHerder(headerData)" type="danger" v-show="index>0">删除</el-button>
              </el-form-item>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-header>
      </div>

      <el-main style="margin-top:3%">

      <div class="font">请求参数设置：</div>
      <el-row :gutter="5" class="mian">
        <el-col :span="20" :offset="2">
          <div class="grid-content bg-purple">
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
              <el-form-item
                style="margin-top: 20px"
                prop="case_name"
                label="用例名称："
                :rules="[
                      { required: true, message: '测试用例不能为空', trigger: 'blur' },
                     {min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur'}
                    ]"
              >
                <el-input v-model="dynamicValidateForm.case_name" style="width: 300px;"></el-input>
              </el-form-item>

              <el-form-item label="数据类型："
                            prop="dataType"
                            :rules="[
                      { required: true, message: '数据类型不能为空', trigger: 'blur' },
                    ]"
              >
                <el-select v-model="dynamicValidateForm.dataType" placeholder="请选择数据类型" style="width: 300px;">
                  <el-option label="data" value="data"></el-option>
                  <el-option label="body" value="json"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="需要其他接口？："
                            label-width="30"
                            v-model="dynamicValidateForm.request_other_type"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-value="100"
                            inactive-value="0"
              >
                <el-switch v-model="dynamicValidateForm.request_other_type"></el-switch>
              </el-form-item>

              <div v-if="this.dynamicValidateForm.request_other_type==true">
                <template>
                  <el-tabs v-model="activeName" @tab-click="handleClick" style="width: 1100px">
                    <el-tab-pane label="关联接口" name="first">
                      <div v-for="(item, index) in dynamicValidateForm.request_relation_content" :key="index"
                           style="border:1px solid #9D9D9D; padding:20px; margin-bottom: 10px">
                        <el-form-item
                          label="接口名称："
                          :prop="'request_relation_content.' + index + '.name'"
                        >
                          <el-input v-model="item.name" style="width:400px"></el-input>
                        </el-form-item>
                        <el-form-item label="数据类型："
                                      :prop="'request_relation_content.' + index + '.name'"
                        >
                          <el-select v-model="item.dataType" placeholder="请选择数据类型" style="width: 400px;">
                            <el-option label="data" value="data"></el-option>
                            <el-option label="body" value="json"></el-option>
                          </el-select>
                        </el-form-item>

                        <el-form-item
                          label="接口地址："
                          :prop="'request_relation_content.' + index + '.name'"

                        >
                          <el-select v-model="item.httpUrl" style="width: 100px;">
                            <el-option label="http://" value="http://"></el-option>
                            <el-option label="https://" value="https://"></el-option>
                          </el-select>
                          <el-select v-model="item.defaultUrl" style="width: 120px;">
                            <el-option label="自定义" value="customUrl"></el-option>
                            <el-option label="跟随项目" :value='1'></el-option>
                            <el-option label="跟随项目环境1" :value='2'></el-option>
                            <el-option label="跟随项目环境2" :value='3'></el-option>
                          </el-select>
                          <el-input v-model="item.url" style="width:500px"></el-input>
                        </el-form-item>
                        <el-form-item
                          label="头部信息："
                          :prop="'request_relation_content.' + index + '.name'"
                        >
                          <el-input v-model="item.header" style="width:400px"></el-input>
                        </el-form-item>

                        <el-form-item
                          label="请求方式："
                          :prop="'request_relation_content.' + index + '.name'"
                        >
                          <el-select v-model="item.mode" placeholder="选择请求方式" style="width: 400px">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="POST" value="POST"></el-option>
                            <el-option label="GET" value="GET"></el-option>
                            <el-option label="PUT" value="PUT"></el-option>
                          </el-select>

                        </el-form-item>
                        <el-form-item label="请求入参：">
                          <el-form-item
                            style="margin-bottom: 20px"
                            v-model="item.content"
                            v-for="(content, index) in  item.content "
                            :label="'参数' + index"
                            :key="content.key"
                          >
                            <el-input v-model="content.parameter" style="width: 300px;"></el-input>
                            ：
                            <el-input v-model="content.value1" style="width: 300px;"></el-input>
                            <i class="el-icon-plus" @click.prevent="addparameter(item)"
                               style="margin-left: 12px;cursor:pointer;"></i>
                            <i class="el-icon-delete" @click.prevent="removeparameter(item,content)" v-show="index>0"
                               style="margin-left: 12px;cursor:pointer;"></i>
                          </el-form-item>
                        </el-form-item>

                        <el-form-item label="关联取值：">
                          <el-form-item
                            style="margin-bottom: 20px"
                            v-model="item.conclusionValue"
                            v-for="(conclusionValue, index) in  item.conclusionValue "
                            :label="'value：' + index"
                            :key="conclusionValue.key"
                          >
                            <el-input v-model="conclusionValue.clvaue" style="width:200px"></el-input>
                            <el-select v-model="conclusionValue.num" placeholder="请选择参数顺序" style="width: 100px">
                              <el-option label="请选择" value=""></el-option>
                              <el-option v-for="i in 30" :key="i" :label="i" :value="i-1"
                              ></el-option>
                            </el-select>

                            <el-popover
                              placement="top-start"
                              width="400"
                              trigger="click"

                            >
                              <span>{{reusltname}}</span>
                              <i class="el-icon-search" slot="reference"
                                 style="margin-left: 12px;cursor:pointer;"
                                 @click.prevent="getpoint(conclusionValue.clvaue)"></i>
                            </el-popover>
                            <i class="el-icon-plus" @click.prevent="addconclusionValue(item)"
                               style="margin-left: 12px;cursor:pointer;"></i>
                            <i class="el-icon-delete" @click.prevent="removeconclusionValue(item,conclusionValue)"
                               v-show="index>0"
                               style="margin-left: 12px;cursor:pointer;"></i>
                          </el-form-item>
                        </el-form-item>

                        <el-form-item style="margin-left: 80%;width: 200px;color: #9D9D9D ;text-align:right">
                          <span>当前第{{index+1}}个接口</span>
                          <input hidden v-model="item.Indexes=index+1"></input>
                          <el-button @click.prevent="deleteItem(item, index)" type="danger" v-show="index>0">删除关联接口
                          </el-button>
                        </el-form-item>
                      </div>
                      <div v-if="this.dynamicValidateForm.request_other_type==true"
                           style="margin-left: 69%;width: 400px;">
                        <el-form-item>
                          <el-button @click="Checkpoint" type="success">接口检查点</el-button>
                          <el-button @click="addItem" type="primary">增加关联接口</el-button>
                        </el-form-item>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="关联用例" name="second">
                      <div style="border:1px solid #9D9D9D; padding:20px; margin-bottom: 10px">
                        <el-select v-model="pro_id" clearable placeholder="请选择">
                          <el-option
                            @click.native="getAllCase1(1)"
                            v-for="item in project_request_list"
                            :key="item.pk"
                            :label="item.fields.pj_name"
                            :value="item.pk"
                          >
                          </el-option>
                        </el-select>
                        <el-select v-model="groupid" clearable placeholder="请选择">
                          <el-option
                            @click.native="getAllCase1(2)"
                            v-for="item in gerouplist"
                            :key="item.pk"
                            :label="item.fields.group_name"
                            :value="item.pk">
                          </el-option>
                        </el-select>
                        <el-select v-model="requestid" clearable placeholder="请选择">
                          <el-option
                            @click.native="getAllCase1(3)"
                            v-for="item in requstlist"
                            :key="item.pk"
                            :label="item.fields.request_name"
                            :value="item.pk">
                          </el-option>
                        </el-select>
                        <el-select v-model="dynamicValidateForm.caseid" clearable placeholder="请选择">
                          <el-option
                            @click.native="getAllCase1()"
                            v-for="item in caselist"
                            :key="item.pk"
                            :label="item.fields.case_name"
                            :value="item.pk">
                          </el-option>
                        </el-select>

                        <template>
                          <el-form-item
                            label="用例--取值："
                            label-width="300"
                            style="margin-top: 20px"
                          >
                            <el-input v-model="dynamicValidateForm.caseidConclusionValue"
                                      style="width:200px"></el-input>
                          </el-form-item>
                        </template>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </template>
              </div>

              <el-form-item label="前置使用SQL？："
                            label-width="30"
                            v-model="dynamicValidateForm.sqlTrueFlasetype"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-value="100"
                            inactive-value="0"
              >
                <el-switch v-model="dynamicValidateForm.sqlTrueFlasetype"></el-switch>
              </el-form-item>

              <div v-if="this.dynamicValidateForm.sqlTrueFlasetype==true">
                <el-form-item label="SQL：">
                  <el-form-item label="">
                    <el-form-item
                      style="margin-bottom: 20px;margin-left: 20px"
                      label="选择库："
                    >
                      <el-select v-model="dynamicValidateForm.sqlChoice" style="width: 300px;" placeholder="请选择数据库">
                        <el-option
                          v-for="item in testdbaList"
                          :key="item.id"
                          :label="item.host"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form-item>

                  <el-form-item style="margin-left: 20px" label="输入SQL">
                    <el-input v-model="dynamicValidateForm.SQLinput" style="width: 300px;"></el-input>

                    <el-popover placement="top" width="400" trigger="click">
                      <div>
                        <pre style="max-height: 300px;overflow:auto;margin-bottom: 20px">{{this.formatSql}}</pre>
                        <span
                          style="color: #CC3434;margin-top: 50px">提取数据：[{{this.dynamicValidateForm.SQLMomentum}}]</span>
                        <div style="float: right;margin-top: 20px">
                          <el-button @click.native="getTestSQLfrom()"> 运行SQL</el-button>
                        </div>
                      </div>
                      <el-button slot="reference" @click="formatSQL(dynamicValidateForm.SQLinput)">查看SQL
                      </el-button>
                    </el-popover>
                  </el-form-item>
                </el-form-item>
                <el-form-item label="">
                  <el-form-item
                    style="margin-left: 20px"
                    label="sql动量参数"
                  >
                    <el-input v-model="dynamicValidateForm.SQLMomentum" style="width: 300px;"></el-input>
                  </el-form-item>
                </el-form-item>

                <el-form-item label="">
                  <el-form-item
                    style="margin-bottom: 20px;margin-left: 20px"
                    v-for="(sqlClusionValue, index) in dynamicValidateForm.sqlClusionValue"
                    :label="'取下标' + index"
                    :key="sqlClusionValue.key"
                  >
                    <el-input v-model="sqlClusionValue.sqlKey" style="width: 300px;"></el-input>

                    <el-button @click="addsql" type="success">增加</el-button>
                    <el-button @click.prevent="removesql(sqlClusionValue)" type="danger" v-show="index>0">删除</el-button>

                  </el-form-item>
                </el-form-item>
              </div>
              <el-form-item
                style="margin-top: 20px"
                prop="headers"
                label="头部信息："
              >
                <el-form-item
                  style="margin-bottom: 20px;margin-left: 20px"
                  label="输入："
                >
                  <el-input v-model="dynamicValidateForm.headers" style="width: 300px;"></el-input>
                </el-form-item>
              </el-form-item>

              <el-form-item label="入参数据：">
                <el-form-item
                  style="margin-bottom: 20px;margin-left: 20px"
                  v-for="(domain, index) in dynamicValidateForm.domains"
                  :label="'入参' + index"
                  :key="domain.key"
                >
                  <el-input v-model="domain.keynew" style="width: 300px;"></el-input>
                  键值：
                  <el-input v-model="domain.value" style="width: 300px;"></el-input>
                  <el-button @click="addDomain" type="success">增加</el-button>
                  <el-button @click.prevent="removeDomain(domain)" type="danger" v-show="index>0">删除</el-button>
                </el-form-item>
              </el-form-item>
              <!--断言-->


              <el-form-item label="后置使用SQL？："
                            label-width="30"
                            v-model="dynamicValidateForm.sqlTrueFlasetypeLast"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-value="100"
                            inactive-value="0"
              >
                <el-switch v-model="dynamicValidateForm.sqlTrueFlasetypeLast"></el-switch>
              </el-form-item>

              <div v-if="this.dynamicValidateForm.sqlTrueFlasetypeLast==true">
                <el-form-item label="SQL：">
                  <el-form-item label="">
                    <el-form-item
                      style="margin-bottom: 20px;margin-left: 20px"
                      label="选择库："
                    >
                      <el-select v-model="dynamicValidateForm.sqlChoiceLast" style="width: 300px;" placeholder="请选择数据库">
                        <el-option
                          v-for="item in testdbaList"
                          :key="item.id"
                          :label="item.host"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form-item>

                  <el-form-item style="margin-left: 20px" label="输入SQL">
                    <el-input v-model="dynamicValidateForm.SQLinputLast" style="width: 300px;"></el-input>

                    <el-popover placement="top" width="400" trigger="click">
                      <div>
                        <pre style="max-height: 300px;overflow:auto;margin-bottom: 20px">{{this.formatSql}}</pre>
                        <span
                          style="color: #CC3434;margin-top: 50px">提取数据：[{{this.dynamicValidateForm.SQLMomentumLast}}]</span>
                        <div style="float: right;margin-top: 20px">
                          <el-button @click.native="getTestSQLfromLast()"> 运行SQL</el-button>
                        </div>
                      </div>
                      <el-button slot="reference" @click="formatSQL(dynamicValidateForm.SQLinputLast)">查看SQL
                      </el-button>
                    </el-popover>
                  </el-form-item>
                </el-form-item>
                <el-form-item label="">
                  <el-form-item
                    style="margin-left: 20px"
                    label="sql动量参数"
                  >
                    <el-input v-model="dynamicValidateForm.SQLMomentumLast" style="width: 300px;"></el-input>
                  </el-form-item>
                </el-form-item>

                <el-form-item label="">
                  <el-form-item
                    style="margin-bottom: 20px;margin-left: 20px"
                    v-for="(sqlClusionValueLast, index) in dynamicValidateForm.sqlClusionValueLast"
                    :label="'取下标' + index"
                    :key="sqlClusionValueLast.key"
                  >
                    <el-input v-model="sqlClusionValueLast.sqlKeyLast" style="width: 300px;"></el-input>

                    <el-button @click="addsqlLast" type="success">增加</el-button>
                    <el-button @click.prevent="removesqlLast(sqlClusionValueLast)" type="danger" v-show="index>0">删除
                    </el-button>

                  </el-form-item>
                </el-form-item>
              </div>


              <el-form-item label="断言数据：">
                <el-form-item
                  style="margin-bottom: 20px;margin-left: 20px"
                  v-for="(request_result, index1) in dynamicValidateForm.request_result"
                  :label="'键' + index1"
                  :key="request_result.key"
                >
                  <el-input v-model="request_result.keynew2" style="width: 300px;"></el-input>
                  <el-select v-model="request_result.keynew2Num" placeholder="请选择参数顺序" style="width: 100px">
                    <el-option label="请选择" value=""></el-option>
                    <el-option v-for="i in 30" :key="i" :label="i" :value="i-1"
                    ></el-option>
                  </el-select>
                  比值：
                  <el-input v-model="request_result.value2" style="width: 300px;"></el-input>

                  <el-button @click="addrequest_result" type="warning">增加</el-button>
                  <el-button @click.prevent="removerequest_result(request_result)" type="info" v-show="index1>0">删除
                  </el-button>
                </el-form-item>
              </el-form-item>

              <el-form-item style="margin-left: 20%">
                <el-button type="warning" @click="getcheckCaseALL">检查用例</el-button>
                <el-button type="success" @click="FinalAssertionResult">断言查看</el-button>
                <el-button type="primary" @click="submitForm('dynamicValidateForm')">保存</el-button>
                <el-button @click="resetForm()">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <div>
        <el-dialog
          title="检查请求结果"
          :visible.sync="Result"
          width="40%"
          :before-close="handleClose">
          <!--<pre style="overflow: auto;height: 420px;">{{this.jdata}}</pre>-->
          <json-viewer
            :value="jdata"
            :expand-depth=5
            copyable
            boxed
          ></json-viewer>
          <span slot="footer" class="dialog-footer">
              <span style="margin-right: 20px;color: #CC3434">提取数据：{{this.reuslt}}</span>
                <el-button type="primary" @click="Result = false">确 定</el-button>
            </span>
        </el-dialog>
      </div>

      <div>
        <el-dialog
          title="sql结果查询"
          :visible.sync="sqlResult"
          width="40%"
          :before-close="handleClose">
          <pre style="overflow: auto;height: 420px;">{{this.sqlResultTest}}</pre>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="sqlResult = false">确 定</el-button>
            </span>
        </el-dialog>
      </div>

      <div>
        <el-dialog
          title="最终用例接口结果查询"
          :visible.sync="totalResult"
          width="40%"
          :before-close="handleClose">
          <!--<pre style="overflow: auto;height: 420px;">{{this.finalResult}}</pre>-->
          <json-viewer
            :value="finalResult"
            :expand-depth=5
            copyable
            boxed
          ></json-viewer>

          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="totalResult = false">确 定</el-button>
            </span>
        </el-dialog>
      </div>
      <div>
        <el-dialog
          title="断言结果查询"
          :visible.sync="AssertionfT"
          width="40%"
          :before-close="handleClose">
          <!--<pre style="overflow: auto;height: 420px;">{{this.AssertionResult}}</pre>-->
          <json-viewer
            :value="AssertionResult"
            :expand-depth=5
            copyable
            boxed
          ></json-viewer>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="AssertionfT = false">确 定</el-button>
            </span>
        </el-dialog>
      </div>
    </el-main>
  </el-container>

</template>
<script>
  /* eslint-disable */
  import {
    getRequest,
    getAllCass,
    getcheckpoint,
    getcheckCase,
    getTestDB,
    getTestSQL,
    getHerders,
    AssertionCase,
    addCase,
    getOneCase,
      runNerPublicInterface,
  } from "../../request/api.js";
  import fmater from "../../js/sqlFormatter"
  import {Message} from 'element-ui'

  export default {
    inject: ['reload'],
    data() {
      return {
        herdersList: [],
        sqlResultTest: "",
        sqlResult: false,
        pro_id: "",
        groupid: "",
        requestid: "",
        project_request_list: [],
        gerouplist: [],
        requstlist: [],
        caselist: [],
        formatSql: "",
        sqltype: "sql",
        reusltname: "",
        testdbaList: [],
        finalResult: [],
        finalResult1: [],
        FinalValueResult: [],
        totalResult: false,
        AssertionResult: [],
        AssertionfT: false,
        requestID: this.$route.params.id,
        myCase_id: this.$route.params.case_id,
        activeName: 'first',
        request_name: "",
        tableData: [],
        Result: false,
        jdata: "",
        reuslt: [],

        dynamicValidateForm: { //表单
          headerData: [{
            headerName: "",
            headerValues: ""
          }],
          dataType: "data",//数据类型
          request_id: this.$route.params.id,
          caseid: "",
          caseidConclusionValue: "",
          case_name: "",//用例名称
          domains: [{
            keynew: "",
            value: ''
          }],
          request_other_type: false,//是否需要其他接口
          request_relation_content: [{//其他接口内容
            dataType: "data",
            mode: "",//请求接口方式
            requestType: "",//请求数据方式
            Indexes: "",//顺序
            name: "",//接口名称
            httpUrl: "http://",
            defaultUrlReuqestID: this.$route.params.id,
            defaultUrl: "customUrl",
            url: "",//接口地址
            header: "",//头部信息
            conclusionValue: [{//提取值
              clvaue: "",
              num: "",
            }],
            content: [{ //请求参数内容
              parameter: null,
              value1: null
            }],
          }],
          headers: "",//当前接口头部信息
          request_result: [{//当前接口
            keynew2: null,
            keynew2Num: null,
            value2: null
          }],
          sqlTrueFlasetype: false,//是否使用SQL
          sqlChoice: "",//sql选择库
          SQLinput: "",//sqL语句
          SQLMomentum: "",//动量取值
          sqlClusionValue: [{//sql取值
            sqlKey: "",
          }],

          sqlTrueFlasetypeLast: false,//断言后是否使用SQL
          sqlChoiceLast: "",//sql选择库
          SQLinputLast: "",//sqL语句
          SQLMomentumLast: "",//动量取值
          sqlClusionValueLast: [{//sql取值
            sqlKeyLast: "",
          }],

        }
      };
    },
    methods: {

      getTestSQLfrom() {
        var pragma = JSON.stringify({
            "id": this.dynamicValidateForm.sqlChoice,
          "sql": this.dynamicValidateForm.SQLinput,
          "SQLMomentum": this.dynamicValidateForm.SQLMomentum,
          "reusltList": this.reuslt,
          }
        )
        console.log("pragma:>", pragma)
        getTestSQL(pragma).then((respose) => {
          var result = respose["data"]
          console.log("result:", result)
          if (result["code"] == 200) {
            try {
              var sqlResultTest = JSON.stringify(JSON.parse(result["data"]), null, 4);
            } catch (e) {
              var sqlResultTest = result["data"]
            }
            this.sqlResultTest = sqlResultTest
            this.sqlResult = true
            console.log(sqlResultTest);

          }
        })
      },

      getTestSQLfromLast() {
        var pragma = JSON.stringify({
            "id": this.dynamicValidateForm.sqlChoiceLast,
            "sql": this.dynamicValidateForm.SQLinputLast,
            "SQLMomentum": this.dynamicValidateForm.SQLMomentumLast,
            "reusltList": this.FinalValueResult,
          }
        )
        console.log("pragma:>", pragma)
        getTestSQL(pragma).then((respose) => {
          var result = respose["data"]
          console.log("result:", result)
          if (result["code"] == 200) {
            try {
              var sqlResultTest = JSON.stringify(JSON.parse(result["data"]), null, 4);
            } catch (e) {
              var sqlResultTest = result["data"]
            }
            this.sqlResultTest = sqlResultTest
            this.sqlResult = true
            console.log(sqlResultTest);

          }
        })
      },

      formatSQL(sql) {//格式化SQL
        console.log(sql)
        this.formatSql = fmater.format(sql, "sql")
        console.log(this.formatSql)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      getAllCase1(num) {
        var pragma =
          JSON.stringify(
            {
              pro_id: this.pro_id,
              groupid: this.groupid,
              requestid: this.requestid
            }
          )
        getAllCass(pragma).then((response) => {
          var result = response["data"]
          if (result["code"] == 200) {

            if (num == 1) {
              this.groupid = ""
              this.requestid = ""
              this.dynamicValidateForm.caseid = ""
            }
            if (num == 2) {
              this.requestid = ""
              this.dynamicValidateForm.caseid = ""
            }
            if (num == 3) {
              this.dynamicValidateForm.caseid = ""
            }
            this.project_request_list = result["project_request_list"]
            this.gerouplist = result.gerouplist
            this.requstlist = result.requstlist
            this.caselist = result.caselist

          }
        })
      },

      testgetHerders() {
        getHerders().then((response) => {
          var result = response["data"]
          if (result["code"] == 200) {
            this.herdersList = result["herdersList"]
            console.log(result["herdersList"])

          }
        })
      },
      getpoint(name1) {
        console.log(this.reuslt[name1]);
        this.reusltname = this.reuslt[name1]
      },

      Checkpoint() {//接口检查点
        var pragma = {
          data: JSON.stringify(
            this.dynamicValidateForm.request_relation_content
          ),
          herderList: JSON.stringify(
            this.dynamicValidateForm.headerData
          ),
        }
        // var pragma=this.dynamicValidateForm.request_relation_content
        console.log(pragma)
        getcheckpoint(pragma).then((response) => {
          var result = response["data"]
          if (result["code"] == 200) {
            try {
              var jdata = JSON.parse(result["data"])
              // JSON.stringify(JSON.parse(result["data"]), null, 4);
            } catch (e) {
              var jdata = result["data"]
            }
            this.jdata = jdata
            this.reuslt = result["reuslt"]
            this.Result = true
            console.log(jdata);

          }
        })
      },

      getcheckCaseALL() { //检查用例
        var pragma =
          JSON.stringify(
            this.dynamicValidateForm
          )
        console.log(pragma)
        getcheckCase(pragma).then((response) => {
          var result = response["data"]
          if (result["code"] == 200) {
            try {
              var finalResult = JSON.parse(result["data"])
              // JSON.stringify(JSON.parse(result["data"]), null, 4);
            } catch (e) {
              var finalResult = result["data"]
            }
            this.finalResult = finalResult
            this.finalResult1 = result["data"]
            this.FinalValueResult = result["reuslt"]
            this.totalResult = true
            this.$notify({
              title: '提示',
              message: result["reuslt"],
              duration: 0,
              type: 'success'
            });
            console.log(finalResult);
          }

        })
      },
      FinalAssertionResult() {//断言检查
        var pragma =
          JSON.stringify(
            {
              finalResult: this.finalResult1,
              FinalValueResult: this.FinalValueResult,
              request_result: this.dynamicValidateForm.request_result,
              sqldata: {
                "sqlTrueFlasetypeLast": this.dynamicValidateForm.sqlTrueFlasetypeLast,//断言后是否使用SQL
                "id": this.dynamicValidateForm.sqlChoiceLast,//sql选择库
                "sql": this.dynamicValidateForm.SQLinputLast,//sqL语句
                "SQLMomentum": this.dynamicValidateForm.SQLMomentumLast,//动量取值
                "sqlClusionValueLast": this.dynamicValidateForm.sqlClusionValueLast,
              }
            }
          )
        AssertionCase(pragma).then((response) => {
          var result = response["data"]
          console.log(result)
          if (result["code"] == 200) {
            try {
              var AssertionResult = JSON.parse(result["data"])
              // JSON.stringify(JSON.parse(result["data"]), null, 4);
            } catch (e) {
              var AssertionResult = result["data"]
            }
            this.AssertionResult = AssertionResult
            this.AssertionfT = true
            console.log(AssertionResult);
          }
        })
      },

      handleClick(tab, event) {
        console.log(tab, event);
      },
      submitForm(formName) { //提交所有表单
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var pragma = JSON.stringify(
              {
                dynamicValidateForm: this.dynamicValidateForm,
                myCase_id: this.myCase_id,
              }
            )

            console.log(pragma)
            addCase(pragma).then((respose) => {
              var result = respose["data"]
              if (result["code"] == 200) {
                console.log(result)
                Message.success("保存成功")
                setTimeout(() => {
                  this.$router.push({name: 'testCaseAction'})
                }, 1500)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.reload()
      },
      removerequest_result(request_result) {
        var index = this.dynamicValidateForm.request_result.indexOf(request_result)
        if (index !== 0) {
          this.dynamicValidateForm.request_result.splice(index, 1)
        }
      },
      addrequest_result() {
        this.dynamicValidateForm.request_result.push({
          keynew2: "",
          keynew2Num: "",
          value2: ''
        });
      },

      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        console.log(index)
        if (index !== 0) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          keynew: "",
        });
      },


      removeHerder(item) {
        var index = this.dynamicValidateForm.headerData.indexOf(item)
        console.log(index)
        if (index !== 0) {
          this.dynamicValidateForm.headerData.splice(index, 1)
        }
      },
      addHerder() {
        this.dynamicValidateForm.headerData.push({
          headerName: '',
          headerValues: "",
        });
      },
        refreshHerder(id) {
            console.log(id)
            runNerPublicInterface({id: id}).then((respose) => {
                var result = respose["data"]
                if (result["code"] == 200) {
                    Message.success("运行成功")
                }
            })
        },

      removesql(item) {
        var index = this.dynamicValidateForm.sqlClusionValue.indexOf(item)
        console.log(index)
        if (index !== 0) {
          this.dynamicValidateForm.sqlClusionValue.splice(index, 1)
        }
      },
      addsql() {
        this.dynamicValidateForm.sqlClusionValue.push({
          sqlKey: "",
        });
      },

      removesqlLast(item) {
        var index = this.dynamicValidateForm.sqlClusionValueLast.indexOf(item)
        console.log(index)
        if (index !== 0) {
          this.dynamicValidateForm.sqlClusionValueLast.splice(index, 1)
        }
      },

      addsqlLast() {
        this.dynamicValidateForm.sqlClusionValueLast.push({
          sqlKeyLast: "",
        });
      },

      removeparameter(item, content) {
        var index = item.content.indexOf(content)
        console.log(index)
        if (index !== 0) {
          item.content.splice(index, 1)
        }
      },

      addparameter(item) {
        item.content.push({
          parameter: '',
          value1: "",
        });
      },

      removeconclusionValue(item, clusionValue) {
        var index = item.conclusionValue.indexOf(clusionValue)
        console.log(index)
        if (index !== 0) {
          item.conclusionValue.splice(index, 1)
        }
      },

      addconclusionValue(item) {
        item.conclusionValue.push({
          clvaue: "",
          num: "",
        });
      },

      addItem() {
        this.dynamicValidateForm.request_relation_content.push({
          name: "",
          url: "",
          header: "",
          content: [{
            parameter: "",
            value1: ""
          }],
          conclusionValue: [{//提取值
            clvaue: "",
            num: "",
          }],
        })
      },

      deleteItem(item, index1) {
        var index = this.dynamicValidateForm.request_relation_content.indexOf(item)
        console.log(index)
        if (index !== 0) {
          this.dynamicValidateForm.request_relation_content.splice(index1, 1)
        }
      },

      getTestDB1() {
        getTestDB().then((response) => {
          var result = response["data"]
          if (result["code"] == 200) {
            this.testdbaList = result["data"]

          }

        })
      },

      getInterface() {
        var pragma = {
          data: JSON.stringify(
            {
              request_id: this.requestID,
            }
          )
        }
        getRequest(pragma).then((response) => {
          var result = response["data"]
          if (result["code"] == 200) {
            this.tableData = [{
              date: "接口名称：",
              name: result["data"][0]["fields"]["request_name"]
            }, {
              date: "接口地址：",
              name: result["data"][0]["fields"]["request_address"]
            }, {
              date: "请求方式：",
              name: result["data"][0]["fields"]["request_mode"]
            }
            ]
            // this.tableData = result["data"]
          }
        })
      },

      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0) {
          if (rowIndex % 3 === 0) {
            return {
              rowspan: 3,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },

      mygetOneCase() {
        var parm = JSON.stringify({case_id: this.myCase_id,})
        if (this.myCase_id != "") {

          getOneCase(parm).then((response) => {
            let rustl = response["data"]
            if (rustl["code"] == 200) {
              this.dynamicValidateForm = rustl["dynamicValidateForm"]
              console.log(rustl["dynamicValidateForm"])
            }
          })
        } else {
          Message.error("为获取到当前用例，无法进行编辑，请退出后重新进入")
        }

      }

    },
    mounted: function () {
      this.getInterface();
      this.getAllCase1();
      this.getTestDB1();
      this.testgetHerders();
      if (this.$route.params.case_id != "") {
        this.mygetOneCase()
      }
    },

  }

</script>
<style scoped>
  .tableclass {
    width: 400px;
    border: 1px solid #9D9D9D
  }

  .mian {
    background: rgba(236, 238, 241, .67);
    padding: .5rem;

  }

  .font {
    margin-bottom: 10px;
    clear: both;
    font-weight: 400;
    font-size: 18px;
    color: #32363a;
    font-family: Monospaced;
    border-left: 3px solid #2395f1;
    padding-left: 8px;

  }

</style>
