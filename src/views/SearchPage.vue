<template>
    <div class='container' style="background: #FFF;">
        <!-- 导航栏 -->
        <van-nav-bar
            title="搜索"
            class="navbar"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        
        <van-search class='toSearch'
            v-model="search_value"
            shape="round"
            placeholder="请输入你感兴趣的内容"
            style="padding-top: 57px;"
            show-action
        >
            <template #action>
                <van-button round type="info" style="width: 60px; height: 30px;">搜索</van-button>
            </template>
        </van-search>
       
       <div class='searchMain'>
           <div class='hotSearch'>
               <div class='txt'>热门搜索</div>
               <van-grid :border="false" :column-num="3">
                    <van-grid-item v-for="item in hotItems" :key="item.id">
                        <div class='hotSearchItem'>{{ item.value }}</div>
                    </van-grid-item>
                </van-grid>
           </div>

           <div class='historySearch'>
               <div class='txt'>历史搜索</div>
               <van-grid :border="false" :column-num="3">
                    <van-grid-item v-for="item in historyItems" :key="item.id">
                        <div class='historySearchItem'>{{ item.value }}</div>
                    </van-grid-item>
                </van-grid>
           </div>
       </div>
        


        
      
    </div>
</template>

<script>
//import { Dialog } from 'vant'
export default {
    data() {
        return {
            hotItems: [
                { id: 1, value: '数学建模' },
                { id: 2, value: '英语六级' },
                { id: 3, value: 'xxx' },
                { id: 4, value: '巴拉巴拉' },
            ],
            historyItems: [
                { id: 1, value: '数学建模' },
              
            ]
        };
    },
    created() {
       
    },
    methods: {
        onClickLeft() {
            this.$router.push({
                path: '/competition'
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
}
.txt {
    font-size: 16px;
    font-weight: 600;
    margin-left: 20px;
    margin-top: 5px;
}
.hotSearchItem, .historySearchItem {
    width: 78px;
    height: 29px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(242, 242, 242, 1);
    border: none;
    border-radius: 17px;
}
</style>

<style>
.navbar .van-nav-bar__title {
    color: #FFF;
}
.van-nav-bar .van-icon, .van-nav-bar__text {
    color: #FFF;
}
.toSearch .van-cell__value {
    margin-left: 20px !important;
}


</style>