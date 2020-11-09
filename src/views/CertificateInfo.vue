<template>
  <div class='container'>
    <!-- 导航栏 -->
    <van-nav-bar
        title="证书详情"
        class="navbar"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" height="200px">
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
    <van-cell-group>
      <van-cell title="2020年工业大数据创新竞赛" 
                label="8888 浏览 | 624 关注" 
                title-class='comTitle'
                label-class="comLabel"
      />
      <van-cell title="报名时间 2020.10.01——2020.12.01" title-class="cellStyle"/>
      <van-cell title="比赛时间 2020.12.01——2020.12.31" title-class="cellStyle"/>
      <van-cell title="主办方 巴拉巴拉考试中心" title-class="cellStyle"/>
    </van-cell-group>
    <van-collapse v-model="activeNames1" >
        <van-collapse-item title="详细内容" name="1" title-class="collapseCellStyle">巴拉巴拉巴拉巴拉巴拉巴拉</van-collapse-item>
      </van-collapse>

    <van-collapse v-model="activeNames2" style="margin-top: 10px;">
      <van-collapse-item title="备考材料" name="1" title-class="collapseCellStyle">巴拉巴拉巴拉巴拉巴拉巴拉</van-collapse-item>
    </van-collapse>

    <van-goods-action class='bottomBar'>
      <div class='barIcon'>
        <van-goods-action-icon icon="chat-o" text="分享" @click="showShare = true" />
        <van-goods-action-icon icon="star-o" text="收藏"  />
      </div>
      <van-button round type="info">我要报名</van-button>
    </van-goods-action>

    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
      activeNames1: ['1'],
      activeNames2: [],
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        path: '/'
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
.van-goods-action {
  display: flex;
  justify-content: space-between;
  margin-left: 12px;
  margin-right: 12px;
}
.barIcon {
  display: flex;
}
.comTitle {
  font-size: 24px;
  font-weight: 600;
}
.comLabel {
  margin-top: 8px;
  font-size: 17px;
  color: #AAAAAA;
  font-weight: 400;
}
.cellStyle {
  font-size: 18px;
}
.allTroopsTxt {
  font-size: 18px;
  margin-left: 15px;
  color: #7F7F7F;
  margin-top: 10px;
  margin-bottom: 10px;
}
.labelStyle {
  font-size: 15px;
}
</style>
<style>
.navbar .van-nav-bar__title {
    color: #FFF;
}
.van-nav-bar .van-icon, .van-nav-bar__text {
  color: #FFF;
}
.collapseCellStyle {
  font-size: 18px;
}
.van-collapse-item__content {
  font-size: 17px;
}
</style>