<template>
    <div class='container' style="background: rgba(242,242,242);">
        <!-- 导航栏 -->
        <van-nav-bar title="我的消息" class="navbar" 
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        >
        </van-nav-bar>
        <van-cell-group style="margin-top:45px;">
            <!-- <van-cell :title="infoList" label="2020-01-02 09:50:23" is-link style="align-items: center; padding-top: 57px;"/>-->      
            <van-cell :title="item.type==2?item.detail.contain:`${item.user.username}加入${item.detail.team_name}的请求已经同意`" v-for="(item,index) in readMessage" :key="`${index}-${item.mid}`" :label="item.create_time" is-link style="align-items: center;"/> 
        </van-cell-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      infoList: '你报名的竞赛《捡垃圾大赛》，主办方提醒您：捡垃圾大赛的初试名单已公布，快去看看吧〜',
    }
  },
  computed:{
      ...mapState(["messageList"]),
      readMessage(){
          return this.messageList.filter(e=>e.type==1 || e.type==2)
      }
  },
  methods: {
    onClickLeft() {
        this.$router.push({
            path: '/mine'
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

</style>

<style>

.navbar .van-nav-bar__title {
    color: #FFF;
}
.van-nav-bar .van-icon, .van-nav-bar__text {
  color: #FFF;
}

</style>