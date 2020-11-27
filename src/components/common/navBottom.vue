<template>
    <van-tabbar class="navbar-bottom" v-model="routeIndex" route>
        <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item
            class="trophy"
            icon-prefix="iconfont icon"
            icon="trophy"
            to="/competition"
            >竞赛</van-tabbar-item
        >
        <van-tabbar-item
            class="trophy"
            icon-prefix="iconfont icon"
            icon="jiangbei"
            to="/certificate"
            >证书</van-tabbar-item
        >
        <van-tabbar-item icon="chat-o" :badge="UnReadMessageCount" to="/chat"
            >聊天</van-tabbar-item
        >
        <van-tabbar-item icon="user-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
import { mapState } from 'vuex';
export default {
    props:{
        value:{}
    },
    computed:{
        ...mapState([
            "messageList"
        ]),
        routeIndex:{
            get(){
                return this.value;
            },
            set(val){
                this.$emit("input",val)
            }
        },
        UnReadMessageCount(){
            let length = this.messageList.filter(e=>e.readed==0).length
            if (length==0){
                return undefined;
            }
            return length;
        }
    }
};
</script>
<style scoped>
.navbar-bottom{
    position: fixed;
    bottom:0;
}
</style>
<style>
.navbar .van-nav-bar__title {
    color: #fff;
}

.trophy .iconfont {
    font-size: 22px;
}
</style>