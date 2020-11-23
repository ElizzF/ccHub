<template>
    <div class='container' style="background: rgba(242,242,242); height:100%">
        <!-- 导航栏 -->
        <van-nav-bar
            :title="`${message.send_userName}的申请`"
            class="navbar"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        
       
        <div class="cellList" style="padding-top: 47px;">
            <van-cell :title="message.send_userName" :label="message.userinfo.sex | gender" size='large' style="align-items: center;position: relative">
                <template #icon>
                    <van-image
                        round
                        width="3rem"
                        height="3rem"
                        style="margin-right: 15px;"
                        :src="message.userinfo.avatar_url"
                    />
                </template>
            </van-cell>            
        </div>

        <div class='cellList' style="margin-top: 10px;">
            <div class='introduceTxt'>个人简介</div>
            <van-field  class='appliTxt' v-model="message.userinfo.description" type="textarea" autosize disabled />
        </div>

        <!-- <div class='cellList' style="margin-top: 10px;">
            <div class='introduceTxt'>获奖经历</div>
            <van-field class='appliTxt' size='large' v-model="history" type="textarea" autosize disabled />
        </div> -->

         <div class='cellList' style="margin-top: 10px;">
            <div class='introduceTxt'>申请理由</div>
            <van-field class='appliTxt' size='large' v-model="message.contain" type="textarea" autosize disabled />
        </div>

        <div class='buttonList' v-if="message.type==1">
            <van-button round type="info" @click="accept">同意</van-button>
            <van-button round type="info" color="#D7D7D7" @click="ignore">忽略</van-button>
        </div>
         <div class='buttonList' v-if="message.type==0">
            <van-button round @click="accept">已同意</van-button>
        </div>



        
      
    </div>
</template>

<script>
// import { Dialog } from 'vant'
export default {
    data() {
        return {
            message:{
                userinfo:{}
            },
            username: '路人丁',       
            description: '巴拉巴拉',
            sex: '男',
            avatarImg: '',
            history: "2020.01.02 巴拉巴拉大赛二等奖" +"\n" + "2020.01.02 巴拉巴拉大赛二等奖",
            reason: '我认为我有能力干嘛巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉'
        };
    },
    mounted(){
        this.mid = this.$route.query.mid
        if (!this.mid){
            this.$router.back()
        }
        this.getMessageDetail()
    },
    filters:{
        gender(val){
            if (!val) return "";
            if (val==0) return "女";
            return "男"
        }
    },
    methods: {
        accept() {
            this.$api.Team.DealRequest(this.mid, 1).then((data) => {
                if (data.status == 0) {
                    this.getMessageDetail();
                }
            });
        },
        ignore() {
            this.$api.Team.DealRequest(this.mid, 2).then((data) => {
                if (data.status == 0) {
                    this.getMessageDetail();
                }
            });
        },
        onClickLeft() {
            this.$router.back()
        },
        getMessageDetail() {
            this.$api.Message.GetMessageDetail(this.mid, 1).then(
                async (data) => {
                    let message = data.data
                    await this.$api.User.GetUserInfoById(
                        message.send_uid
                    ).then((data) => {
                        this.$set(message, "userinfo", data.data);
                    });
                    this.message = message 
                }
            );
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