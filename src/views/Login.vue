<template>
    <div class='container'>
        <van-nav-bar
            title="竞枢"
            class="navbar"
        />

        <div class='main'>
            <van-field
                v-model="username"
                name="手机号码" 
                placeholder="手机号码"
                left-icon="contact"
                center
                style="border-bottom: 1px solid rgb(204, 204, 204); width: 284px;"
                :rules="[{ required: true, message: '请填写手机号码' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
                placeholder="密码"
                center
                left-icon="star-o"
                style="border-bottom: 1px solid rgb(204, 204, 204); width: 284px;"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div class='forgetPassword'>忘记密码</div>
            <van-button type="info" @click="login" round block style="margin-top: 20px;">登录</van-button>
            <div class='createUser' @click='register'>创建账号</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        login() {
            this.$router.push({
                path: '/'
            })
        },
        register() {
            this.$router.push({
                path: '/register'
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
}
</style>

<style>
.navbar .van-nav-bar__title {
    color: #FFF;
}
.van-cell__value {
    margin-left: 20px !important;
}
</style>