<template>
  <div>
    {{ $t("message")["app.dashboard.analysis.timeLabel"] }} :
    <a-date-picker></a-date-picker>
    <Chart :option="chartOption" style="height:600px"></Chart>
    <pre v-highlightjs="chartCode"><code class="html"></code></pre>
  </div>
</template>

<script>
import Chart from "../../components/Chart";
import request from "../../utils/request";
import chartCode from "!!raw-loader!../../components/Chart";
import "highlight.js/styles/github.css";
export default {
  data() {
    return {
      chartOption: {},
      chartCode
    };
  },
  components: {
    Chart
  },
  mounted() {
    this.getChartData();
    this.interval = setInterval(() => {
      this.getChartData();
    }, 3000);
  },
  methods: {
    getChartData() {
      request({
        url: "http://localhost:8081/api/dashboard/chart",
        method: "get",
        params: { ID: 12345 }
      }).then(res => {
        this.chartOption = {
          title: {
            text: "ECharts 入门示例"
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: res.data
            }
          ]
        };
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style></style>
