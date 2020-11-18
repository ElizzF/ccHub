<template>
    <div class='container' style="background: rgba(242,242,242); height:100%">
        <!-- 导航栏 -->
        <van-nav-bar
            title="个人简介"
            class="navbar"
            left-text="返回"
            right-text="保存"
            left-arrow
            @click-left="onClickLeft"
            @click-right="updateUserData"
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
            <van-field  v-model="description" clearable type="textarea" autosize />
        </div>

        <div class='cellList' style="margin-top: 10px;">
            <div class='introduceTxt'>获奖经历</div>
            <van-field size='large' v-model="history" clearable type="textarea" autosize />
        </div>




        
      
    </div>
</template>

<script>
// import { Dialog } from 'vant'
export default {
    data() {
        return {
            username: '',
           
            description: '',
            sex: '',
            avatarImg: '',
            history: "2020.01.02 巴拉巴拉大赛二等奖" +"\n" + "2020.01.02 巴拉巴拉大赛二等奖"
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
                url: "https://soft.leavessoft.cn/user/getInfo/0",
                headers: {
                    'Authorization': userKey.accesstoken
                }
            }).then((res) => {
                let userData = res.data.data;
                this.username = userData.username;
                
                this.description = userData.description;
                this.avatarImg = userData.avatar_url + "?id="+ Math.random();
   
                if(userData.sex == 1) this.sex = '男';
                else this.sex = '女';
            })
        },
        
       
        onClickLeft() {
            this.$router.push({
                path: '/personInfo'
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