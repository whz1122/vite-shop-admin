<template>
  <div class="aside-list" :class="{ active: active }">
    <span class="truncate"><slot></slot></span>
    <el-button
      class="ml-auto px-1"
      text
      type="primary"
      size="default"
      @click="$emit('edit')"
    >
      <el-icon><Edit /></el-icon>
    </el-button>

    <el-popconfirm
      title="是否删除该分类"
      confirmButtonText="确认"
      cancelButtonText="取消"
      @confirm="$emit('delete')"
    >
      <template #reference>
        <el-button
          text
          type="primary"
          class="px-1"
          size="default"         
        >
          <el-icon><Close /></el-icon>
        </el-button>
      </template>
    </el-popconfirm>
  </div>
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["edit", "delete"]);
</script>

<style scoped>
.aside-list {
  border-bottom: 1px solid #f4f4f4;
  cursor: pointer;
  @apply flex items-center p-3 text-sm text-gray-700;
}
.aside-list:hover,
.active {
  @apply bg-blue-50;
}
</style>