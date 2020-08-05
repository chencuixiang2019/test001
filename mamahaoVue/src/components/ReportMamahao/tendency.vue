<template>
  <div class="line1">
    <div id="line1" class="" style="width: 90%;height:450px;"></div>
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts';
  // 引入柱状图
  import 'echarts/lib/chart/bar';
  import 'echarts/lib/chart/line';
  import 'echarts/lib/component/title';
  import 'echarts/lib/component/legend';
  import 'echarts/lib/component/toolbox';
  import 'echarts/lib/component/markPoint';
  import 'echarts/lib/component/tooltip';

  export default {
    mounted() {
      this.myChart = echarts.init(document.getElementById('line1'));
      this.initData();
    },
    props: ['sevenDate', 'sevenDay'],
    methods: {
      initData() {
        const colors = ['#5793f3', '#f6c6a3', '#d14a61'];
        const option = {
          color: colors,
          title: {
            text: '近期结果分析图',
            subtext: ''
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['执行成功', '执行跳过', '执行失败']
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['bar', 'line']},
              restore: {},
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.sevenDay,
          },
          yAxis: [
            {
              type: 'value',
              name: '用例数量',
              min: 0,
              // max: this.maxwith,
              position: 'left',
              axisLine: {
                lineStyle: {
                  color: '#999'
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: '用例',
              min: 0,
              // max: this.maxlen,
              position: 'right',
              axisLine: {
                lineStyle: {
                  color: '#999'
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },
          ],
          series: [
            {
              name: '执行成功',
              type: 'line',
              data: this.sevenDate[0],
              yAxisIndex: 1,
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
            },
            {
              name: '执行跳过',
              type: 'line',
              data: this.sevenDate[1],
              yAxisIndex: 1,
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
            },
            {
              name: '执行失败',
              type: 'line',
              data: this.sevenDate[2],
              yAxisIndex: 1,
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
            }
          ]
        };
        this.myChart.setOption(option);
      }
    },
    watch: {
      sevenDate: function () {
        this.initData()
      },
      sevenDay: function () {
        this.initData()
      },
      // maxwith: function () {
      //   this.initData()
      // },
      // maxlen: function () {
      //   this.initData()
      // },
    }
  }
</script>

<style lang="less">
  /*@import '../../js/mixin';*/
  .line1 {
    display: flex;
    justify-content: center;
    width: 1200px;
  }

</style>
