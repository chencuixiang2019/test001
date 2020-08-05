<template>
  <div>
    <el-dialog title="添加测试用例" :visible.sync="increaseturefalse" width="1200px">
      <div style="margin-top: 10px;margin-bottom: 20px">
        <el-form :model="increase"></el-form>
        <span>项目:</span>
        <el-select v-model="increase.pro_id" clearable placeholder="请选择项目">
          <el-option label="全部" value="" @click.native="getGroupList()"></el-option>
          <el-option
            v-for="item in increasesearch"
            :key="item.pj_id"
            :label="item.pj_name"
            :value="item.pj_id"
            @click.native="getGroupList(item)"
          >
          </el-option>
        </el-select>
        <span>分组:</span>
        <el-select v-model="increase.groupid" clearable placeholder="请选择分组">
          <el-option label="全部" value="" @click.native="getrqlist()"></el-option>
          <el-option
            v-for="item in increasegroupList"
            :key="item.group_id"
            :label="item.group_name"
            :value="item.group_id"
            @click.native="getrqlist(item)"
          >
          </el-option>
        </el-select>
        <span>接口:</span>
        <el-select v-model="increase.requestid" clearable placeholder="请选择接口">
          <el-option label="全部" value=""></el-option>
          <el-option
            v-for="item in increaserqlist"
            :key="item.request_id"
            :label="item.request_name"
            :value="item.request_id">
          </el-option>
        </el-select>
        <span>用例名称:</span>
        <el-input v-model="increase.caseName" autocomplete="off" placeholder="支持模糊筛选"
                  style="width: 200px"></el-input>
        <el-button type="primary" @click.native="getTestPlanCases()">查询</el-button>
      </div>
      <el-table :data="testCaseList"
                ref="multipleTable"
                tooltip-effect="dark"
                style="width: 100%"
                :row-key="(row)=>{ return row.case_id}"
                @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          :reserve-selection="true"
          width="55"></el-table-column>
        <el-table-column property="case_id" label="用例ID" width="100"></el-table-column>
        <el-table-column property="case_name" label="用例名称" width="300"></el-table-column>
        <el-table-column property="request_name" label="接口名称" width="300"></el-table-column>
        <el-table-column property="request_address" label="接口地址"></el-table-column>

      </el-table>
      <div style="margin-top: 20px">
        <el-pagination
          @size-change="increasehandleSizeChange"
          @current-change="increasehandleCurrentChange"
          :current-page="increase.pageNum"
          :page-sizes="[10, 30, 50, 100]"
          :page-size=increase.pageSize
          layout="total, sizes, prev, pager, next, jumper"
          :total="gourpCount">
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="increaseturefalse = false">取 消</el-button>
        <el-button type="primary" @click="getcastList()">确 定</el-button>
      </div>

    </el-dialog>
    <el-dialog title="新增测试计划" :visible.sync="addTestPlanList" width="1200px">
      <el-form :model="planForm" :rules="rules" ref="planForm">
        <el-form-item label="名称：" prop="name">
          <el-input v-model="planForm.name" autocomplete="off" placeholder="添加测试名称" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="开启定时任务">
          <el-switch v-model="planForm.timing_open_close"></el-switch>
        </el-form-item>
        <div v-if="this.planForm.timing_open_close==true">
          <el-form-item label="定时任务：">
            <el-input v-model="planForm.timing_task" placeholder="比如:0 */2 1-5 * * " style="width: 300px;"></el-input>
            <div style="margin-left: 8%;color: #8c939d">
              <ol>
                <li>比如:0 */2 1-5 * *</li>
                <li>每个工作日1-5 每两个小时0分钟开始执行</li>
                <li>标准5个单位，每个单位以空格隔开</li>
                <li>* : 范围内的所有值</li>
                <li>M-N : M到N之间的值</li>
                <li>M-N/X 或 */X : 每X分钟、每X天等等</li>
                <li>A,B,...,Z : 枚举的值</li>
              </ol>
            </div>
          </el-form-item>
        </div>
        <el-form-item label="备注：">
          <el-input v-model="planForm.remark" autocomplete="off" placeholder="非必填" style="width: 300px"></el-input>
        </el-form-item>
        <el-button type="success" @click="increaseturefalse = true" @click.native="getTestPlanCases()">添加测试用例
        </el-button>

        <hr style="margin-top: 10px">
        <el-table
          :data="testCaseListSecond.slice((testCaseListProlLis.pageNum-1)*testCaseListProlLis.pageSize,testCaseListProlLis.pageNum*testCaseListProlLis.pageSize)"
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column property="case_id" label="用例ID" width="100"></el-table-column>
          <el-table-column property="case_name" label="用例名称" width="200"></el-table-column>
          <el-table-column property="request_name" label="接口名称" width="300"></el-table-column>
          <el-table-column property="request_address" label="接口地址"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.case_id)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <div style="margin-top: 20px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="testCaseListProlLis.pageNum"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="testCaseListProlLis.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="testCaseListProlLis.gourpCount">
          </el-pagination>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addTestPlanList = false">取 消</el-button>
        <el-button type="primary" @click="addTestPlanVue('planForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-row class="operate">
      <el-col :span="24">
        <el-form :inline="true" :model="testPlan" class="demo-form-inline" style="margin-top: 10px">
          <el-button type="primary" plain @click="addTestPlanList = true" style="margin-right: 30px">新增计划
          </el-button>
          <el-form-item label="计划名称">
            <el-input v-model="testPlan.plan_name" placeholder="支持模糊搜索" style="width: 150px"></el-input>
          </el-form-item>
          <el-form-item label="包含定时任务">
            <el-select v-model="testPlan.timing_open_close" placeholder="选择请求方式" style="width: 150px">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="True"></el-option>
              <el-option label="否" value="False"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="修改时间筛选">
            <div class="block">
              <el-date-picker
                v-model="testPlan.creat_time"
                type="datetimerange"
                value-format="timestamp"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"

                align="right">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="queryTestPlan1()">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column property="pk" label="ID" width="80"></el-table-column>
      <el-table-column property="fields.plan_name" label="计划名称">
      </el-table-column>
      <el-table-column label="执行状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.fields.execution_state=='1'" style="color: #8c939d">尚未执行</span>
          <span v-if="scope.row.fields.execution_state=='2'" style="color: #6ebdf3">待执行</span>
          <span v-if="scope.row.fields.execution_state=='3'" style="color: #5E5694">执行中</span>
          <span v-if="scope.row.fields.execution_state=='4'" style="color: #599d6b">执行结束</span>
          <span v-if="scope.row.fields.execution_state=='5'" style="color: red">执行失败</span>
        </template>
      </el-table-column>
      <el-table-column property="fields.case_total" label="执行用例总数" width="150">
      </el-table-column>
      <el-table-column property="fields.creat_time" label="创建时间" width="200">
      </el-table-column>
      <el-table-column property="fields.updata_time" label="修改时间" width="200">
      </el-table-column>
      <el-table-column
        label="是否开启定时任务"
        width="200">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>定时状态: {{ scope.row.fields.timing_open_close}}</p>
            <p>定时时间: {{ scope.row.fields.timing_task}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium"
                      :type="scope.row.fields.timing_open_close === 'False' ? 'primary' : 'success'"
              >{{ scope.row.fields.timing_open_close }}
              </el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column property="fields.remark" label="备注" show-overflow-tooltip width="100">
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-video-play"
            @click="tableDataCase(scope.row.pk,scope.row.fields.execution_state)"
          >运行
          </el-button>
          <el-button
            size="mini"
            type="success"
            @click="tableDataEdit(scope.row.pk)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="tableDataDelete(scope.row.pk)">删除
          </el-button>
        </template>

      </el-table-column>
    </el-table>

    <div style="margin-top: 20px">
      <el-pagination
        @size-change="testPlanSizeChange"
        @current-change="testPlaneCurrentChange"
        :current-page="testPlan.pageNum"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="testPlan.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="testPlan.gourpCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {
    gettingUseCases,
    getTestPlanCases,
    addTestPlan,
    queryTestPlan,
    deleteTestPlan,
    executetTestPlan
  } from "../../request/api.js";
  import {Message} from 'element-ui'

  export default {
    name: "testPlan",
    inject: ['reload'],
    data() {
      return {
        increasesearch: [],
        increasegroupList: [],
        increaserqlist: [],//三级联动数据
        testCaseList: [],//添加测试计划中的case列表数据
        testCaseListSecond: [],//选择后测试计划用例显示
        increaseturefalse: false,
        increase: {
          pro_id: "",
          groupid: "",
          requestid: "",
          caseName: "",
          pageNum: 1,
          pageSize: 10
        },
        gourpCount: 0,
        multipleSelection: [],//选择后的存储列表
        addTestPlanList: false,//是否显示添加测试计划页面
        planForm: {//增加测试计划提交表单
          name: "",//测试计划名称
          timing_open_close: false,//是否开启定时任务、true,开启，false关闭
          timing_task: "",//定时任务时间段
          testCaseList: [],
          remark: "",
        },
        testCaseListProlLis: {
          pageNum: 1,
          gourpCount: 0,
          pageSize: 10
        },

        tableData: [],
        testPlan: {
          plan_name: "",
          timing_open_close: "",
          creat_time: [new Date().getTime() - 3600 * 1000 * 24 * 7, new Date().getTime() + 3600 * 1000 * 2],
          pageNum: 1,
          pageSize: 10,
          gourpCount: 0
        },
        rules: {
          name: [
            {required: true, message: "测试计划名称不能为空", trigger: 'blur'},
            {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'}
          ],
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);

            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    methods: {
      handleDelete(row) {//在已经存在用例面减去删除的数据
        console.log(row)
        let lentcl = this.planForm.testCaseList.length
        for (var i = 0; i < lentcl; i++) {
          let caseid = (this.planForm.testCaseList[i])
          if (row == caseid) {
            this.planForm.testCaseList.splice(i, 1)
            this.$refs.multipleTable.toggleRowSelection(this.testCaseListSecond[i], false)
            this.testCaseListSecond.splice(i, 1)
            this.testCaseListProlLis.gourpCount = this.testCaseListProlLis.gourpCount - 1
          }
        }
      },
      getcastList() {//将选择的用例放入到 增加测试计划用例中去
        console.log(this.multipleSelection)
        this.testCaseListSecond = this.multipleSelection
        var caseList = []
        var selentiong = this.multipleSelection.length
        for (var i = 0; i < selentiong; i++) {
          var caseid = (this.multipleSelection[i]['case_id'])
          caseList.push(caseid)
        }
        console.log(caseList)
        this.planForm.testCaseList = caseList
        this.testCaseListProlLis.gourpCount = selentiong
        this.increaseturefalse = false
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.testCaseListProlLis.pageSize = val

      },
      handleCurrentChange(val) {
        this.testCaseListProlLis.pageNum = val

      },
      testPlanSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.testPlan.pageSize = val
        this.queryTestPlan1()
      },
      testPlaneCurrentChange(val) {
        this.testPlan.pageNum = val
        this.queryTestPlan1()
      },

      increasehandleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.increase.pageSize = val
        this.getTestPlanCases()
      },
      increasehandleCurrentChange(val) {
        this.increase.pageNum = val
        this.getTestPlanCases()
      },

      getGroupList(itme) {//调整查询测试用例二级联动
        this.increase.requestid = ""
        this.increase.groupid = ""
        this.increasegroupList = []
        this.increaserqlist = []
        if (itme != null) {
          this.increasegroupList = itme.groupList
        }
      },
      getrqlist(itme) {//调整查询测试用例三级联动
        this.increase.requestid = ""
        this.increaserqlist = []
        if (itme != null) {
          this.increaserqlist = itme.rqlist
        }
      },
      gettingUseCases1() {//筛选测试用例字典接口
        gettingUseCases().then((response) => {
          var result = response["data"]
          if (result["code"] == 200) {
            this.increasesearch = result.data
            console.log(result.data)
          }

        })
      },
      getTestPlanCases() {//获取测试筛选完成后的测试用例数据
        var parm = this.increase
        getTestPlanCases(parm).then((response) => {
          var result = response.data
          console.log(result)
          if (result["code"] == 200) {
            this.testCaseList = result["data"]
            this.increase.pageNum = result["pageNum"]
            this.increase.pageSize = result["pageSize"]
            this.gourpCount = result["caseCount"]
          }
        })
      },
      addTestPlanVue(planForm) {//添加测试用例至计划中
        this.$refs[planForm].validate((valid) => {
          if (valid) {
            this.$alert('您确定提交测试计划内容？', '提交测试计划', {
              confirmButtonText: '确定',
              callback: action => {
                let parm = this.planForm
                if (action == "confirm") {
                  console.log("action:", action)
                  addTestPlan(parm).then(response => {
                    var result = response.data
                    console.log(result)
                    if (result["code"] == 200) {
                      this.addTestPlanList = false
                      Message.success("添加测试成功")
                      setTimeout(() => {
                        this.reload()
                      }, 500)
                    }
                    if (result["code"] == 201) {
                      this.addTestPlanList = false
                      Message.warning(result["msg"])
                    }
                  })
                }
              }
            });
          }
        })
      },
      queryTestPlan1() {//查询测试计划
        let parm = this.testPlan
        queryTestPlan(parm).then((response) => {
          let result = response.data
          console.log(result)
          this.tableData = result.data
          this.testPlan.pageNum = result.pageNum
          this.testPlan.pageSize = result.pageSize
          this.testPlan.gourpCount = result.gourpCount
        })

      },
      tableDataCase(id, state) {//测试计划点击运行
        console.log(id)
        console.log("state:", state)
        if (state == "3" || state == "2") {
          Message.warning("当前测试计划:已待执行，或执行中，请勿重复点击")
        } else {
          let parme = {id: id}
        executetTestPlan(parme).then(response => {
          let result = response.data
          if (result["code"] == 200) {
            setTimeout(() => {
              this.reload()
            }, 500)
            Message.success("执行提交成功，请耐心等待")
          }
      })
        }
      },
      tableDataEdit(id) {//编辑测试计划
        console.log(id)
      },
      tableDataDelete(id) {//删除测试计划
        console.log(id)
        let parme = {id: id}
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTestPlan(parme).then(response => {
            let result = response.data
            if (result["code"] == 200) {
              setTimeout(() => {
                this.reload()
              }, 500)
              Message.success("删除成功")
            }
          })
        }).catch(() => {
          Message.info("取消删除")
        });
      },

    },
    mounted: function () {
      this.gettingUseCases1();
      this.queryTestPlan1()
    },
  }
</script>

<style scoped>


</style>
