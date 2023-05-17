<template>
  <el-card shadow="never" class="border-0">
    <!--新增/刷新-->
    <ListHeader
      layout="create,delete,refresh"
      @create="handleCreate"
      @delete="handleMultiDelete"
      @refresh="getData"
    />
    <div v-loading="loading">
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="规格名称" />
        <el-table-column prop="default" label="默认规格">
          <template #default="{ row }">
            <el-tag
              effect="plain"
              round
              class="ml-1 mt-1"
              v-for="item in row.default ? row.default.split(',') : []"
              :key="item"
            >
              {{ item }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="order" label="排序" />
        <el-table-column label="状态">
          <template #default="{ row }">
            <el-switch
              :loading="row.statusLoading"
              :active-value="true"
              :inactive-value="false"
              :modelValue="row.status"
              :disabled="row.super == 1"
              :activeValue="1"
              :inactiveValue="0"
              @change="handleStatusChange($event, row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              text
              size="default"
              @click="handleUpdate(scope.row)"
              >修改</el-button
            >
            <el-popconfirm
              title="是否删除该规格"
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
    <FormDrawer
      destroyOnClose
      ref="formDrawerRef"
      :title="drawerTitle"
      @submit="handleSubmit"
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
      >
        <el-form-item label="规格名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="规格值" prop="default">
          <TagInput v-model="form.default" />
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="form.order"></el-input-number>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import ListHeader from "~/components/ListHeader.vue";
import FormDrawer from "~/components/FormDrawer.vue";
import TagInput from "~/components/TagInput.vue";
import { toast } from "~/composables/util.js";
import {
  getSkusList,
  createSkus,
  updateSkus,
  deleteSkus,
  updateSkusStatus,
} from "~/api/skus.js";
import { useInitTable, useInitForm } from "~/composables/useCommon.js";
const {
  currentPage,
  total,
  limit,
  loading,
  getData,
  tableData,
  handleDelete,
  handleStatusChange,
  handleSelectionChange,
  handleMultiDelete,
  multipleTableRef,
} = useInitTable({
  getList: getSkusList,
  delete: deleteSkus,
  updateStatus: updateSkusStatus,
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
  update: updateSkus,
  create: createSkus,
  form: {
    name: "",
    default: "",
    status: 1,
    order: 50,
  },
  rules: {
    name: [{ required: true, message: "不能为空", trigger: "blur" }],
  },
});
</script>

<style>
</style>