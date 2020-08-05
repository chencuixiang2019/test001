<template>
  <div>
    <el-row class="operate">
      <el-col :span="24">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 10px">
          <el-button type="primary" plain @click.native="addCaseGetPage()" style="margin-right: 30px">新增用例
          </el-button>
          <el-form-item label="测试名称">
            <el-input v-model="formInline.case_name" placeholder="支持模糊搜索" style="width: 150px"></el-input>
          </el-form-item>
          <el-form-item label="成功失败">
            <el-select v-model="formInline.request_code" placeholder="选择请求方式" style="width: 150px">
              <el-option label="全部" value=""></el-option>
              <el-option label="成功" value="success"></el-option>
              <el-option label="失败" value="fail"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="getCaseList()">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click.native="executionCaseTest">批量执行</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      style="width: 100%">

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <el-button
            :icon="scope.row.fields.request_code=== 'success' ? 'el-icon-sunny' :'el-icon-heavy-rain'"
            :type="scope.row.fields.request_code=== 'success' ? 'success' :'danger'"
            circle
          ></el-button>
        </template>
      </el-table-column>

      <el-table-column label="用例名称" show-overflow-tooltip width="300">
        <template slot-scope="scope">
          <span style="margin-left: 10px ;color: #8B8970">{{scope.row.fields.case_name}}</span>
        </template>
      </el-table-column>

      <el-table-column label="响应结果" show-overflow-tooltip width="230">
        <template slot-scope="scope">
          <span style="margin-left: 10px ;color: #8B8970">{{scope.row.fields.request_result_Assertion_content}}</span>
        </template>
      </el-table-column>

      <el-table-column label="断言内容" show-overflow-tooltip width="230">
        <template slot-scope="scope">
          <span style="margin-left: 10px ;color: #8B8970">{{scope.row.fields.request_response}}</span>
        </template>
      </el-table-column>

      <el-table-column label="修改日期">
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

      <el-table-column label="操作" width="350">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-video-play"
            @click="executionOneCase(scope.row.pk)"
           >
          </el-button>
          <el-button
                  size="mini"
                  type="info"
                  @click="copyCase(scope.row.pk)">复制
          </el-button>

          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.row.pk)">
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
  import {getCase, deleteCaseObj, executionCase, copyCaseObj} from "../../request/api.js";
  import {Message} from 'element-ui'
  import router from '../../router/index'

  export default {
    inject: ['reload'],
    name: "testCaseAction",
    data() {
      return {
        multipleSelection: [],
        caseList: [],
        requestID: this.$route.params.id,
        formInline: {
          case_name: '',
          request_code: '',
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

      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      addCaseGetPage(){
        this.$router.push({name: 'addCase', params: {id: this.requestID, case_id: ""}})
      },
      handleEdit(id) {
        this.$router.push({name: 'addCase', params: {id: this.requestID, case_id: id}})
      },
      handleDelete(caseid) {
        var pragma = {
          data: JSON.stringify(
            {
              id: caseid,
            }
          )
        }
        console.log(pragma);
        this.$confirm('确定要删除当前用例嘛?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteCaseObj(pragma).then(reponse => {
            reponse = reponse["data"]
            if (reponse["code"] == 200) {
              Message.success(reponse.msg)
              setTimeout(() => {
                this.reload()
              }, 500)
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
      copyCase(index) {
        var pragma = {
          data: JSON.stringify(
                  {
                    id: index,
                  }
          )
        }
        console.log(pragma);
        this.$confirm('您确定要复制当前用例嘛', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          copyCaseObj(pragma).then(reponse => {
            reponse = reponse["data"]
            if (reponse["code"] == 200) {
              Message.success("复制当前用例成功")
              this.reload()
            }
          }, 200)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消复制'
          });
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.getCaseList()

      },
      handleCurrentChange(val) {
        this.pageNum = val
        console.log(this.pageNum)
        this.getCaseList()
      },

      getCaseList() {
        var pragma = {
          data: JSON.stringify(
            {
              requestID: this.requestID,
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              case_name: this.formInline.case_name,
              request_code: this.formInline.request_code,
            }
          )
        }
        getCase(pragma).then((response) => {
          var result = response["data"]
          if (result["code"] == 200) {
            this.tableData = result["data"]
            this.gourpCount = result["gourpCount"]
            this.pageNum = result["pageNum"]
            this.pageSize = result["pageSize"]
          }
        })

      },
      executionCaseTest() {
        var selentiong = this.multipleSelection.length
        for (var i = 0; i < selentiong; i++) {
          var caseid = (this.multipleSelection[i]['pk'])
          this.caseList.push(caseid)
        }
        var parme = JSON.stringify({"caseList": this.caseList})
        executionCase(parme).then((response) => {
          var result = response["data"]
          if (result["code"] == 200) {
            Message.success("执行用例成功")
            this.reload()
          }
        })
        this.caseList = []
      }
      ,

      executionOneCase(case_id) {
        var parme = JSON.stringify({"caseList": [case_id]})
        console.log(parme)
        executionCase(parme).then((response) => {
          var result = response["data"]
          if (result["code"] == 200) {
            Message.success("执行用例成功")
            this.reload()
          }
        })
        this.caseList = []
      }
    },
    mounted: function () {
      this.getCaseList();
    },
  }
</script>
<style scoped>
  .operate {
    padding-bottom: 10px;
  }

</style>
