<template>
  <el-aside width="200px" class="image-aside" v-loading="loading">
    <div class="top">
      <AsideList
        v-for="(item) in list"
        :key="item.id"
        :active="activeId == item.id"
        @edit="handleEdit(item)"
        @delete="handleDelete(item.id)"
        @click="handleChangeActiveId(item.id)"
      >
        {{ item.name }}
      </AsideList>
    </div>
    <div class="bottom">
      <el-pagination
        small
        background
        layout="prev, next"
        :total="total"
        :current-page="currentPage"
        :page-size="limit"
        @current-change="getData"
      />
    </div>
  </el-aside>
  <FormDrawer :title="drawerTitle" ref="formDrawerRef" @submit="handleSumbit">
    <el-form
      ref="formRef"
      label-position="left"
      label-width="100px"
      :rules="rules"
      :model="from"
      style="max-width: 460px"
    >
      <el-form-item label="图库名称" required prop="name">
        <el-input v-model="from.name" />
      </el-form-item>
      <el-form-item label="数量" required prop="order">
        <el-input-number v-model="from.order" />
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>

<script setup>
import AsideList from "~/components/AsideList.vue";
import FormDrawer from "~/components/FormDrawer.vue";
import {
  getImageClassList,
  createImageClass,
  updateImageClass,
  deleteImageClass,
} from "~/api/image_class.js";
import { computed, reactive, ref } from "vue";
import { toast } from "~/composables/util";

//列表数据
const list = ref([]);
//加载动画
const loading = ref(false);
//激活列表id
const activeId = ref(0);
//分页
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);
//初始化ID
const editId = ref(0);
//抽屉标题
const drawerTitle = computed(() => (editId.value ? "修改" : "新增"));
//抽屉表单数据
const from = reactive({
  name: "",
  order: 50,
});
const rules = {
  name: [{ required: true, message: "图库名称", trigger: "blur" }],
};
const formRef = ref(null);
//暴露常量数据
const emit = defineEmits(["change"]);

//获取数据
function getData(p = null) {
  //第一页未赋值为null，切换页码则为number
  if (typeof p == "number") {
    currentPage.value = p;
  }
  loading.value = true;
  getImageClassList(currentPage.value)
    .then((res) => {
      total.value = res.totalCount;
      list.value = res.list;
      let item = list.value[0];
      if (item) {
        handleChangeActiveId(item.id)
      }
    })
    .finally(() => {
      loading.value = false;
    });
}
getData();
//传到父组件方法
const formDrawerRef = ref(null);
//初始化抽屉数据
const handleCreate = () => {
  editId.value = 0;
  from.name = "";
  from.order = 50;
  formDrawerRef.value.open();
};
defineExpose({
  handleCreate,
});

//提交新增
const handleSumbit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return;
    formDrawerRef.value.showLoading();
    //定义promise对象判断
    const fun = editId.value
      ? updateImageClass(editId.value, from)
      : createImageClass(form);
    //调用接口
    fun
      .then((res) => {
        toast(drawerTitle.value + "成功");
        getData(editId.value ? currentPage.value : 1);
        formDrawerRef.value.close();
      })
      .finally(() => {
        formDrawerRef.value.hideLoading();
      });
  });
};
//编辑图库
const handleEdit = (row) => {
  editId.value = row.id;
  from.name = row.name;
  from.order = row.order;
  formDrawerRef.value.open();
};
//删除图库
const handleDelete = (id) => {
  deleteImageClass(id)
    .then(res => {
      loading.value = true;
      toast("删除成功");
      getData();
    })
    .finally(() => {
      loading.value = false;
    });
};
//选中图库分类id
function handleChangeActiveId(id) {
  activeId.value = id;
  emit("change", id);
}
</script>

<style scoped>
.image-aside {
  border-right: 1px solid rgba(227, 227, 227, 0.5);
  position: relative;
  height: 100%;
}
.image-aside .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.image-aside .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex justify-center items-center;
}
</style>