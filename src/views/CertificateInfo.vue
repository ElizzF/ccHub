<template>
  <div class='container' style="height: 100%">
    <!-- 导航栏 -->
    <van-nav-bar
        title="证书详情"
        class="navbar"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <van-image class='topImg' style="padding-top: 45px;" :src="imgUrl" height="200px" width="100%">
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
    <div style="padding-bottom: 50px;">
      <van-cell-group>
        <van-cell :title="title" 
                  :label="watch" 
                  title-class='comTitle'
                  label-class="comLabel"
        />
        <van-cell :title="enrollTime" title-class="cellStyle"/>
        <van-cell :title="contestTime" title-class="cellStyle"/>
        <van-cell :title="originator" title-class="cellStyle"/>
      </van-cell-group>
      <van-collapse v-model="activeNames1" >
          <van-collapse-item title="详细内容" name="1" title-class="collapseCellStyle">
          <van-field
            class="contestInfoStyle"
            v-model="info"
            :autosize="{ maxHeight: 300 }"
            type="textarea"
            readonly
            style="color: #969799"
          />
          <!-- {{ info }} -->
        </van-collapse-item>
      </van-collapse>

      <van-collapse v-model="activeNames2" style="margin-top: 10px;">
        <van-collapse-item title="备考材料" name="1" title-class="collapseCellStyle">巴拉巴拉巴拉巴拉巴拉巴拉</van-collapse-item>
      </van-collapse>
      
    </div>
    <van-goods-action class='bottomBar'>
      <div class='barIcon'>
        <van-goods-action-icon icon="chat-o" text="分享" @click="showShare = true" />
        <van-goods-action-icon
          :icon="isCollection"
          text="收藏"
          @click="goCollection"
        />
      </div>
      <van-button round type="info" style="height: 35px;" @click="addRoute">加入我的路线</van-button>
    </van-goods-action>


    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      imgUrl: '',
      originator: '',
      enrollTime: '',
      contestTime: '',
      watch: '',
      info: '',

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

      certificateId: null,
      isCollection: "star-o",
    }
  },
  created() {
    this.initContestInfo();
    this.getContestStatus();
  },
  methods: {
    initContestInfo() {
      let certificateId = localStorage.getItem("certificateId");
      this.certificateId = certificateId;

      this.$api.Certificate.GetCertificateById(this.certificateId).then(res=>{
        this.title = res.data.name;
        this.imgUrl = res.data.pic_url;
        this.watch = res.data.watched + " 浏览 | " + res.data.collected + " 关注";
        this.originator = "官网 " + res.data.office_web;
        this.enrollTime = "报名时间 " + res.data.enroll_start + " — " + res.data.enroll_end;
        if(res.data.contest_start == res.data.contest_end) 
          this.contestTime = "比赛时间 未知";
        else
          this.contestTime = "比赛时间 " + res.data.contest_start + " — " + res.data.contest_end;
        this.info = res.data.info;    
      })
    },
    onClickLeft() {
      this.$router.push({
        path: '/certificate'
      })
    },
    getContestStatus() {
      this.$api.Certificate.GetCertificateStatusById(this.certificateId).then(
          (data) => {
              if (data.data == 1) this.isCollection = "star";
              else this.isCollection = "star-o";
          }
      );
    },
    goCollection() {
      this.$api.Certificate.AddOrDeleteCollectCertificateById(
          this.certificateId
      ).then((data) => {
          if (data.status == 0)
            this.isCollection = this.isCollection == "star" ? "star-o" : "star";
      });
    },
    addRoute() {
      // this.$api.Route.AddRouteByContestId(this.certificateId).then(data=>{
      //   if(data.status == 0) {
      //     Dialog.alert({
      //         title: '提示',
      //         theme: 'round-button',
      //         message: '添加成功！',
      //         confirmButtonColor: '#1989FA'
      //     })
      //   }
      // }).catch(error=>{
      //   Dialog.alert({
      //     title: '警告',
      //     theme: 'round-button',
      //     message: error.message,
      //     confirmButtonColor: '#1989FA'
      //   })
      // })
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
.container {
  height: 100%;
}
.van-goods-action {
  display: flex;
  justify-content: space-between;
  padding-left: 12px;
  padding-right: 12px;
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
.topImg .van-image__img {
  border-radius: 0
}
</style>