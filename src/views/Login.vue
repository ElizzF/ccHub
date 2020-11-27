<template>
    <div class="container">
        <van-nav-bar title="竞枢" class="navbar" />

        <van-image
            width="100"
            height="100"
            :src="require('../assets/image/logo.jpg')"
        />
        <div class="main" style="margin-top: 40px">
            <van-field
                v-model="phone"
                name="手机号码"
                placeholder="手机号码"
                center
                autocomplete="off"
                style="
                    border-bottom: 1px solid rgb(204, 204, 204);
                    width: 284px;
                "
            >
                <template #left-icon>
                    <van-icon class-prefix="iconfont icon" name="phone" />
                </template>
            </van-field>
            <van-field
                v-model="password"
                type="password"
                name="密码"
                placeholder="密码"
                center
                autocomplete="off"
                style="
                    border-bottom: 1px solid rgb(204, 204, 204);
                    width: 284px;
                "
                @keydown.native="loginEvent"
            >
                <template #left-icon>
                    <van-icon class-prefix="iconfont icon" name="password" />
                </template>
            </van-field>
            <div class="forgetPassword" @click="forgetPassword">忘记密码</div>
            <van-button
                @keydown.native="loginEvent"
                type="info"
                @click="login"
                round
                block
                style="margin-top: 20px"
                >登录</van-button
            >
            <div class="createUser" @click="register">创建账号</div>
        </div>
    </div>
</template>

<script>
import { Dialog } from "vant";
import { mapActions, mapMutations } from "vuex";
export default {
    data() {
        return {
            phone: "",
            password: "",
        };
    },
    mounted() {},
    methods: {
        ...mapMutations(["setUserInfo"]),
        ...mapActions(["updateUser"]),
        loginEvent(event) {
            if (event.key == "Enter") {
                this.login();
            }
        },
        login() {
            this.$api.User.Login(this.phone, this.password)
                .then((data) => {
                    this.setUserInfo(data.data);
                    this.updateUser();
                    if (
                        this.$route.query.redirect &&
                        this.$route.query.redirect.indexOf("/") == -1
                    ) {
                        this.$router.push({
                            path: this.$route.query.redirect,
                        });
                    } else {
                        this.$router.push({
                            path: "/home",
                        });
                    }
                })
                .catch((error) => {
                    Dialog.alert({
                        title: "警告",
                        theme: "round-button",
                        message: error.message,
                        confirmButtonColor: "#1989FA",
                    });
                });
        },
        register() {
            this.$router.push({
                path: "/register",
            });
        },
        forgetPassword() {
            this.$router.push({
                path: "/forgetPassword",
            });
        },
    },
};
</script>

<style scoped>
.container {
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.navbar {
    background: #0079fe;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}
.forgetPassword {
    color: #0079fe;
    margin-top: 15px;
    font-size: 13px;
    display: flex;
    flex-direction: row-reverse;
}
.createUser {
    color: #0079fe;
    margin-top: 15px;
    font-size: 13px;
    display: flex;
    justify-content: center;
    cursor: pointer;
}
</style>

<style>
.navbar .van-nav-bar__title {
    color: #fff;
}
.van-cell__value {
    margin-left: 20px !important;
}
.van-image__img {
    border-radius: 13px;
}
</style>