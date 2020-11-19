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
        
        
       
        

        <div class='cellList' style="padding-top: 47px;">
            <van-cell title="路人丁" label="我想加入"
                size='large' style="align-items: center;position: relative;"
                to="/applicationInfo"
            >
                <template #icon>
                    <van-image
                        round
                        width="3rem"
                        height="3rem"
                        style="margin-right: 15px;"
                        :src="avatarImg"
                    />
                </template>

                <template #right-icon>
                    <div v-if="display == 0">
                        <van-button round type="info" @click="accept" class="acceptButton">同意</van-button>
                        <van-button round color="#D7D7D7" type="info" @click="ignore" class="ignoreButton">忽略</van-button>
                    </div>
                    <div v-if="display == 1">
                        <div class="acceptTxt">已同意</div>
                    </div>
                    <div v-if="display == 2">
                        <div class="ignoreTxt">已忽略</div>
                    </div>
                </template>
            </van-cell>

            <van-cell title="路人丁" label="我想加入" 
                size='large' style="align-items: center;position: relative;"
            >
                <template #icon>
                    <van-image
                        round
                        width="3rem"
                        height="3rem"
                        style="margin-right: 15px;"
                        :src="avatarImg"
                    />
                </template>

                <template #right-icon>
                    <div class="acceptTxt">已同意</div>
                </template>
            </van-cell>
            
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
            display: 0
        };
    },
    created() {
        this.initUserData();
    },
    methods: {
        initUserData() {
            
        },
        accept() {
            this.display = 1;
        },
        ignore() {
            this.display = 2;
        },
       
        onClickLeft() {
            this.$router.push({
                path: '/chat'
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
.acceptButton {
    height: 30px; 
    display: inline-block; 
    margin-right: 10px;
}
.ignoreButton {
    height: 30px; 
    display: inline-block; 
}
.ignoreTxt, .acceptTxt {
    margin-right: 10px;
}


</style>

<style>
.navbar .van-nav-bar__title {
    color: #FFF;
}
.van-nav-bar .van-icon, .van-nav-bar__text {
    color: #FFF;
}

</style>