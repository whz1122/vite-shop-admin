<template>
   <el-col
        :xs="12" :sm="12" :md="12" :lg="6" :xl="6"
        class="md:mt-0 mt-3"
        :offset="0"
        v-for="(item) in panels"
        :key="item.id"
        v-permission="['getStatistics1,GET']"
      >
        <el-card shadow="hover" class="border-0">
          <template #header>
            <div class="flex justify-between">
              <span>{{ item.title }}</span>
              <el-tag :type="item.unitColor" effect="plain">{{
                item.unit
              }}</el-tag>
            </div>
          </template>
          <span class="text-3xl font-bold text-blue-400"><CountTo :value="item.value"/></span>
          <el-divider></el-divider>
          <div class="flex justify-between text-gray-400">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.value }}</span>
          </div>
        </el-card>
      </el-col>
</template>

<script setup>
import CountTo from '~/components/CountTo.vue'
defineProps({   
    panels:Array
})
</script>

<style>

</style>