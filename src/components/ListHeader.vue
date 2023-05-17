<template>
  <!--新增/刷新-->
  <div class="flex items-center justify-between mb-4">
    <span>
      <el-button type="primary" size="default" @click="$emit('create')"
        >新增</el-button
      >
      <el-popconfirm
        v-if="btns.includes('delete')"
        title="是否删除选中"
        confirmButtonText="确认"
        cancelButtonText="取消"
        @confirm="$emit('delete')"
      >
        <template #reference>
          <el-button type="danger" size="default">批量删除</el-button>
        </template>
      </el-popconfirm>
    </span>
    <el-tooltip content="刷新数据" placement="top" effect="dark">
      <el-button text size="large" @click="$emit('refresh')">
        <el-icon :size="20"><Refresh /></el-icon>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  layout: {
    type: String,
    default: "create,refresh",
  },
});
const btns = computed(() => {
  return props.layout.split(",");
});
defineEmits(["create", "refresh", "delete"]);
</script>

<style>
</style>