<template>
  <div class="f-header">
    <span class="logo">
      <img src="../../assets/vite.svg" class="w-10 mr-3" />
      后台管理系统
    </span>
    <el-tooltip
      class="box-item"
      effect="dark"
      content="缩放"
      placement="bottom"
    >
      <el-icon
        class="icon-btn"
        @click="$store.commit('userAbout/handleAsideWidth')"
      >
        <Fold v-if="$store.state.userAbout.asideWidth == '200px'" />
        <Expand v-else />
      </el-icon>
    </el-tooltip>
    <el-tooltip
      class="box-item"
      effect="dark"
      content="刷新"
      placement="bottom"
    >
      <el-icon class="icon-btn" @click="handleRefresh"><Refresh /></el-icon>
    </el-tooltip>
    <div class="header-r">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="全屏"
        placement="bottom"
      >
        <el-icon class="icon-btn" @click="toggle">
          <full-screen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
      <el-dropdown trigger="click" class="dropdown" @command="handleCommand">
        <span class="avatar el-dropdown-link">
          <el-avatar
            class="mr-2"
            :size="35"
            :src="$store.state.userAbout.user.avatar"
          />
          {{ $store.state.userAbout.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="preson">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout" divided
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <FormDrawer
    ref="formDrawerRef"
    title="修改密码"
    destroyOnClose
    @submit="onSubmit"
  >
    <el-form
      ref="formRef"
      label-position="left"
      label-width="100px"
      :rules="rules"
      :model="from"
      style="max-width: 460px"
    >
      <el-form-item label="旧密码" required prop="oldpassword">
        <el-input v-model="from.oldpassword" />
      </el-form-item>
      <el-form-item label="新密码" required prop="password">
        <el-input v-model="from.password" />
      </el-form-item>
      <el-form-item label="确认新密码" required prop="repassword">
        <el-input v-model="from.repassword" />
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<script setup>
import { useFullscreen } from "@vueuse/core";
import FormDrawer from "~/components/FormDrawer.vue";
import { useRepassword, useLogout } from "~/composables/useManager";

//全屏
const { isFullscreen, toggle } = useFullscreen();
//修改密码解构
const { formDrawerRef, formRef, from, rules, onSubmit, openRepassword } =
  useRepassword();
//退出登录解构
const { handlelogout } = useLogout();

//下拉菜单点击逻辑
const handleCommand = (c) => {
  switch (c) {
    case "logout":
      handlelogout();
      break;
    case "rePassword":
      openRepassword();
      break;
    default:
      break;
  }
};

//页面刷新
const handleRefresh = () => location.reload();
</script>

<style>
.f-header {
  @apply flex bg-indigo-400 text-light-50 fixed top-0 left-0 right-0 items-center;
  height: 60px;
  z-index: 1000;
}
.logo {
  @apply justify-center w-50 items-center flex font-bold;
}
.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 60px;
  cursor: pointer;
}
.icon-btn:hover {
  @apply bg-indigo-300;
}
.f-header .dropdown {
  height: 60px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
.header-r {
  @apply ml-auto flex justify-center items-center;
}
.header-r .avatar {
  @apply flex items-center text-light-50;
}
</style>