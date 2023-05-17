<template>
  <el-drawer
    v-model="showDrawer"
    :title="title"
    :size="size"
    :destroyOnClose="destroyOnClose"
  >
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
      <div class="actions">
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="submit">
            {{ confirmText }}
          </el-button>
          <el-button @click="close">重置</el-button>
        </el-form-item>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  title: String,
  size: {
    type: String,
    default: "30%",
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  confirmText: {
    type: String,
    default: "提交",
  },
});
//loading效果
const loading = ref(false);
const showLoading = () => (loading.value = true);
const hideLoading = () => (loading.value = false);

//模态框效果
const showDrawer = ref(false);
const open = () => (showDrawer.value = true);
const close = () => (showDrawer.value = false);

//提交事件
const emit = defineEmits(["submit"]);
const submit = () => emit("submit");

//向父组件暴露方法
defineExpose({
  open,
  close,
  showLoading,
  hideLoading
});
</script>

<style>
.formDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  @apply flex flex-col;
}
.formDrawer .body {
  flex: 1;
  position: absolute;
  bottom: 50px;
  top: 0;
  left: 0;
  right: 0;
}
.formDrawer .actions {
  height: 50px;
  @apply mt-auto flex items-center;
}
</style>