<template>
    <div class='container'>
        <van-nav-bar
            title="注册"
            class="navbar"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />

        <van-image width="100" height="100" :src="require('../assets/image/logo.jpg')" />
        <div class='main' style="margin-top: 35px;">
            <van-field
                v-model="username"
                name="用户名" 
                placeholder="用户名"
                left-icon="contact"
                center
                autocomplete="off"
                style="border-bottom: 1px solid rgb(204, 204, 204); width: 284px;margin-bottom: 8px;"
            />
            <van-field
                v-model="phone"
                name="手机号码" 
                placeholder="手机号码"
                left-icon="contact"
                center
                autocomplete="off"
                style="border-bottom: 1px solid rgb(204, 204, 204); width: 284px;margin-bottom: 8px;"
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
                style="border-bottom: 1px solid rgb(204, 204, 204); width: 284px;margin-bottom: 8px;"
            >
                <template #left-icon>
                    <van-icon class-prefix="iconfont icon" name="password" />
                </template>
            </van-field>
            <van-field
                v-model="email"
                name="邮箱"
                placeholder="邮箱"
                center
                left-icon="star-o"
                autocomplete="off"
                style="border-bottom: 1px solid rgb(204, 204, 204); width: 284px;margin-bottom: 8px;"
            >
                <template #left-icon>
                    <van-icon class-prefix="iconfont icon" name="email" />
                </template>
            </van-field>
            <van-field
                v-model="sno"
                name="学号"
                placeholder="学号"
                center
                left-icon="star-o"
                autocomplete="off"
                style="border-bottom: 1px solid rgb(204, 204, 204); width: 284px;margin-bottom: 8px;"
            />
            <div class='readed' style="margin-top: 30px">
                <van-checkbox v-model="checked" style="margin-right: 5px;"></van-checkbox>
                <div class='treaty' style="display: flex" @click="isChecked">已阅读并同意《<div class='treatys'>用户服务协议</div>》</div>
                
            </div>
            <van-button type="info" @click="register" round block style="margin-top: 25px;">注册</van-button>
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant' 
export default {
    data() {
        return {
            username: '',
            password: '',
            phone: '',
            email: '',
            sno: '',
            checked: true
        }
    },
   
    methods: {
        register() {
            if(!this.checked) {
                Dialog.alert({
                    title: '警告',
                    message: "尚未同意《用户服务协议》",
                    theme: 'round-button',
                    confirmButtonColor: '#1989FA'
                })
                return;
            }
            this.axios({
                method: "POST",
                url: "/user/register",
                data: {
                    "username": this.username,
                    "phone": this.phone,
                    "password": this.password,
                    "email": this.email,
                    "sno": this.sno
                },
            }).then(() => {
                Dialog.alert({
                    title: '提示',
                    message: "注册成功",
                    theme: 'round-button',
                    confirmButtonColor: '#1989FA'
                })
                .then(() => {
                    this.username = "";
                    this.password = "";
                    this.phone = "";
                    this.email = "";
                    this.sno = "";
                    this.$router.push({
                        path: '/'
                    })
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
        onClickLeft() {
            this.$router.push({
                path: '/'
            })
        },
        isChecked() {
            this.checked = !this.checked;
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
    cursor: pointer;
}
.treatys {
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
.van-image__img {
    border-radius: 13px;
}
</style>