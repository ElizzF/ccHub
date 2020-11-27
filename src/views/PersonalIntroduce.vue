<template>
    <div class='container' style="background: rgba(242,242,242); height:100%;">
        <!-- 导航栏 -->
        <van-nav-bar
            title="获奖经历"
            class="navbar"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        
       
        <div class="cellList" style="padding-top: 47px;">
            <!-- <van-cell :title="username" :label="sex" size='large' style="align-items: center;position: relative">
                <template #icon>
                    <van-image
                        round
                        width="3rem"
                        height="3rem"
                        style="margin-right: 15px;"
                        :src="avatarImg"
                    />
                
                </template>
            </van-cell>             -->
            <van-cell v-for="item in list" :key="item.id" :title="item.title" class='labeltype' size="large">
                <template #label>
                    <van-image width="60%" height="60%" :src="item.imgUrl"></van-image>
                </template>
                <template #right-icon>
                    <van-icon name='arrow-down'></van-icon>
                </template>
            </van-cell>
           
            
           
           
        </div>
        <div class='button-box' style="position: relative">
            <van-button @click="addCertificateImg" class="add_button" icon="plus" type="info" round />
        </div>
        <!-- <div class='cellList' style="margin-top: 10px;">
            <div class='introduceTxt'>个人简介</div>
            <van-field  v-model="description" clearable type="textarea" autosize />
        </div>

        <div class='cellList' style="margin-top: 10px;">
            <div class='introduceTxt'>获奖经历</div>
            <van-field size='large' v-model="history" clearable type="textarea" autosize />
        </div> -->




        
      
    </div>
</template>

<script>
import { mapState } from 'vuex';
// import { Dialog } from 'vant'
export default {
    data() {
        return {
            list: []
        };
    },
    created() {
        this.initUserData();
    },
    computed:{
        ...mapState(["userinfo"])
    },
    methods: {
        addCertificateImg() {
            this.$router.push({
                path: '/addImg'
            })
        },
        initUserData() {
            this.axios({
                method: "GET",
                url: "/user/getCertificates/" + this.userinfo.id,
            }).then((res) => {
                let datas = res.data.data;
                let tempList = [];
                datas.forEach((index) => {
                    let dataItem = {};
                    dataItem.title = index.name;
                    dataItem.imgUrl = index.url;
                    dataItem.id = index.id;
                    tempList.push(dataItem);
                })
                this.list = tempList;
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
.add_button {
    width: 45px;
    height: 45px;
    position: absolute;
    right: 15px;
}
.button-box {
    margin-top: 10px;
}

</style>

<style>
.labeltype .van-cell__label {
    display: flex;
    justify-content: center;
}
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