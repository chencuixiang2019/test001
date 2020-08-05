<template>
  <div>
    <el-row class="operate">
      <el-col :span="24">
        <el-form :inline="true" :model="Publicfiltering" class="demo-form-inline" style="margin-top: 10px">
          <el-button type="primary" plain @click="dialogFormVisible = true" style="margin-right: 30px">新增公共接口
          </el-button>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog title="添加公共接口" :visible.sync="dialogFormVisible" width="800px">
      <el-form :model="addPublic">
        <el-form-item label="公共名称:">
          <el-input v-model="addPublic.headrsName" autocomplete="off" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="接口地址:">
          <el-input v-model="addPublic.url" autocomplete="off" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="请求方式:">
          <el-select v-model="addPublic.method" placeholder="请选择活动区域" style="width: 200px">
            <el-option label="POST" value="POST"></el-option>
            <el-option label="GET" value="GET"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据类型:">
          <el-select v-model="addPublic.request_data_type" placeholder="请选择活动区域" style="width: 200px">
            <el-option label="JSON" value="JSON"></el-option>
            <el-option label="DATA" value="DATA"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="头部信息:">
          <el-input v-model="addPublic.request_header_param" autocomplete="off" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="传参内容:">
          <el-input v-model="addPublic.request_data_content" autocomplete="off" style="width: 400px;"></el-input>
        </el-form-item>

        <!--<el-form-item label="动态取值::" >-->
        <!--<el-input  v-model="addPublic.request_value" autocomplete="off" style="width: 400px;"></el-input>-->
        <!--</el-form-item>-->

        <el-form-item
          v-for="(request_value, index) in addPublic.request_value"
          :label="'动态取值' + index"
          :key="request_value.key"
        >
          <el-input v-model="request_value.realkey" style="width: 200px;" placeholder="real别名"></el-input>
          <el-input v-model="request_value.newKey" style="width: 200px;"></el-input>

          <el-select v-model="request_value.newValue" placeholder="请选择下标" style="width: 100px">
            <el-option label="请选择" value=""></el-option>
            <el-option v-for="i in 30" :key="i" :label="i" :value="i-1"
            ></el-option>
          </el-select>
          <el-button @click="addRequest_value()" type="primary">新增</el-button>
          <el-button @click.prevent="removeRequest_value(request_value)" type="danger" v-show="index>0">删除</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPublicInterfaceAPI()">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="headrsName"
        label="名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="method"
        label="请求方式"
        width="180">
      </el-table-column>
      <el-table-column
        prop="request_data_type"
        label="请求类型方式"
        width="180">
      </el-table-column>

      <el-table-column
        prop="request_data_content"
        label="参数内容"
        width="500"
      >
      </el-table-column>
      <el-table-column
        label="操作"

      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="runPublic(scope.row.request_id)">运行
          </el-button>
          <el-button
            size="mini"
            type="success"
            @click.native="PubHandleEdit(scope.row.request_id)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="publicDelete(scope.row.request_id)">删除
          </el-button>
        </template>

      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    addPublicInterface,
    queryPublicInterface,
    runNerPublicInterface,
    delPublicInterface,
  } from "../../request/api.js";
  import {Message} from 'element-ui'
  export default {
    inject: ['reload'],
    name: "PublicInterface",
    data() {
      return {
        Publicfiltering: {name2: ""},
        dialogFormVisible: false,
        addPublic: {
          headrsName: "",
          url: "",
          method: "GET",
          request_data_type: "DATA",
          request_header_param: "",
          request_data_content: "",
          request_value: [
            {
              realkey: "",
              newKey: "",
              newValue: ""
            }
          ],
        },

        tableData: [],
      }
    },
    methods: {
      addRequest_value() {
        this.addPublic.request_value.push({
          newKey: "",
          newValue: "",
          realkey: ''
        });
        console.log(this.addPublic)
      },

      removeRequest_value(item) {
        var index = this.addPublic.request_value.indexOf(item)
        if (index !== 0) {
          this.addPublic.request_value.splice(index, 1)
        }
      },
      addPublicInterfaceAPI() {//新增数据
        var pragma = JSON.stringify(this.addPublic
        )
        console.log("pragma:>", pragma)
        addPublicInterface(pragma).then(respose => {
          var result = respose["data"]
          console.log("result:", result)
          if (result["code"] == 200) {
            Message.success("保存成功")
            this.reload()
          }
          this.dialogFormVisible = false
        })
      },

      queryPublicInterfaceAPI() {//查询
        queryPublicInterface().then((respose) => {
          var result = respose["data"]
          if (result["code"] == 200) {
            console.log("result:", result["data"])
            this.tableData = result["data"]
          }
        })
      },

      runPublic(id) {
        console.log(id)
        var pragma = JSON.stringify({id: id}
        )
        runNerPublicInterface(pragma).then((respose) => {
          var result = respose["data"]
          if (result["code"] == 200) {
            Message.success("运行成功")
          }
        })
      },
      PubHandleEdit(id) {
        console.log(id)
      },
      publicDelete(id) {
        var pragma = JSON.stringify({id: id}
        )
        delPublicInterface(pragma).then(respose => {
          var result = respose["data"]
          if (result["code"] == 200) {
            Message.success("删除成功")
            this.reload()
          }
        })
      },
    },

    mounted: function () {
      this.queryPublicInterfaceAPI();

    },
  }

</script>


<style scoped>

</style>
