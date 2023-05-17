<template>
  <el-card shadow="never" class="border">
    <!--新增/刷新-->
    <ListHeader @create="handleCreate" @refresh="getData" />
    <el-tree
      :default-expanded-keys="defaultExpandedKeys"
      node-key="id"
      v-loading="loading"
      ref="tree"
      :data="tableData"
      :props="{ label: 'name', children: 'child' }"
    >
      <template #default="{ node, data }">
        <div class="custom-tree-node">
          <el-tag size="small" :type="data.menu ? '' : 'info'" class="mx-3">
            {{ data.menu ? "菜单" : "权限" }}</el-tag
          >
          <el-icon v-if="data.icon"
            ><component :is="data.icon"></component
          ></el-icon>
          <span> {{ data.name }}</span>
          <div class="ml-auto">
            <el-switch
              :modelValue="data.status"
              :active-value="1"
              :inactive-value="0"
              @click.native.stop
              @change="handleStatusChange($event, data)"
            >
            </el-switch>
            <el-button
              text
              type="primary"
              size="default"
              @click.stop="handleUpdate(data)"
              >修改</el-button
            >
            <el-button
              text
              type="primary"
              size="default"
              @click.stop="addChild(data.id)"
              >增加</el-button
            >
              <el-popconfirm
                title="是否删除"
                confirmButtonText="确认"
                cancelButtonText="取消"
                @confirm="handleDelete(data.id)"
              >
                <template #reference>
                  <el-button type="primary" @click.native.stop text size="default">删除</el-button>
                </template>
              </el-popconfirm>
          </div>
        </div>
      </template>
    </el-tree>
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="auto"
        :inline="false"
      >
        <el-form-item label="上级菜单" prop="rule_id">
          <el-cascader
            v-model="form.rule_id"
            :options="options"
            :props="{
              label: 'name',
              children: 'child',
              checkStrictly: true,
              emitPath: false,
              value: 'id',
            }"
            placeholder="请选择上级菜单"
          />
        </el-form-item>
        <el-form-item label="菜单/权限" prop="menu">
          <el-radio-group v-model="form.menu" placeholder="菜单/权限">
            <el-radio :label="1" size="large" border>菜单</el-radio>
            <el-radio :label="0" size="large" border>权限</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单/权限名称" prop="name" placeholder="名称">
          <el-input v-model="form.name" style="width: 30%"></el-input>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          prop="icon"
          v-if="form.menu == 1"
          placeholder="请选择图标"
        >
          <IconSelect v-model="form.icon" />
        </el-form-item>
        <el-form-item
          label="前端路由"
          prop="frontpath"
          placeholder="请输入前端路由"
          v-if="form.menu == 1 && form.rule_id > 0"
        >
          <el-input v-model="form.frontpath"></el-input>
        </el-form-item>
        <el-form-item
          label="后端规则"
          prop="condition"
          placeholder="请输入后端规则"
          v-if="form.menu == 0"
        >
          <el-input v-model="form.condition"></el-input>
        </el-form-item>
        <el-form-item
          label="请求方式"
          prop="method"
          v-if="form.menu == 0"
          placeholder="请选择请求方式"
        >
          <el-select v-model="form.method" placeholder="请选择请求方式">
            <el-option
              v-for="item in ['GET', 'POST', 'PUT', 'DELETE']"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number
            v-model="form.order"
            :min="1"
            :max="1000"
            :step="1"
            :controls="true"
          >
          </el-input-number>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import ListHeader from "~/components/ListHeader.vue";
import FormDrawer from "~/components/FormDrawer.vue";
import IconSelect from "~/components/IconSelect.vue";
import {
  getRuleList,
  createRule,
  updateRule,
  deleteRule,
  updateRuleStatus,
} from "~/api/rule.js";
import { useInitTable, useInitForm } from "~/composables/useCommon.js";

const defaultExpandedKeys = ref([]);
const options = ref([]);
const { loading, getData, tableData, handleStatusChange, handleDelete } =
  useInitTable({
    getList: getRuleList,
    onGetListSuccess: (res) => {
      options.value = res.rules;
      tableData.value = res.list;
      defaultExpandedKeys.value = res.list.map((o) => o.id);
    },
    delete: deleteRule,
    updateStatus: updateRuleStatus,
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
  update: updateRule,
  create: createRule,
  form: {
    rule_id: 0,
    menu: 0,
    name: "",
    condition: "",
    method: "GET",
    status: 1,
    order: 50,
    icon: "",
    frontpath: "",
  },
  rules: {},
});
//添加子分类
const addChild = (id) => {
  handleCreate(); //会重置表单
  form.rule_id = id;
  form.status = 1;
};
</script>

<style scoped>
.custom-tree-node {
  display: flex;
  flex: 1;
  align-items: center;
  font-size: 16px;
  padding-right: 8px;
}
:deep(.el-tree-node__content) {
  padding: 20px 0;
}
</style>