<template>
    <div class='container' style="background: #FFF;">
        <!-- 导航栏 -->
        <van-nav-bar
            title="忘记密码"
            class="navbar"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class='main' v-if="display">
            <div class='mainTxt'>输入绑定邮箱</div>
            <div class='subTxt'>向邮箱发送验证码</div>
            <van-field
                class='sendField'
                v-model="email"
                name="邮箱"
                label='邮箱'
                center
                autocomplete="off"
                style="border-bottom: 1px solid rgb(204, 204, 204); width: 284px; margin-bottom: 5px;"
            />
            <van-button type="info" @click="sendEmail" round block style="margin-top: 30px;">确认</van-button>
            
        </div>
       
        <div class='anotherMain' v-if="!display">
            <van-field
                class='arSendField'
                v-model="password"
                type="password"
                name="密码"
                placeholder="请输入新的密码"
                center
                label='密码'
                style="border-bottom: 1px solid rgb(204, 204, 204); width: 284px;"
            />

            <van-field
                class='arSendField'
                v-model="code"
                name="验证码"
                label='验证码'
                center
                placeholder="请输入6位验证码"
                autocomplete="off"
                style="border-bottom: 1px solid rgb(204, 204, 204); width: 284px;"
            />

            <van-button type="info" @click="resetPassword" round block style="margin-top: 30px;">修改</van-button>
        </div>


        
      
    </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
    data() {
        return {
            email: '',
            password: '',
            code: '',
            
            display: true
  
        };
    },
    created() {
       
    },
    methods: {
        onClickLeft() {
            if(this.display == true) {
                this.$router.push({
                    path: '/login'
                })
            }
            else {
                this.display = true;
            }
        },
        sendEmail() {
            if(this.email == '') {
                Dialog.alert({
                    title: '警告',
                    theme: 'round-button',
                    message: '输入邮箱不能为空！',
                    confirmButtonColor: '#1989FA'
                });
                return ;
            }
            this.axios({
                method: "GET",
                url: "https://soft.leavessoft.cn/mail/sendResetEmail/" + this.email,
                data: {
                    "email": this.email
                },
            }).then(() => {
                Dialog.alert({
                    title: '提示',
                    theme: 'round-button',
                    message: '发送成功！',
                    confirmButtonColor: '#1989FA'
                })
                this.display = false;
            }).catch((error) => {
                Dialog.alert({
                    title: '警告',
                    theme: 'round-button',
                    message: error.response.data.message,
                    confirmButtonColor: '#1989FA'
                })
            });
        },
        resetPassword() {
            this.axios({
                method: "POST",
                url: "https://soft.leavessoft.cn/user/resetPassword",
                data: {
                    "email": this.email,
                    "password": this.password,
                    "code": this.code
                },
            }).then(() => {
                Dialog.alert({
                    title: '提示',
                    theme: 'round-button',
                    message: '重置密码成功！',
                    confirmButtonColor: '#1989FA'
                })
                this.$router.push({
                    path: '/login'
                });
            }).catch((error) => {
                Dialog.alert({
                    title: '警告',
                    theme: 'round-button',
                    message: error.response.data.message,
                    confirmButtonColor: '#1989FA'
                })
            });
        }
    }
}
</script>

<style scoped>
.navbar {
    background: #0079FE;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
}
.container {
    height: 100%;
    background: #FFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.mainTxt {
    font-size: 25px;
}
.subTxt {
    color: #969799;
    margin-top: 5px;
    font-size: 13px;
    display: flex;
    margin-bottom: 20px;
}
</style>

<style>
.navbar .van-nav-bar__title {
    color: #FFF;
}
.van-nav-bar .van-icon, .van-nav-bar__text {
    color: #FFF;
}

.van-field__label {
    color: #323233;
}
.van-field__control {
    color: #969799;
}
.sendField .van-cell__value {
    margin-left: -50px !important;
}
.arSendField .van-cell__value {
    margin-left: -45px !important;
}

</style>