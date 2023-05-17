<template>
  <el-row class="login-container">
    <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16" class="left">
      <div>
        <h1 class="font-bold text-5xl mb-5">后台管理系统</h1>
        <p class="text-xl mt-4" style="display: inline">
          <span
            ><img
              src="../assets/vue.svg"
              class="w-10"
              style="display: inline"
            />
            (Vue3) +
            <img
              src="../assets/elementpuls.svg"
              class="w-30"
              style="display: inline"
            />
            (ElementPuls) +
            <img
              src="../assets/vite.svg"
              class="w-10"
              style="display: inline"
            />
            (Vite) 构建的后台商城管理系统</span
          >
        </p>
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="right">
      <h2 class="font-bold text-4xl text-gray-600 mb-5">登 录</h2>
      <el-divider class="w-100"
        ><span class="text-lg text-gray-400 font-bold bg-transparent">
          后台登录</span
        ></el-divider
      >
      <el-form ref="formRef" :rules="rules" :model="form" class="w-70 mt-5">
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            size="large"
            v-model="form.username"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item class="mt-8" prop="password">
          <el-input
            :prefix-icon="Lock"
            size="large"
            type="password"
            show-password
            v-model="form.password"
            placeholder="密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="w-100"
            round
            color="#626aef"
            type="primary"
            @click="onSubmit"
            :loading="loading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeMount } from "vue";
import { Lock, User } from "@element-plus/icons-vue";
import { toast } from "~/composables/util";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const formRef = ref(null);
const loading = ref(false);
const router = useRouter();
const store = useStore();
const form = reactive({
  username: "",
  password: "",
});
const rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 8, message: "用户名长度3-8位", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 10, message: "密码长度3-10", trigger: "blur" },
  ],
});

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false;
    }
    loading.value = true;
    store
      .dispatch("userAbout/login", form)
      .then((res) => {
        //提示用户成功信息
        toast("登陆成功");
        router.push("/");
      })
      .finally(() => {
        loading.value = false;
      });
  });
};

//监听回车事件
function onKeyUp(e) {
  if (e.key == "Enter") onSubmit();
}
onMounted(() => document.addEventListener("keyup", onKeyUp));
onBeforeMount(() => document.removeEventListener("keyup", onKeyUp));
</script>


<style scoped>
.login-container {
  @apply min-h-screen;
  background-image: url('../assets/login-bg.jpg');
  background-size: cover;
}
.login-container .left,
.login-container .right {
  @apply flex items-center text-light-50 justify-center flex-col;
}
.login-container .right {
  @apply bg-white
}
</style>
