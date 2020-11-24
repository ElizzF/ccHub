<template>
    <div class='container' style="background: rgba(242,242,242);">
        <!-- 导航栏 -->
        <van-nav-bar
            title="个人资料"
            class="navbar"
            left-text="返回"
            right-text="保存"
            left-arrow
            @click-left="onClickLeft"
            @click-right="updateUserData"
        />
        
        <van-cell title="头像" size='large' style="padding-top: 60px; align-items: center;position: relative">
            <template #right-icon>
                <van-image
                    round
                    width="3rem"
                    height="3rem"
                    style="position: absolute; right: 16px; pointer-events: none; z-index: 1;"
                    :src="avatarImg"
                />
                <van-uploader :after-read="afterRead" multiple :max-count="1"/>
            </template>
        </van-cell>
       
        <div class="cellList">
            <van-field label="用户名" size='large' v-model="username" clearable input-align="right"/>
            <van-field label="姓名" size='large' v-model="name" clearable input-align="right"/>
           
            <van-cell title="性别" size='large' v-model="sex" @click="show = true" />
            <van-action-sheet v-model="show" :actions="actions" @select="sexSelect" />
            <van-field label="电话号码" size='large' v-model="phone" clearable input-align="right"/>
            <van-field label="邮箱" size='large' v-model="email" clearable input-align="right"/>
          
        </div>

        <div class='cellList'>
            <van-cell title="个人简介" size='large' is-link to="/personalIntroduce" />
        </div>

    </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
    data() {
        return {
            show: false,
            actions: [{ name: '男' }, { name: '女' }],

            username: '',
            name: '张三',
            phone: '',
            email: '',
            sex: '',

            avatarImg: '',
            flag: 0
        };
    },
    created() {
        this.initUserData();
    },
    methods: {
        initUserData() {
            let userKey = JSON.parse(localStorage.getItem('userData'));
            this.axios({
                method: "GET",
                url: "/user/getInfo/0",
                headers: {
                    'Authorization': userKey.accesstoken
                }
            }).then((res) => {
                let userData = res.data.data;
                this.username = userData.username;
                this.phone = userData.phone;
                this.email = userData.email;
                this.avatarImg = userData.avatar_url;
                this.name = userData.name;
                if(userData.sex == 1) this.sex = '男';
                else this.sex = '女';
            })
        },
        updateUserData() {
            var emailReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
            if (!emailReg.test(this.email)) {
                Dialog.alert({
                    title: '警告',
                    theme: 'round-button',
                    message: '你输入的邮箱格式不正确！',
                    confirmButtonColor: '#1989FA'
                })
                return;
            }
            if(this.flag) {
                this.uploadAvatar();
                this.flag = 0;
            }
            let userKey = JSON.parse(localStorage.getItem('userData'));
            let sexKey = '';
            if(this.sex == '女') sexKey = 0;
            else if(this.sex == '男') sexKey = 1;
            this.axios({
                method: "POST",
                url: "/user/update",
                headers: {
                    'Authorization': userKey.accesstoken
                },
                data: {
                    "username": this.username,
                    "email": this.email, 
                    "phone": this.phone,
                    "description": this.description,
                    "name": this.name,
                    "sex": sexKey
                }
            }).then(() => {
                 Dialog.alert({
                    title: '提示',
                    theme: 'round-button',
                    message: '修改信息成功！',
                    confirmButtonColor: '#1989FA'
                })
            }).catch((error) => {
                Dialog.alert({
                    title: '警告',
                    theme: 'round-button',
                    message: error.response.data.message,
                    confirmButtonColor: '#1989FA'
                })
            })
        },
        afterRead(file) {
            if(file.length != undefined) {
                 Dialog.alert({
                    title: '警告',
                    theme: 'round-button',
                    message: "只能选择一张图片，请重新选择！",
                    confirmButtonColor: '#1989FA'
                })
                this.flag = 0;
                return ;
            }
            // 此时可以自行将文件上传至服务器
            this.avatarImg = file.content;
            this.flag = 1;  //表明已经换头像了
        },
        sexSelect(item) {
            this.show = false;
            this.sex = item.name;
        },
        onClickLeft() {
            this.$router.push({
                path: '/mine'
            })
        },

        dataURLtoBlob(dataurl) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        },
        
        uploadAvatar() {
            let userKey = JSON.parse(localStorage.getItem('userData'));
            let avatar = this.dataURLtoBlob(this.avatarImg);
            let form = new FormData();
            form.append("avatar", avatar);
            this.axios({
                method: "POST",
                url: "/user/uploadAvatar",
                headers: {
                    'Authorization': userKey.accesstoken
                },
                data: form
            }).then(() => {
            })
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
}
.cellList, .cellSafeList {
    margin-top: 10px;
}
</style>

<style>
.navbar .van-nav-bar__title {
    color: #FFF;
}
.van-nav-bar .van-icon, .van-nav-bar__text {
    color: #FFF;
}
.van-nav-bar__right .van-nav-bar__text {
    color: #dcff89;
    font-size: 16px;
}
.van-field__label {
    color: #323233;
}
.van-field__control {
    color: #969799;
}
.van-uploader__upload, .van-uploader__preview-image {
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
}
.van-uploader__upload, .van-uploader__preview {
    margin: 0;
}

</style>