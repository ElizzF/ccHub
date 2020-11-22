<template>
    <div
        class="container"
        style="background: rgba(245, 245, 249); height: 100%"
    >
        <!-- 导航栏 -->
        <van-nav-bar
            title="加入队伍"
            class="navbar"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        >
        </van-nav-bar>
        <div class="main" style="margin-top: 46px">
            <div class="top">
                <div class="topTitle">{{teaminfo.name}}</div>
                <div class="subTitle">目前队伍人数:{{teaminfo.teamPartners.length}}</div>
            </div>
            <div class="dataList">

                <van-field
                    v-model="requestText"
                    type="textarea"
                    label="加入的理由*"
                    rows="15"
                />
            </div>

            <div class="bottom">
                <van-button
                    round
                    type="info"
                    style="width: 120px"
                    size="small"
                    @click="joinTeam"
                    >加入队伍</van-button
                >
            </div>
        </div>
    </div>
</template>

<script>
import { Dialog, Notify } from 'vant';
export default {
    data(){
        return {
            requestText:"",
            teamid:null,
            teaminfo:{
                teamPartners:[]
            }
        }
    },
    mounted(){
        this.teamid = this.$route.query.teamid
        if (!this.teamid){
            this.$router.back()
        }
        this.getTeamInfo()
    },
    methods:{
        onClickLeft(){
            this.$router.back()
        },
        getTeamInfo(){
            this.$api.Team.GetDetail(this.teamid).then(data=>{
                this.teaminfo = data.data
            })
        },
        joinTeam(){
            if (this.requestText==""){
                Dialog({
                    message:"请填写您的申请理由哦"
                })
                return;
            }
            this.$api.Team.JoinTeam(this.teamid,this.requestText).then(data=>{
                if (data.status==0){
                    Notify({type:"success",message:"申请成功，请等待答复"})
                }
            }).catch(err=>{
                Notify({type:"warning",message:err.message})
            })
        }
    }
};
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
.top {
    text-align: center;
    padding-top: 20px;
    /* border-bottom: 1px solid rgb(242,242,242); */
    padding-bottom: 10px;
}
.topTitle {
    color: black;
    font-weight: 600;
    font-size: 20px;
}
.subTitle {
    color: black;
    font-size: 14px;
}
.dataList {
    margin:5px 10px;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
}
.bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}
</style>

<style>
.navbar .van-nav-bar__title {
    color: #fff;
}
.van-nav-bar .van-icon,
.van-nav-bar__text {
    color: #fff;
}
.van-tabs__nav--card {
    border: 1px solid #0079fe;
}
.van-tabs__nav--card .van-tab.van-tab--active {
    background-color: #0079fe;
}
.van-tabs__nav--card .van-tab {
    color: #0079fe;
    border-right: 1px solid #0079fe;
}
.item .van-cell,
.item .van-image {
    position: static;
}
</style>