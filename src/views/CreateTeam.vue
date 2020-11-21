<template>
    <div class='container' style="background: #FFF; height: 100%">
        <!-- 导航栏 -->
        <van-nav-bar
            title="创建队伍"
            class="navbar"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        
        <div class='main' style="margin-top: 46px;">
            <div class='top'>
                <div class='topTitle'>2020年工业大数据创新竞赛</div>
                <div class='subTitle'>队伍人数1-3人</div>
            </div>

            <div class='dataList'>
                
                 <van-field v-model="name" label="队伍名称*" />
                <!-- <<van-field v-model="phone" type="tel" label="手机号*" />
                <van-field v-model="email" label="邮箱*" /> -->
              
                <van-field v-model="description" type="textarea" label="拉人宣言*" rows="15" />

            </div>

            <div class='bottom'>
                <van-button round type="info" style="width: 120px;" @click="createTeam">创建队伍</van-button>
            </div>
        </div>
       
        


        
      
    </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
    data() {
        return {
            name:"",
            description:"",
            contestInfo:{}
        };
    },
    created() {
       
    },
    mounted(){
        this.getContestInfo()
    },
    methods: {
        getContestInfo(){
            if (this.$route.query){
                if (!this.$route.query.contestId){
                    this.onClickLeft()
                }
                this.contestId = this.$route.query.contestId
            }
        },
        onClickLeft() {
            this.$router.push({
                path: '/competitionInfo'
            })
        },
        createTeam(){
            if (this.name==""){
                Dialog({message:"队伍名字是必须的"})
                return
            }
            if (this.description==""){
                Dialog({message:"拉人宣言是必须的"})
                return
            }
            this.$api.Team.Create(this.contestId,this.name,this.description).then(data=>{
                if (data.status==0){
                    this.$router.push("/myTeam")
                }
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
    color: #FFF;
}
.van-nav-bar .van-icon, .van-nav-bar__text {
    color: #FFF;
}
/* .dataList .van-cell {
    flex-direction: column;
}
.dataList .van-cell__value {
    border: 1px solid;
    margin-top: 2px;
} */
</style>