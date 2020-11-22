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
            <div class='title'>{{teaminfo.name}}</div>
        </div>

        <div class='cellList' style="margin-top: 10px;">
            <van-cell title="拉人宣言" :label="teaminfo.team_description" size="large" title-style="color: black"></van-cell>
        </div>

        <van-cell class='teamCellTxt' title="成员简介" title-class="teamTxt"/>

        <div class='cellList' style="margin-top: 10px;">
            <van-cell v-for="(item,index) in teaminfo.teamPartners" :key="`${item.uid}-${index}`" :label="`个人简介:${item.info.description}`" size='large' style="align-items: center;position: relative; margin-bottom: 7px">
                <template #title>
                    <div style="display: flex;">
                        <span class="custom-title">{{item.uname}}</span>
                        <div class='tag'>{{item.position==1?"队长":"队员"}}</div>
                    </div>
                </template>
                <template #icon>
                    <van-image
                        round
                        width="3rem"
                        height="3rem"
                        style="margin-right: 15px;"
                        :src="item.info.avatar_url"
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
                    <van-button round type="info" style="height: 35px; margin-right: 10px;" v-show="!isLeader">私聊队长</van-button>
                    <van-button round type="info" style="height: 35px;" v-show="!isJoined">立即加入</van-button>
                </div>
            </van-goods-action>
        </div>
        
      
    </div>
</template>

<script>
import { mapState } from 'vuex';
// import { Dialog } from 'vant'
export default {
    data() {
        return {
            teaminfo:{
                team_description:"",
                name:""
            },
            checked: true,
        };
    },
    computed:{
        ...mapState([
            "userinfo"
        ]),
        isJoined(){
            if (!this.teaminfo.teamPartners) return false     
            let index = this.teaminfo.teamPartners.findIndex(e=>e.uid==this.userinfo.id);
            return index!=-1
        },
        isLeader(){
            if (!this.teaminfo.teamPartners) return false     
            let index = this.teaminfo.teamPartners.findIndex(e=>e.uid==this.userinfo.id && e.position==1);
            return index!=-1
        }
    },
    created() {
        
    },
    mounted(){
        this.teamid = this.$route.query.teamid
        if (!this.teamid){
            this.$router.back()
        }
        this.GetTeamInfo()
    },
    methods: {
        GetTeamInfo(){
            this.$api.Team.GetDetail(this.teamid).then(async data=>{
                data.data.teamPartners.sort((a,b)=>a.position>b.position)
                for (let userInfo of data.data.teamPartners){
                    await this.$api.User.GetUserInfoById(userInfo.uid).then(data=>{
                        if (data.data)
                            data.data.description=data.data.description?data.data.description:"无";
                        this.$set(userInfo,"info",data.data)
                    })
                }              
                this.teaminfo = data.data
            })
        },
        onClickLeft() {
            this.$router.back()
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