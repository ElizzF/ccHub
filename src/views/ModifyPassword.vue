<template>
    <div class='container' style="background: #FFF;">
        <!-- 导航栏 -->
        <van-nav-bar
            title="修改密码"
            class="navbar"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        
        <div class='main' style="margin-top: 40px;">
           
            <van-field
                v-model="oldPassword"
                type="password"
                name="旧密码"
                placeholder="输入旧密码"
                center
                style="border-bottom: 1px solid rgb(204, 204, 204); width: 284px; margin-bottom: 5px;"
            >
                <template #left-icon>
                    <van-icon class-prefix="iconfont icon" name="againpassword"  />
                </template>
            </van-field>
            <van-field
                v-model="newPassword"
                type="password"
                name="新密码"
                placeholder="输入新密码"
                center
                style="border-bottom: 1px solid rgb(204, 204, 204); width: 284px; margin-bottom: 5px;"
            >
                <template #left-icon>
                    <van-icon class-prefix="iconfont icon" name="password"  />
                </template>
            </van-field>
            <van-field
                v-model="againNewPassword"
                type="password"
                name="确认密码"
                placeholder="输入确认密码"
                center
                left-icon="star-o"
                style="border-bottom: 1px solid rgb(204, 204, 204); width: 284px;"
            >
                <template #left-icon>
                    <van-icon class-prefix="iconfont icon" name="password"  />
                </template>
            </van-field>
            <van-button type="info" @click="modifyPassword" round block style="margin-top: 30px;">确定</van-button>
            
        </div>
       
        


        
      
    </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
    data() {
        return {
            oldPassword: '',
            newPassword: '',
            againNewPassword: ''
        };
    },
    created() {
       
    },
    methods: {
        onClickLeft() {
            this.$router.push({
                path: '/mine'
            })
        },
        modifyPassword() {
            if(this.newPassword != this.againNewPassword) {
                Dialog.alert({
                    title: '警告',
                    theme: 'round-button',
                    message: '输入的密码与确认密码不相符',
                    confirmButtonColor: '#1989FA'
                });
                return ;
            }
            let userKey = JSON.parse(localStorage.getItem('userData'));
            this.axios({
                method: "PUT",
                url: "https://soft.leavessoft.cn/user/modifyPassword",
                data: {
                    "prePassword": this.oldPassword,
                    "password": this.newPassword,
                },
                headers: {
                    'Authorization': userKey.accesstoken
                }
            }).then(() => {
                Dialog.alert({
                    title: '提示',
                    theme: 'round-button',
                    message: '密码修改成功！',
                    confirmButtonColor: '#1989FA'
                })
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
.van-cell__value {
    margin-left: 20px !important;
}

</style>