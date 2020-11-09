<template>
    <div class='container'>
        <van-nav-bar
            title="注册"
            class="navbar"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />

        <div class='main'>
            <van-field
                v-model="username"
                name="手机号码" 
                placeholder="手机号码"
                left-icon="contact"
                center
                style="border-bottom: 1px solid rgb(204, 204, 204); width: 284px;margin-bottom: 8px;"
                :rules="[{ required: true, message: '请填写手机号码' }]"
            />
            <van-field
                v-model="username"
                name="短信验证码" 
                placeholder="短信验证码"
                left-icon="contact"
                center
                style="border-bottom: 1px solid rgb(204, 204, 204); width: 284px;margin-bottom: 8px;"
               
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
                placeholder="密码"
                center
                left-icon="star-o"
                style="border-bottom: 1px solid rgb(204, 204, 204); width: 284px;margin-bottom: 8px;"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div class='readed'>
                <van-checkbox v-model="checked" style="margin-right: 5px;"></van-checkbox>
                <div style="display: flex">已阅读并同意《<div class='treaty'>用户服务协议</div>》</div>
                
            </div>
            <van-button type="info" @click="login" round block style="margin-top: 20px;">注册</van-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            checked: true
        }
    },
    methods: {
        login() {
            this.$router.push({
                path: '/'
            })
        },
        onClickLeft() {
            this.$router.push({
                path: '/login'
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
.readed {
    margin-top: 20px;
    font-size: 13px;
    display: flex;
    align-items: center;
}
.treaty {
    color: #0079FE;
}
.createUser {
    color: #0079FE;
    margin-top: 25px;
    font-size: 13px;
    display: flex;
    justify-content: center;
}
</style>

<style>
.navbar .van-nav-bar__title {
    color: #FFF;
}
.van-nav-bar .van-icon, .van-nav-bar__text {
  color: #FFF;
}
.van-cell__value {
    margin-left: 20px !important;
}
</style>