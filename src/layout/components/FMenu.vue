<template>
  <div class="f-menu" :style="{ width: $store.state.userAbout.asideWidth }">
    <el-menu
      :default-active="defaultActive"
      @select="handleSelect"
      class="border-0"
      :collapse="isCollapse"
      :collapse-transition="false"
      :unique-opened="true"
    >
      <template v-for="(item, index) in asideMenus" :key="index">
        <el-sub-menu
          :index="item.name"
          v-if="item.child && item.child.length > 0"
        >
          <template #title>
            <el-icon><component :is="item.icon"></component></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(item2, index2) in item.child"
            :key="index2"
            :index="item2.frontpath"
          >
            <el-icon><component :is="item2.icon"></component></el-icon>
            <span>{{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.frontpath">
          <el-icon><component :is="item.icon"></component></el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { useRouter, useRoute,onBeforeRouteUpdate } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
const router = useRouter();
const route = useRoute();
const store = useStore();
//默认选中
const defaultActive = ref(route.path);
//监听路由回调
onBeforeRouteUpdate((to,from)=>{
  defaultActive.value=to.path
})

const isCollapse = computed(
  () => !(store.state.userAbout.asideWidth == "200px")
);
const asideMenus = computed(()=>store.state.userAbout.menus)
const handleSelect = (e) => {
  router.push(e);
};
</script>

<style>
.f-menu {
  transition: all 0.2s;
  width: 200px;
  top: 60px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  @apply shadow-md fixed bg-white;
}
.f-menu::-webkit-scrollbar{
    width: 0;
}
</style>