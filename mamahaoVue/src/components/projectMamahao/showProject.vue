<template>
  <el-container>
    <el-main>
      <el-row >
        <el-col :span="3" v-for="(o,index) in sites" :key="o.id" :offset="index >  0 ? 1 : 1">
          <el-card :body-style="{ padding: '20px' }" class="cards"  >
            <img v-bind:src="o.fields.pj_img" style="height: 160px;width: 160px" v-on:click="jumpGroup(o.pk)"
                 :onerror="errorImg01"
                 class="image">
            <div style="padding: 14px;">
              <span>{{o.fields.pj_name}}</span>
              <div class="bottom clearfix">
                <time class="time">{{o.fields.remark}}</time>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="3" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 1 : 1">
          <el-card :body-style="{ padding: '20px' }" class="cards">
            <img src="../../img/moren.jpg" @click="newproject()"
                 class="image">
            <div style="padding: 14px;">
              <span>默认添加项目</span>
            </div>
          </el-card>
        </el-col>
      </el-row>

    </el-main>
  </el-container>

</template>

<script>
  import {getproject} from "../../request/api.js";
  import {Message} from 'element-ui'
  export default {
    name: "showProject",
    data() {
      return {
        sites: [],
        errorImg01: 'this.src="' + require('../../img/xiangmu.png') + '"'

      }
    },
    mounted: function () {
      this.getproject();
    },
    methods:
      {
        getproject() {
          getproject().then((response) => {
              console.log(response.data)
            if (response.data["code"] === 200) {
              this.sites = response.data["data"]
            } else {
              Message.warning("接口出现异常,请联系管理员")
            }
          })
        },
        newproject() {
          console.log("跳转新建项目页面")
          this.$router.push({name: 'newProject', query: null})
        },
         jumpGroup(id){
          console.log("跳转新建分组")
           console.log("id=",id)
        this.$router.push({name: 'newGroup', params: {id:id}})
      },

      }
  }

</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
    /*margin-right: 30%;*/
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .headers {
    background-color: #E0E0E0;
    height: auto;
  }

  .cards {
    /*display: none;*/
    width: 200px;
    height: 290px;
    margin-bottom: 10px;

  }
.cards:hover{
  box-shadow: 2px 4px 6px #8c939d;
}

</style>
