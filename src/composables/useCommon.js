import { reactive, ref, computed } from "vue";
import { toast } from "~/composables/util";
//列表分页和搜索
export function useInitTable(opt = {}) {
    let searchForm = null
    let resetsearchForm = null
    if (opt.searchForm) {
        searchForm = reactive({ ...opt.searchForm })
        resetsearchForm = () => {
            for (const key in opt.searchForm) {
                searchForm[key] = opt.searchForm[key]
            }
            getData()
        }
    }
    //分页
    const tableData = ref([]);
    const currentPage = ref(1);
    const total = ref(0);
    const limit = ref(12);
    const loading = ref(false);
    function getData(p = null) {
        //第一页未赋值为null，切换页码则为number
        if (typeof p == "number") {
            currentPage.value = p;
        }
        loading.value = true;
        opt.getList(currentPage.value, searchForm)
            .then((res) => {
                if (opt.onGetListSuccess && typeof opt.onGetListSuccess == 'function') {
                    opt.onGetListSuccess(res)
                }
                else {
                    tableData.value = res.list;
                    total.value = res.totalCount;
                }
            })
            .finally(() => {
                loading.value = false;
            });
    }
    getData();

    //修改状态
    const handleStatusChange = (status, row) => {
        console.log(status);
        row.statusLoading = true;
        opt.updateStatus(row.id, status)
            .then((res) => {
                toast("修改状态成功");
                row.status = status;
            })
            .finally(() => {
                row.statusLoading = false;
            });
    };

    //删除
    const handleDelete = (id) => {
        loading.value = true;
        opt.delete(id)
            .then((res) => {
                toast("删除成功");
                getData();
            })
            .finally(() => {
                loading.value = false;
            });
    };
    //多选选中id
    const multipleTableRef = ref(null)
    const multiSelectionIds = ref([]);
    const handleSelectionChange = (e) => {
        multiSelectionIds.value = e.map((o) => o.id);
    };
    const handleMultiDelete = () => {
        loading.value = true;
        opt.delete(multiSelectionIds.value)
            .then((res) => {
                toast("批量删除成功");
                if (multipleTableRef.value) {
                    multipleTableRef.value.clearSelection()
                }
                getData();
            })
            .finally(() => {
                multipleTableRef.value.clearSelection()
                loading.value = false;
            });
    };
    return {
        searchForm,
        resetsearchForm,
        currentPage,
        total,
        limit,
        loading,
        getData,
        tableData,
        handleStatusChange,
        handleDelete,
        handleSelectionChange,
        handleMultiDelete,
        multipleTableRef
    }
}
//新增和修改
export function useInitForm(opt = {}) {
    const formDrawerRef = ref(null);
    const editId = ref(0);
    const defaultForm = opt.form
    const drawerTitle = computed(() =>
        editId.value ? "修改" : "新增"
    );

    //表单
    const formRef = ref(null);
    const form = reactive({});
    const rules = opt.rules || {};
    //重置表单
    function restForm(row = false) {
        if (formRef.value) formRef.value.clearValidate();
        for (const key in defaultForm) {
            form[key] = row[key];
        }
    }
    //新增
    const handleSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) return;
            //提交按钮loading效果
            formDrawerRef.value.showLoading();
            const fun = editId.value
                ? opt.update(editId.value, form)
                : opt.create(form);
            fun
                .then((res) => {
                    toast(drawerTitle.value + "成功");
                    opt.getData(editId.value ? false : 1);
                    formDrawerRef.value.close();
                })
                .finally(() => {
                    formDrawerRef.value.hideLoading();
                });
        });
    };
    const handleCreate = () => {
        editId.value = 0;
        restForm(defaultForm);
        formDrawerRef.value.open();
    };
    //编辑
    const handleUpdate = (row) => {
        editId.value = row.id;
        restForm(row);
        formDrawerRef.value.open();
    };
    return {
        formDrawerRef,
        editId,
        drawerTitle,
        formRef,
        form,
        rules,
        handleUpdate,
        restForm,
        handleSubmit,
        handleCreate
    }
}