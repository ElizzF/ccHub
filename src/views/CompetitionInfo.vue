<template>
  <div class='container'>
    <!-- 导航栏 -->
    <van-nav-bar
        title="竞赛详情"
        class="navbar"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <van-image class='topImg' style="padding-top: 45px;" :src="imgUrl" height="200px" width="100%">
      
    </van-image>
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
        <van-collapse-item title="详细内容" name="1" title-class="collapseCellStyle">{{ info }}</van-collapse-item>
      </van-collapse>

    <van-collapse v-model="activeNames2" style="margin-top: 10px;">
      <van-collapse-item class="colItem" title="竞赛附件（0）" name="2" title-class="collapseCellStyle">巴拉巴拉巴拉巴拉巴拉巴拉</van-collapse-item>
      <van-collapse-item class="colItem" title="通知公告（0）" name="3" title-class="collapseCellStyle">巴拉巴拉巴拉巴拉巴拉巴拉</van-collapse-item>
    </van-collapse>

    <van-cell class='allTroopscellTxt' title="全部队伍" title-class="allTroopsTxt"/>

    <div class='cellGroup' style="padding-bottom: 50px;">
      <van-cell  v-for="(team,index) in teams" :key="`${team.tid}-${index}`" :title="`队伍名:${team.tname}`" :label="`小组成员数：${team.teamPartnerUrls.length+1}`" is-link :to="`/teamInfo?teamid=${team.tid}`" title-class='cellStyle' label-class='labelStyle' style="align-items: center;">
        <template #icon>
          <van-image
              round
              width="4rem"
              height="4rem"
              :src="team.leaderAvatarUrl"
              style="margin-right: 10px;"
          />
        </template>
      </van-cell>
    </div>

    <van-goods-action class='bottomBar'>
      <div class='barIcon'>
        <van-goods-action-icon icon="chat-o" text="分享" @click="showShare = true" />
        <van-goods-action-icon icon="star-o" text="收藏"  />
      </div>
      <div style="margin-right: 10px;">
          <van-button round type="info" @click="goCreateTeam" style="height: 35px; margin-right: 10px;">创建队伍</van-button>
          <van-button round type="info" style="height: 35px;">我要报名</van-button>
      </div>
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
      teams:[],


      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
      activeNames1: [],
      activeNames2: [],
    }
  },
  created() {
    this.initContestInfo();
    this.getTeams()
  },
  methods: {
    initContestInfo() {
      let contestId = localStorage.getItem("contestId");
      this.contestId = contestId

      this.axios({
        method: "GET",
        url: "/contest/" + contestId,
      }).then((res) => {
        this.title = res.data.data.name;
        this.imgUrl = res.data.data.picUrl;
        this.watch = res.data.data.watched + " 浏览";
        this.originator = "主办方 " + res.data.data.originator;
        this.enrollTime = "报名时间 " + res.data.data.enrollStart + " — " + res.data.data.enrollEnd;
        if(res.data.data.contestStart == res.data.data.contestEnd) 
          this.contestTime = "比赛时间 未知";
        else
          this.contestTime = "比赛时间 " + res.data.data.contestStart + " — " + res.data.data.contestEnd;
        this.info = res.data.data.info;              
      }).catch(() => {
          
      });
    },
    onClickLeft() {
      this.$router.push({
        path: '/competition'
      })
    },
    getTeams(){
        this.$api.Team.GetContestTeam(this.contestId).then(data=>{
            data=data.data
            this.teams = data
        })
    },
    goCreateTeam() {
      this.$router.push({
        path: '/createTeam',
        query: {contestId:this.contestId}
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
.van-goods-action {
  display: flex;
  justify-content: space-between;
}
.barIcon {
  display: flex;
}
.comTitle {
  font-size: 21px;
  font-weight: 600;
}
.comLabel {
  margin-top: 8px;
  font-size: 15px;
  color: #AAAAAA;
  font-weight: 400;
}
.cellStyle {
  font-size: 14px;
}
.allTroopsTxt {
  font-size: 16px;
  margin-left: 15px;
  color: #7F7F7F;
  margin-top: 10px;
  margin-bottom: 10px;
}
.labelStyle {
  font-size: 12px;
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
  font-size: 14px;
}
.colItem .van-collapse-item__content {
  font-size: 14px;
}
.topImg .van-image__img {
  border-radius: 0
}
.allTroopscellTxt {
  background: rgb(242,242,242);
  padding: 0;
}
</style>