<template>
    <div class='container' style="background: rgba(242,242,242); height:100%">
        <!-- 导航栏 -->
        <van-nav-bar
            title="队伍详情"
            class="navbar"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        
        
       
        <div class="cellList" style="padding-top: 47px;">
            <div class='title'>路人甲的队伍</div>
        </div>

        <div class='cellList' style="margin-top: 10px;">
            <van-cell title="拉人宣言" label="这是拉人宣言" size="large" title-style="color: black"></van-cell>
        </div>

        <van-cell class='teamCellTxt' title="成员简介" title-class="teamTxt"/>

        <div class='cellList' style="margin-top: 10px;">
            <van-cell label="个人简介：想睡觉想睡觉想睡觉想睡觉想睡觉想睡觉想睡觉想睡觉想睡觉想睡觉" size='large' style="align-items: center;position: relative; margin-bottom: 7px">
                <template #title>
                    <div style="display: flex;">
                        <span class="custom-title">{{ teammateName }}</span>
                        <div class='tag'>队长</div>
                    </div>
                </template>
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

            <van-cell label="个人简介：想睡觉想睡觉想睡觉想睡觉想睡觉想睡觉想睡觉想睡觉想睡觉想睡觉" size='large' style="align-items: center;position: relative; margin-bottom: 7px;">
                <template #title>
                    <div style="display: flex;">
                        <span class="custom-title">{{ teammateName }}</span>
                        <div class='tag'>队员</div>
                    </div>
                </template>
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

            <van-cell label="个人简介：想睡觉想睡觉想睡觉想睡觉想睡觉想睡觉想睡觉想睡觉想睡觉想睡觉" size='large' style="align-items: center;position: relative; margin-bottom: 7px;">
                <template #title>
                    <div style="display: flex;">
                        <span class="custom-title">{{ teammateName }}</span>
                        <div class='tag'>队员</div>
                    </div>
                </template>
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

        <div style="padding-top: 50px;">
            <van-goods-action class='bottomBar'>
                <div class='barIcon'>
                    <van-goods-action-icon icon="chat-o" text="分享" @click="showShare = true" />
                   
                </div>
                <div style="margin-right: 10px;">
                    <van-button round type="info" style="height: 35px; margin-right: 10px;">私聊队长</van-button>
                    <van-button round type="info" style="height: 35px;">立即加入</van-button>
                </div>
            </van-goods-action>
        </div>
        


        
      
    </div>
</template>

<script>
// import { Dialog } from 'vant'
export default {
    data() {
        return {
            teammateName: '路人甲',
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
                path: '/competitionInfo'
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
.avatarList {
    display: flex;
    padding-top: 5px;
    padding-bottom: 5px;
}
.teammateName {
    color: black;
}
.title {
    background: #FFF;
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 17px;
    color: black;
    justify-content: center;
}
.teamTxt {
  font-size: 16px;
  margin-left: 15px;
  color: black;
  margin-top: 10px;
}
.tag {
    font-size: 13px;
    margin-left: 7px;
    color: #969799;
}
.van-goods-action {
  display: flex;
  justify-content: space-between;
}
.barIcon {
  display: flex;
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
.teamCellTxt {
  background: rgb(242,242,242);
  padding: 0;
}
</style>