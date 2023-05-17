<template>
  <el-card shadow="never" class="border-0">
    <!--新增/刷新-->
   <ListHeader @create="handleCreate" @refresh="getData"/>
    <div v-loading="loading">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="title" label="公告标题" />
        <el-table-column prop="content" label="内容" />
        <el-table-column prop="create_time" label="创建时间" width="300" />
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              text
              size="default"
              @click="handleUpdate(scope.row)"
              >修改</el-button
            >
            <el-popconfirm
              title="是否删除该分类"
              confirmButtonText="确认"
              cancelButtonText="取消"
              @confirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button type="primary" text size="default">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex items-center justify-center mt-5">
        <el-pagination
          small
          background
          layout="prev,pager,next"
          :total="total"
          :current-page="currentPage"
          :page-size="limit"
          @current-change="getData"
        />
      </div>
    </div>
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
      >
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>

<script setup>
import FormDrawer from "~/components/FormDrawer.vue";
import ListHeader from "~/components/ListHeader.vue";
import {
  getNoticeList,
  createNotice,
  updateNotice,
  deleteNotice,
} from "~/api/notice.js";
import { useInitTable, useInitForm } from "~/composables/useCommon.js";
const { currentPage, total, limit, loading, getData, tableData, handleDelete } =
  useInitTable({
    getList: getNoticeList,
    delete: deleteNotice,
  });
//vue3组合式API
const {
  formDrawerRef,
  editId,
  drawerTitle,
  formRef,
  form,
  rules,
  handleUpdate,
  restForm,
  handleSubmit,
  handleCreate,
} = useInitForm({
  getData,
  update: updateNotice,
  create: createNotice,
  form: {
    title: "",
    content: "",
  },
  rules: {
    title: [{ required: true, message: "公告标题不能为空", trigger: "blur" }],
    content: [{ required: true, message: "公告内容不能为空", trigger: "blur" }],
  },
});
getData();
</script>

<style>
</style>