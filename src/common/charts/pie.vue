<template>
  <div :class="className" id="pie" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/lib/chart/pie');
    export default {
        name: "pie",
        props: {
          className: {
            type: String,
          default: 'chart'
          },
          width: {
            type: String,
          default: '200px'
          },
          height: {
            type: String,
          default: '200px'
          }
        },
        data() {
    return {
      chart: null
    }
  },
        mounted() {
          this.initChart()
        },
      beforeDestroy() {
        if (!this.chart) {
          return
        }
        this.chart.dispose();
        this.chart = null
      },
      methods: {
        initChart() {
          this.chart = echarts.init(document.getElementById("pie"));
          this.chart.setOption({
            title : {
              text: '某站点用户访问来源',
              subtext: '纯属虚构',
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series : [
              {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                  {value:200, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:234, name:'联盟广告'},
                  {value:135, name:'视频广告'},
                  {value:1548, name:'搜索引擎'}
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          })
        }
      }
    }
</script>

<style scoped>

</style>
