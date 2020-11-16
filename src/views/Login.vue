<template>
    <div class='container'>
        <van-nav-bar
            title="竞枢"
            class="navbar"
        />

        <van-image width="100" height="100" :src="require('../assets/image/logo.jpg')" />
        <div class='main' style="margin-top: 40px;">
            <van-field
                v-model="phone"
                name="手机号码" 
                placeholder="手机号码"                
                center
                style="border-bottom: 1px solid rgb(204, 204, 204); width: 284px;"
            >
                <template #left-icon>
                    <van-icon class-prefix="iconfont icon" name="phone"  />
                </template>
            </van-field>
            <van-field
                v-model="password"
                type="password"
                name="密码"
                placeholder="密码"
                center
                style="border-bottom: 1px solid rgb(204, 204, 204); width: 284px;"
            >
                <template #left-icon>
                    <van-icon class-prefix="iconfont icon" name="password"  />
                </template>
            </van-field>
            <div class='forgetPassword' @click='forgetPassword'>忘记密码</div>
            <van-button type="info" @click="login" round block style="margin-top: 20px;">登录</van-button>
            <div class='createUser' @click='register'>创建账号</div>
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant' 
export default {
    data() {
        return {
            phone: '',
            password: '',
        }
    },
    methods: {
        login() {
            this.axios({
                method: "POST",
                url: "http://49.234.239.138:82/user/login",
                data: {
                    "phone": this.phone,
                    "password": this.password,
                },
            }).then((res) => {
                localStorage.setItem('userData', JSON.stringify(res.data.data));
                this.$router.push({
                    path: '/'
                })
            }).catch((error) => {
                Dialog.alert({
                    title: '警告',
                    theme: 'round-button',
                    message: error.response.data.message,
                    confirmButtonColor: '#1989FA'
                })
            });
            
        },
        register() {
            this.$router.push({
                path: '/register'
            })
        },
        forgetPassword() {
            this.$router.push({
                path: 'forgetPassword'
            })
        }
    }
}
</script>

<style scoped>
.container {
    height: 100%;
    background: #FFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.navbar {
    background: #0079FE;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}
.forgetPassword {
    color: #0079FE;
    margin-top: 15px;
    font-size: 13px;
    display: flex;
    flex-direction: row-reverse;
}
.createUser {
    color: #0079FE;
    margin-top: 15px;
    font-size: 13px;
    display: flex;
    justify-content: center;
    cursor: pointer;
}
</style>

<style>
.navbar .van-nav-bar__title {
    color: #FFF;
}
.van-cell__value {
    margin-left: 20px !important;
}
.van-image__img {
    border-radius: 13px;
}
</style>