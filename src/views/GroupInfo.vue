<template>
    <div class='container' style="background: rgba(242,242,242); height:100%">
        <!-- 导航栏 -->
        <van-nav-bar
            title="群聊设置"
            class="navbar"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        
       
        <div class="cellList" style="padding-top: 47px;">
            <van-cell :title="teamName" :label="sex" size='large' style="align-items: center;position: relative">
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
            <van-cell title="群聊成员" value="共2人" is-link >
                 <template #label>
                    <div class='avatarList'>
                        <div class='avatarItem'>
                            <van-image
                                round
                                width="3rem"
                                height="3rem"
                                style="margin-right: 15px;"
                                :src="avatarImg"
                            />
                            <div class='teammateName'>我是队员</div>
                        </div>

                        <div class='avatarItem'>
                            <van-image
                                round
                                width="3rem"
                                height="3rem"
                                style="margin-right: 15px;"
                                :src="avatarImg"
                            />
                            <div class='teammateName'>我是队员</div>
                        </div>
                    </div>
                </template>
            </van-cell>
        </div>

        <div class='cellList' style="margin-top: 10px;">
            <van-cell title="群聊名称" value="群名称" is-link />
            <van-cell center title="群公告" label="这是一条群公告" is-link />
        </div>

        <div class='cellList' style="margin-top: 10px;">
            <van-cell title="聊天记录" value="图片、文字等" is-link />
        </div>

        <van-button type="default" style="width: 100%; margin-top:10px; border: none;">退出该群</van-button>


        
      
    </div>
</template>

<script>
// import { Dialog } from 'vant'
export default {
    data() {
        return {
            teamName: '群名称',
            checked: true,
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
                path: '/chatPage'
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
.avatarList {
    display: flex;
    padding-top: 5px;
    padding-bottom: 5px;
}
.teammateName {
    color: black;
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

</style>