<template>
  <div class="dashboard-editor-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="3">
          <clear-phone-tool></clear-phone-tool>
        </el-col>
        <el-col :span="3">
          <check-commodity-tool></check-commodity-tool>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="22">
          <show-vcode-tool></show-vcode-tool>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

  import CheckCommodityTool from './components/CheckCommodityTool'
  import ClearPhoneTool from './components/ClearPhoneTool'
  import ShowVcodeTool from './components/ShowVcodeTool'

  export default {
    name: "ToolHome",
    components: {CheckCommodityTool, ClearPhoneTool, ShowVcodeTool},
  }
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .github-corner {
      position: absolute;
      top: 0px;
      border: 0;
      right: 0;
    }

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width: 1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
