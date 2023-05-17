<template>
  <div class="bg-white" :style="{ height: h }">
    <el-container>
      <el-header class="image-header">
        <el-button type="primary" size="default" @click="handleOpenCreate"
          >新增图片分类</el-button
        >
        <el-button type="info" size="default" @click="handleOpenUpload"
          >上传图片</el-button
        >
      </el-header>
      <el-container>
        <ImageAside ref="ImageAsideRef" @change="handleAsideChange" />

        <ImageMain ref="ImageMainRef" />
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ImageAside from "~/components/ImageAside.vue";
import ImageMain from "~/components/ImageMain.vue";

//获取屏幕高度
const windowHeigh = window.innerHeight || document.body.clientHeight;
const h = windowHeigh - 100 - 40 + "px";

const ImageAsideRef = ref(null);
const handleOpenCreate = () => ImageAsideRef.value.handleCreate();
const ImageMainRef = ref(null);
const handleAsideChange = (image_class_id) =>ImageMainRef.value.loadData(image_class_id);
const handleOpenUpload = () => ImageMainRef.value.openUploadFile();
</script>

<style>
.image-header {
  border-bottom: 1px solid rgba(227, 227, 227, 0.5);
  @apply flex items-center;
}
.el-container {
  height: 100%;
}
</style>