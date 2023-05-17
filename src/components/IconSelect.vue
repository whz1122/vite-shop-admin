<template>
  <div class="flex items-center">
    <el-select
      :modelValue="modelValue"
      placeholder="请选择请求方式"
      @change="handleChange"
      filterable
    >
      <el-option v-for="item in icons" :key="item" :label="item" :value="item">
        <div class="flex items-center justify-between">
          <el-icon><component :is="item"></component></el-icon>
          <span class="text-gray-500">
            {{ item }}
          </span>
        </div>
      </el-option>
    </el-select>
    <el-icon v-if="modelValue" :size="20" class="mx-2"><component :is="modelValue"></component></el-icon
    >
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as iconList from "@element-plus/icons-vue";
defineProps({
  modelValue: String,
});
const icons = ref(Object.keys(iconList));
const emit = defineEmits(["update:modelValue"]);
const handleChange = (icon) => {
  emit("update:modelValue", icon);
};
</script>

<style>
</style>