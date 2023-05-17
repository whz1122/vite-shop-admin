<template>
  <div v-if="modelValue"  class="w-[100px] h-[100px] mr-2">
    <el-image :src="modelValue" fit="cover" class="w-[100px] h-[100px] rounded "></el-image>
    
  </div>
  <div>
    <div class="choose-image-btn" @click="open">
      <el-icon><Plus /></el-icon>
    </div>
    <el-dialog title="选择图片" v-model="dialogVisible" width="80%" top="5vh">
      <div class="bg-white" style="height: 70vh;">
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

            <ImageMain openChoose ref="ImageMainRef" @choose="handleChoose"/>
          </el-container>
        </el-container>
      </div>
      <template #footer>
        <span>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submit">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ImageAside from "~/components/ImageAside.vue";
import ImageMain from "~/components/ImageMain.vue";


const ImageAsideRef = ref(null);
const handleOpenCreate = () => ImageAsideRef.value.handleCreate();
const ImageMainRef = ref(null);
const handleAsideChange = (image_class_id) =>
  ImageMainRef.value.loadData(image_class_id);
const handleOpenUpload = () => ImageMainRef.value.openUploadFile();


const dialogVisible = ref(false);

const open = () => (dialogVisible.value = true);
const close = () => (dialogVisible.value = false);
const props= defineProps({
  modelValue:[String,Array]
})
const emit=defineEmits(['update:modelValue'])
let urls=[]
const handleChoose=(e)=>{
  urls=e.map(o=>o.url)
}
const submit = () => {
  if(urls.length){
    emit('update:modelValue',urls[0])
  }
  close()
};

</script>

<style>
.choose-image-btn {
  @apply w-[100px] h-[100px] text-gray-500 rounded border flex justify-center items-center
    cursor: pointer hover:(bg-gray-100);
}
.image-header {
  border-bottom: 1px solid rgba(227, 227, 227, 0.5);
  @apply flex items-center;
}
.el-container {
  height: 100%;
}
</style>