import { reactive, ref } from "vue";
import { updatepassword, logout } from "~/api/manager";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { toast,showModal } from "~/composables/util";
//修改密码
export function useRepassword() {
    //路由 vuex实例
    const router = useRouter();
    const store = useStore();
    //抽屉展开和传参
    const formDrawerRef = ref(null);
    //表单
    const formRef = ref(null);
    const from = reactive({
        oldpassword: "",
        passwrod: "",
        repassword: "",
    });
    const rules = reactive({
        oldpassword: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        password: [
            { required: true, message: "请输入新密码密码", trigger: "blur" },
        ],
        repassword: [
            { required: true, message: "请确认新密码密码", trigger: "blur" },
        ],
    });
    //提交登录
    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return false;
            }
            formDrawerRef.value.showLoading();
            updatepassword(from)
                .then((res) => {
                    toast("修改密码成功,请重新登录");
                    store.dispatch("userAbout/logout");
                    router.push("./login");
                })
                .finally(() => {
                    formDrawerRef.value.hideLoading();
                });
        });
    };
    const openRepassword = () => formDrawerRef.value.open();
    return {
        formDrawerRef,
        formRef,
        from,
        rules,
        onSubmit,
        openRepassword,
    };
}
//退出登录
export function useLogout() {
    //路由 vuex实例
    const router = useRouter();
    const store = useStore();
    function handlelogout() {
        showModal("是否要退出登录？").then((res) => {
            logout().finally((res) => {
                store.dispatch("userAbout/logout");
                //跳转登录
                router.push("./login");
                //提示
                toast("退出登录成功");
            });
        });
    }
    return {
        handlelogout
    }
}