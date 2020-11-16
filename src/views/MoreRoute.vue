<template>
    <div class='container' style="background: #FFF;">
        <!-- 导航栏 -->
        <van-nav-bar
            title="更多路线"
            class="navbar"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        
        <div class='main' style="padding-top: 45px">
            <div class='majorTxt'>你的专业是：</div>
            <div class='majorList'>
                <van-button 
                    round 
                    type="info" 
                    :plain="item.plain" 
                    v-for="item in items" 
                    :key="item"
                >
                    {{ item.name }}
                </van-button>
         
            </div>
        </div>
        


        
      
    </div>
</template>

<script>
//import { Dialog } from 'vant'
export default {
    data() {
        return {
            items: [
                { name: '理科', plain: true},
                { name: '工科', plain: false},
                { name: '商科', plain: false},
                { name: '文科', plain: false},
               
            ]
        };
    },
    created() {
       
    },
    methods: {
        onClickLeft() {
            this.$router.push({
                path: '/'
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
.container {
    height: 100%;
    background: #FFF;
    display: flex;
    flex-direction: column;
    
}
</style>

<style>
.navbar .van-nav-bar__title {
    color: #FFF;
}
.van-nav-bar .van-icon, .van-nav-bar__text {
    color: #FFF;
}

.van-cell__value {
    margin-left: 20px !important;
}

</style>