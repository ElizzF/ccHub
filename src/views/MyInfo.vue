<template>
    <div class='container' style="background: rgba(242,242,242);">
        <!-- 导航栏 -->
        <van-nav-bar title="我的消息" class="navbar" 
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        >
        </van-nav-bar>

        <van-cell-group>
            <van-cell :title="infoList" label="2020-01-02 09:50:23" is-link style="align-items: center; padding-top: 57px;"/>
            <van-cell :title="infoList" label="2020-01-02 09:50:23" is-link style="align-items: center;"/>
        </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoList: '你报名的竞赛《捡垃圾大赛》，主办方提醒您：捡垃圾大赛的初试名单已公布，快去看看吧〜',
          
      
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