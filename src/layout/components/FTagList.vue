<template>
  <div class="f-tag-list" :style="{ left: $store.state.userAbout.asideWidth }">
    <el-tabs
      style="min-width: 100px"
      v-model="activeTab"
      type="card"
      class="flex-1"
      @tab-change="changeTab"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        :closable="item.path != '/'"
        v-for="item in tabList"
        :key="item.id"
        :label="item.title"
        :name="item.path"
      ></el-tab-pane>
    </el-tabs>
    <span class="tag-btn">
      <el-dropdown @command="handleClose">
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="clearOther">关闭当前</el-dropdown-item>
            <el-dropdown-item command="clearAll">关闭全部</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div style="height: 32px"></div>
</template>

<script setup>
import { useTabList } from "~/composables/useTabList";
const { activeTab, tabList, removeTab, changeTab, handleClose } = useTabList();
</script>

<style scoped>
.f-tag-list {
  @apply fixed bg-transparent flex items-center;
  border-bottom: 1px solid #F5F5F5;
  background-image: radial-gradient(transparent 1px, #F5F5F5 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  top: 60px;
  right: 0;
  height: 40px;
  z-index: 100;
}
.tag-btn {
  @apply bg-white rounded ml-auto flex items-center justify-center mr-3 px-2;
  height: 32px;
}
:deep(.el-tabs__header) {
  @apply mb-0 flex items-center border-0;
}
:deep(.el-tabs__nav) {
  border: 0 !important;
}
:deep(.el-tabs__item) {
  @apply bg-white mx-1;
  height: 32px;
  line-height: 32px;
  border: 0 !important;
}

:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
  line-height: 32px;
  height: 32px;
}
</style>