<template>
  <el-card shadow="hover">
    <template #header>
      <div class="flex justify-between">
        <span>{{ title }}</span>
        <el-tag type="danger" effect="plain">{{tip }}</el-tag>
      </div>
    </template>
    <el-row :gutter="20">
        <el-col :span="6" :offset="0" v-for="(item) in btns" :key="item.id">
        <el-card shadow="hover" class="border-0 bg-light-400">
          <div class="flex flex-col items-center justify-center">
            <span class="text-xl mb-2 font-bold text-red-400">{{ item.value }}</span>
            <span class="text-xs text-gray-500 font-bold">{{ item.label }}</span>
          </div>
        </el-card>     
        </el-col>     
    </el-row>
    
  </el-card>
</template>

<script setup>
defineProps({
    title:String,
    tip:String,
    btns:Array
})
</script>

<style>
</style>