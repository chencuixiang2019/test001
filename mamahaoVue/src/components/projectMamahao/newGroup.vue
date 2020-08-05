<template>
  <div>
    <el-row class="operate">
      <el-col :span="24">
        <el-button type="primary" @click.native="dialogFormVisible = true">新增分组</el-button>
      </el-col>
    </el-row>
    <el-dialog title="新增分组" :visible.sync="dialogFormVisible" width="700px">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="模块分组名称：" prop="name">
          <el-input v-model="form.name" autocomplete="off" style="width: 500px"></el-input>
        </el-form-item>
        <el-form-item label="备-----------注：">
          <el-input v-model="form.remake" autocomplete="off" style="width: 500px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onsbmit('form')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改分组内容" :visible.sync="updateGroup" width="700px">
      <el-form ref="groupUpdateform" :model="groupUpdateform" :rules="rules">
        <el-form-item label="模块分组名称：" prop="updateName">
          <el-input v-model="groupUpdateform.updateName" autocomplete="off" style="width: 500px"></el-input>
        </el-form-item>
        <el-form-item label="备-----------注：">
          <el-input v-model="groupUpdateform.updateRemake" autocomplete="off" style="width: 500px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateGroup = false">取 消</el-button>
        <el-button type="primary" @click.once="updatesbmit('groupUpdateform')">确 定</el-button>
      </div>
    </el-dialog>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="分组模块"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>分组名称: {{ scope.row.fields.group_name }}</p>
            <p>备注: {{ scope.row.fields.remark }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.fields.group_name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="备注信息"
      >
        <template slot-scope="scope">
          <i class="el-icon-chat-line-square"></i>
          <span style="margin-left: 10px">{{  scope.row.fields.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建日期"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{  scope.row.fields.creat_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="修改日期"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{  scope.row.fields.updata_time }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="getCase(scope.row.pk)">查看
          </el-button>
          <el-button
            size="mini"
            type="success"
            @click.native="handleEdit(scope.row.pk,scope.row.fields.group_name, scope.row.fields.remark)">编辑
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
  import {addGroup, getGroup, updateGroupObj,deleteGroupObj} from "../../request/api.js";
  import {Message} from 'element-ui'
  import router from '../../router/index'

  export default {
    inject:['reload'],
    name:"newGroup",
    data() {
      return {
        groupid: this.$route.params.id,
        dialogFormVisible: false,
        updateGroup: false,
        form: {
          name: '',
          remake: '',
        },
        groupUpdateform: {
          updateName: '',
          updateRemake: '',
        },
        rules: {
          updateName : [
            {required: true, message: '修改不可为空', trigger: 'blur'},
            {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '分组模块不可为空', trigger: 'blur'},
            {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'}
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

      handleEdit(index, updateName, updateRemake) {//修改分组信息
        this.updateGroup = true
        this.groupUpdateform.updateName = updateName
        this.groupUpdateform.updateRemake = updateRemake
        this.index = index
      },
      handleDelete(groupid) {
        var pragma = {
          data: JSON.stringify(
            {
              id: groupid,
            }
          )
        }
        console.log(pragma);
        this.$confirm('操作删除前，请确认分组内没有信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteGroupObj(pragma).then(reponse => {
              reponse=reponse["data"]
            if(reponse["code"]==200 ){
              this.reload()
              }
              if(reponse["code"]==500 | reponse["code"]==201){
                Message.error(reponse["msg"])

              }

        },200)

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      getCase(index) {
        this.$router.push({name: 'InterfaceManagementList', params: {id:index}})
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.getGrouplist()

      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.getGrouplist()
      },

      updatesbmit(groupUpdateform) {
        var pragma = {
          data: JSON.stringify(
            {
              name: this.groupUpdateform.updateName,
              remark: this.groupUpdateform.updateRemake,
              id: this.index,
            }
          )
        }
        console.log(pragma)
        this.$refs[groupUpdateform].validate((valid) => {
          if (valid) {
            updateGroupObj(pragma).then(reponse => {
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
          }
              else {
                Message.error("请确认表单正确后，在进行提交")
                return false;
          }
              this.updateGroup=false;
        },500);

      },
      onsbmit(form) {
        var pragma = {
          data: JSON.stringify(
            {
              name: this.form.name,
              remark: this.form.remake,
              groupid: this.groupid,
            }
          )
        }
        console.log(pragma)
        this.$refs[form].validate((valid) => {
          if (valid) {
            addGroup(pragma).then(reponse => {
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
      getGrouplist() {
        var pragma = {
          data: JSON.stringify(
            {
              groupid: this.groupid,
              pageNum: this.pageNum,
              pageSize: this.pageSize,
            }
          )
        }
        console.log("pragma:", pragma)
        getGroup(pragma).then((response) => {
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
    },
    mounted: function () {
      this.getGrouplist();
    },
  }
</script>
<style scoped>
  .operate {
    padding-bottom: 10px;
  }

</style>
