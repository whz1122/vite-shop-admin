<template>
  <el-card shadow="hover">
    <template #header>
      <div class="flex justify-between">
        <span>订单统计</span>
        <div>
          <el-check-tag
            v-for="(item) in options"
            @click="handleChoose(item.value)"
            :checked="current == item.value"
            :key="item.id"
            style="margin-right: 8px"
          >
            {{ item.text }}
          </el-check-tag>
        </div>
      </div>
    </template>
    <div id="chart" ref="el" style="width: 100%; height: 300px"></div>
  </el-card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import { getStatistics3 } from "~/api/index.js";
import { useResizeObserver } from "@vueuse/core";

const current = ref("week");
const options = [
  {
    text: "近一个月",
    value: "month",
  },
  {
    text: "近一周",
    value: "week",
  },
  {
    text: "近24小时",
    value: "hour",
  },
];
// 定义切换(月，周，时)
const handleChoose = (type) => {
  current.value = type;
  getData();
};

var myChart = null;
onMounted(() => {
  var chartDom = document.getElementById("chart");
  if (chartDom) { //如果chartdom节点存在
    myChart = echarts.init(chartDom);
    getData();
  }
});
//销毁实例 解决白屏
onBeforeUnmount(() => {
  if (myChart) echarts.dispose(myChart);
});


//get数据 ，如果拿到数据加载图标
function getData() {
  let option = {
    xAxis: {
      type: "category",
      data: [],
    },
    yAxis: {
      type: "value",
    },
    tooltip: {
      trigger: "axis",
    },
    series: [
      {
        data: [],
        type: "line",
        smooth: true,
        lineStyle: {
          color: "#00BFFF",
          width: 3,
        },
        itemStyle: {
          //拐点标记的样式
            color: "#00BFFF", // 拐点的颜色
            barBorderRadius: 8,
        },
        zlevel: 2,
        areaStyle: {
          // 折现下是否填充
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(0,191,255,1)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(135,206,235,0.7)", // 100% 处的颜色
              },
            ],
            global: false,
          },
        },
      },
    ],
  };
  myChart.showLoading();
  getStatistics3(current.value)
    .then((res) => {
      option.xAxis.data = res.x;
      option.series[0].data = res.y;
      myChart.setOption(option);
    })
    .finally(() => {
      myChart.hideLoading();
    });
}

//echats自适应
const el = ref(null);
useResizeObserver(el, (entries) => {
  myChart.resize();
});
</script>

<style>
</style>