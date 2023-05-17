<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <FHeaderVue />
      </el-header>
      <el-container>
        <el-aside :width="$store.state.userAbout.asideWidth">
          <FMenuVue />
        </el-aside>
        <el-main>
          <FTagListVue />
          <router-view v-slot="{ Component }">
            <transition name="fade">
              <keep-alive :max="5">
                <component :is="Component"></component>
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import FHeaderVue from "./components/FHeader.vue";
import FTagListVue from "./components/FTagList.vue";
import FMenuVue from "./components/FMenu.vue";
</script>

<style>
.el-aside {
  transition: all 0.2s;
}
.fade-enter-from,.fade-leave-to{
   opacity: 0;
}
.fade-enter-to,.fade-leave-from{
    opacity: 1;
}
.fade-enter-active,.fade-leave-active{
    transition: all .3s;
}
.fade-enter-active{
  transition-delay: .3s;
}

</style>