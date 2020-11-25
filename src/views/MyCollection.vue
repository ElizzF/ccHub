<template>
<div class='container' style="background: rgba(242,242,242);">
    <!-- 导航栏 -->
    <div class='navTop'>
        <van-nav-bar title="我的收藏" class="navbar" 
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        >
        
        </van-nav-bar>
        <van-cell>
               <van-tabs type="card" @click="changeTabs">
                  <van-tab title="竞赛"></van-tab>
                  <van-tab title="证书"></van-tab>
                </van-tabs>
        </van-cell>
    </div>

    <div class='itemList' v-if="isDisplayJ">
        <div class='item' v-for="contest in contestList" :key="contest.id" @click="lookMoreInfo(contest.id)">
          <van-image class='comImg' width="95%" height="140" :src="contest.imgUrl" />
          <div class='itemTxtList'>
            <div class='itemTop'>
                <div class='itemState' :style="{ color: contest.stateColor }">{{ contest.state }}</div>
                <div class='itemDistance'>{{ contest.distance }}</div>
            </div>
            <div class='itemTitle'>{{ contest.title }}</div>
            <div class='itemInfo'>{{ contest.watched }} 浏览 | {{ contest.collected }} 关注 | {{ contest.level }}</div>
          </div>
        </div>

    </div>
      

    <div class='itemList' v-if="isDisplayZ">
        
         

        <div class='item'>
          <van-image class='comImg' width="95%" height="140" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div class='itemTxtList'>
            <div class='itemTop'>
                <div class='itemState'>正在报名</div>
                <div class='itemDistance'>离报名截止还有45天</div>
            </div>
            <div class='itemTitle'>2020年工业大数据创新竞赛</div>
            <div class='itemInfo'>8888 浏览 | 624 关注 | 国家级比赛</div>
          </div>
        </div>

        <div class='item'>
          <van-image class='comImg' width="95%" height="140" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div class='itemTxtList'>
            <div class='itemTop'>
                <div class='itemState'>正在报名</div>
                <div class='itemDistance'>离报名截止还有45天</div>
            </div>
            <div class='itemTitle'>2020年工业大数据创新竞赛</div>
            <div class='itemInfo'>8888 浏览 | 624 关注 | 国家级比赛</div>
          </div>
        </div>
      </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      isDisplayJ: true,
      isDisplayZ: false,
      
      contestList: []
    }
  },
  created() {
    this.getContestCollections();
  },
  methods: {
    getContestCollections() {
      this.$api.Collect.GetContestCollect().then(data=>{
          let list = data.data;
          list.forEach((index) => {
              let listItem = {};
              listItem.title = index.contestName;
              listItem.imgUrl = index.pic_url;
              listItem.level = index.level;
              listItem.id = index.contestId;
              listItem.watched = index.views;
              listItem.collected = index.collections;

              let fireNum = parseInt(index.views / 9);
              listItem.fireNum = fireNum;

              if(index.status == 2) {
                  listItem.distance = index.restTime;
                  listItem.state = '正在报名'; 
                  listItem.stateColor = '#22BFA7';
              } 
              else if(index.status == 1) {
                  listItem.state = '即将报名';
                  listItem.stateColor = '#05C0FF';
              }
              else {
                  listItem.state = '报名已截止';
                  listItem.stateColor = '#AAAAAA';
              }
              this.contestList.push(listItem);
          })
      })
    },
    lookMoreInfo(e) {
        localStorage.setItem("contestId", e);
        this.$router.push({
            path: '/competitionInfo'
        })
    },
    onClickLeft() {
      this.$router.push({
        path: '/mine'
      })
    },
    changeTabs(name, title) {
      if(title == '竞赛') {
        this.isDisplayJ = true;
        this.isDisplayZ = false;
      } else {
        this.isDisplayJ = false;
        this.isDisplayZ = true;
      }
    }
  }
}
</script>

<style scoped>
.navbar {
    background: #0079FE;
}

.itemList {
  padding-top: 105px;
  padding-bottom: 1px;
  background: rgba(242,242,242);
  border-radius: 15px;
  padding-left: 10px;
  padding-right: 10px;
  height: 100%;
}

.navTop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}
.comImg {
  margin: 0 auto;
  margin-top: 10px;
}
.item {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  background: #FFF;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 15px;
}
.itemTxtList {
  margin-left: 8px;
}
.itemTop {
  display: flex;
  margin-top: 5px;
  align-items: center;
}
.itemState {
  font-size: 18px;
  color: #008080;
  font-weight: 600;
}
.itemDistance {
  margin-left: 25px;
  font-size: 15px;
  color: #AAAAAA;
}
.itemTitle {
    margin-top: 5px;
    font-size: 21px;
    font-weight: 600;
}
.itemAbout, .itemInfo {
    margin-top: 5px;
    color: #AAAAAA;
    font-size: 15px;
    margin-bottom: 5px;
}
</style>

<style>

.navbar .van-nav-bar__title {
    color: #FFF;
}
.van-nav-bar .van-icon, .van-nav-bar__text {
  color: #FFF;
}
.van-tabs__nav--card {
    border: 1px solid #0079FE;
}
.van-tabs__nav--card .van-tab.van-tab--active {
    background-color: #0079FE;
}
.van-tabs__nav--card .van-tab {
    color: #0079FE;
    border-right: 1px solid #0079FE;
}

</style>