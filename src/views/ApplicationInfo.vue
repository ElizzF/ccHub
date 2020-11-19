<template>
    <div class='container' style="background: rgba(242,242,242); height:100%">
        <!-- 导航栏 -->
        <van-nav-bar
            title="路人丁的申请"
            class="navbar"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        
       
        <div class="cellList" style="padding-top: 47px;">
            <van-cell :title="username" :label="sex" size='large' style="align-items: center;position: relative">
                <template #icon>
                    <van-image
                        round
                        width="3rem"
                        height="3rem"
                        style="margin-right: 15px;"
                        :src="avatarImg"
                    />
                </template>
            </van-cell>            
        </div>

        <div class='cellList' style="margin-top: 10px;">
            <div class='introduceTxt'>个人简介</div>
            <van-field  class='appliTxt' v-model="description" type="textarea" autosize disabled />
        </div>

        <div class='cellList' style="margin-top: 10px;">
            <div class='introduceTxt'>获奖经历</div>
            <van-field class='appliTxt' size='large' v-model="history" type="textarea" autosize disabled />
        </div>

         <div class='cellList' style="margin-top: 10px;">
            <div class='introduceTxt'>申请理由</div>
            <van-field class='appliTxt' size='large' v-model="reason" type="textarea" autosize disabled />
        </div>

        <div class='buttonList'>
            <van-button round type="info">同意</van-button>
            <van-button round type="info" color="#D7D7D7">忽略</van-button>
        </div>



        
      
    </div>
</template>

<script>
// import { Dialog } from 'vant'
export default {
    data() {
        return {
            username: '路人丁',
           
            description: '巴拉巴拉',
            sex: '男',
            avatarImg: '',
            history: "2020.01.02 巴拉巴拉大赛二等奖" +"\n" + "2020.01.02 巴拉巴拉大赛二等奖",
            reason: '我认为我有能力干嘛巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉'
        };
    },
    created() {
        this.initUserData();
    },
    methods: {
        initUserData() {
            
        },
        onClickLeft() {
            this.$router.push({
                path: '/application'
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
    z-index: 1;
}
.introduceTxt {
    background: #FFF;
    display: flex;
    align-items: center;
    height: 40px;
    padding-left: 16px;
    margin-bottom: -5px;
}
.buttonList{
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin-top: 35px;
}
.buttonList button {
    width: 110px;
    height: 37px;
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
.appliTxt .van-field__control:disabled{
    color: #969799;
    -webkit-text-fill-color: #969799;
}
</style>