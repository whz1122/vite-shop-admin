<template>
  <div>
    <el-row :gutter="20"  v-permission="['getStatistics1,GET']">
      <!--骨架屏-->
      <template v-if="panels.length == 0">
        <el-col :span="6" v-for="i in 4" :offset="0" :key="i">
          <el-skeleton style="width: 100%" animated loading>
            <template #template>
              <el-card shadow="hover" class="border-0">
                <template #header>
                  <div class="flex justify-between">
                    <el-skeleton-item variant="text" style="width: 50%" />
                    <el-skeleton-item variant="text" style="width: 10%" />
                  </div>
                </template>
                <el-skeleton-item variant="h1" style="width: 80%" />
                <el-divider></el-divider>
                <div class="flex justify-between text-gray-400">
                  <el-skeleton-item variant="text" style="width: 50%" />
                  <el-skeleton-item variant="text" style="width: 10%" />
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>
      <IndexCount  :panels="panels" />  
    </el-row>
    <IndexNavs />

    <el-row :gutter="20" class="mt-3">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :offset="0" v-permission="['getStatistics3,GET']">
        <IndexChart />
      </el-col>
      <el-col  :xs="24" :sm="24" :md="24" :lg="12" :xl="12" :offset="0" v-permission="['getStatistics2,GET']">
        <IndexCard title="店铺及商品提示"  tip="店铺及商品提示" class="mb-3 md:mt-0 mt-3" :btns="goods" />
        <IndexCard title="交易提示" tip="需要立即处理的订单" :btns="order" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getStatistics1, getStatistics2 } from "~/api/index.js";
import IndexNavs from "~/components/IndexNavs.vue";
import IndexChart from "~/components/IndexChart.vue";
import IndexCard from "~/components/IndexCard.vue";
import IndexCount from "~/components/IndexCount.vue";

const panels = ref([]);
const goods = ref([]);
const order = ref([]);
getStatistics1().then((res) => {
  panels.value = res.panels;
});
getStatistics2().then((res) => {
  goods.value = res.goods;
  order.value = res.order;
});
</script>

<style>
</style>