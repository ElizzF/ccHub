<template>
    <div class='container' style="background: rgba(242,242,242); height:100%;">
        <!-- 导航栏 -->
        <van-nav-bar
            title="添加获奖经历"
            class="navbar"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        
       
        <div class="addCerList" style="padding-top: 47px;">
            <van-field label="获奖证书" size='large' v-model="name" placeholder="请输入获奖证书名字" clearable />

            <van-cell class='addCerUpload' title="点击添加证书图片"> 
                <template #label>
                    <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1" />
                </template>
            </van-cell>
        </div>

        <van-button type="primary" block style="margin-top: 20px;" @click="uploadCertificate">添加</van-button>  
      
    </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
    data() {
        return {
           name: '',
           certificateImg: null,
           fileList: []
        };
    },
    created() {
      
    },
    methods: {
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
            this.certificateImg = file.content;
        },
    
        dataURLtoBlob(dataurl) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        },
        uploadCertificate() {
            let userKey = JSON.parse(localStorage.getItem('userData'));
            let certificate = this.dataURLtoBlob(this.certificateImg);
            let form = new FormData();
            form.append("certificate", certificate);
            this.axios({
                method: "POST",
                url: "/user/uploadCertificate?name=" + this.name,
                headers: {
                    'Authorization': userKey.accesstoken
                },
                data: form
            }).then(() => {
                Dialog.alert({
                    title: '提示',
                    theme: 'round-button',
                    message: "添加成功！",
                    confirmButtonColor: '#1989FA'
                });
                this.$router.push({
                    path: '/personalIntroduce'
                })
            })
        },
        onClickLeft() {
            this.$router.push({
                path: '/personalIntroduce'
            })
        },

        
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
.introduceTxt {
    background: #FFF;
    display: flex;
    align-items: center;
    height: 40px;
    padding-left: 16px;
    margin-bottom: -5px;
}
.add_button {
    width: 45px;
    height: 45px;
    position: absolute;
    right: 15px;
}
.button-box {
    margin-top: 10px;
}
.addCerUpload {
    margin-top: 10px;
    color: #969799;
}
</style>

<style>
.navbar .van-nav-bar__title {
    color: #FFF;
}
.van-nav-bar .van-icon, .van-nav-bar__text {
    color: #FFF;
}

.addCerList .van-field__label {
    color: #323233;
    margin-right: 0;
}
.van-field__control {
    color: #969799;
}

</style>