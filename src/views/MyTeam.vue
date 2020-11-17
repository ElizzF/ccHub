<template>
<div class='container' style="background: rgba(249, 249, 249); height: 100%">
    <!-- 导航栏 -->
    <div class='navTop'>
        <van-nav-bar title="我的组队" class="navbar" 
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        >
        </van-nav-bar>
        <van-cell>
               <van-tabs type="card" @click="changeTabs">
                  <van-tab title="我发起的"></van-tab>
                  <van-tab title="我加入的"></van-tab>
                </van-tabs>
        </van-cell>
    </div>
    <div class='itemList' v-if="isDisplayJ" style="background: rgba(249, 249, 249);">
        <div class='item'>
            <div class='itemTitle'>2020年工业大数据创新竞赛</div>
            <van-cell title="路人甲" label="小组成员数：2" is-link to="/" title-class='cellStyle' label-class='labelStyle' style="align-items: center;">
                <template #icon>
                    <van-image
                        round
                        width="4rem"
                        height="4rem"
                        src="https://img.yzcdn.cn/vant/cat.jpeg"
                        style="margin-right: 10px;"
                    />
                </template>
            </van-cell>
        </div>

        <div class='item' >
            <div class='itemTitle'>2020年工业大数据创新竞赛</div>
            <van-cell title="路人甲" label="小组成员数：2" is-link to="/" title-class='cellStyle' label-class='labelStyle' style="align-items: center;">
                <template #icon>
                    <van-image
                        round
                        width="4rem"
                        height="4rem"
                        src="https://img.yzcdn.cn/vant/cat.jpeg"
                        style="margin-right: 10px;"
                    />
                </template>
            </van-cell>
        </div>

        <div class='item'>
            <div class='itemTitle'>2020年工业大数据创新竞赛</div>
            <van-cell title="路人甲" label="小组成员数：2" is-link to="/" title-class='cellStyle' label-class='labelStyle' style="align-items: center;">
                <template #icon>
                    <van-image
                        round
                        width="4rem"
                        height="4rem"
                        src="https://img.yzcdn.cn/vant/cat.jpeg"
                        style="margin-right: 10px;"
                    />
                </template>
            </van-cell>
        </div>
      </div>
      

       <div class='itemList' v-if="isDisplayZ" style="background: rgba(249, 249, 249);">

        <div class='item'>
            <div class='itemTitle'>2020年工业大数据创新竞赛</div>
            <van-cell title="路人甲" label="小组成员数：2" is-link to="/" title-class='cellStyle' label-class='labelStyle' style="align-items: center;">
                <template #icon>
                    <van-image
                        round
                        width="4rem"
                        height="4rem"
                        src="https://img.yzcdn.cn/vant/cat.jpeg"
                        style="margin-right: 10px;"
                    />
                </template>
            </van-cell>
        </div>

        <div class='item'>
            <div class='itemTitle'>2020年工业大数据创新竞赛</div>
            <van-cell title="路人甲" label="小组成员数：2" is-link to="/" title-class='cellStyle' label-class='labelStyle' style="align-items: center;">
                <template #icon>
                    <van-image
                        round
                        width="4rem"
                        height="4rem"
                        src="https://img.yzcdn.cn/vant/cat.jpeg"
                        style="margin-right: 10px;"
                    />
                </template>
            </van-cell>
        </div>
      </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      isDisplayJ: true,
      isDisplayZ: false
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        path: '/mine'
      })
    },
    changeTabs(name, title) {
      if(title == '我发起的') {
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
    z-index: 1;
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
    font-size: 22px;
    font-weight: 600;
    margin-left: 10px;
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
.item .van-cell, .item .van-image {
  position: static;
} 
</style>