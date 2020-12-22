<template>
    <div class="container" style="background: rgba(242, 242, 242)">
        <!-- 导航栏 -->
        <div class="navTop">
            <van-nav-bar
                title="我的收藏"
                class="navbar"
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

        <div class="itemList" v-if="isDisplayJ">
            <div
                class="item"
                v-for="contest in contestList"
                :key="contest.id"
                @click="lookMoreInfo(contest.id)"
            >
                <van-image
                    class="comImg"
                    width="95%"
                    height="140"
                    :src="contest.imgUrl"
                />
                <div class="itemTxtList">
                    <div class="itemTop">
                        <div
                            class="itemState"
                            :style="{ color: contest.stateColor }"
                        >
                            {{ contest.state }}
                        </div>
                        <div class="itemDistance">{{ contest.distance }}</div>
                    </div>
                    <div class="itemTitle">{{ contest.title }}</div>
                    <div class="itemInfo">
                        {{ contest.watched }} 浏览 |
                        {{ contest.collected }} 关注 | {{ contest.level }}
                    </div>
                </div>
            </div>
        </div>

        <div class="itemList" v-if="isDisplayZ">
            <div
                class="item"
                v-for="certificate in certificateList"
                :key="certificate.id"
                @click="lookMoreInfoC(certificate.id)"
            >
                <van-image
                    class="comImg"
                    width="95%"
                    height="140"
                    :src="certificate.imgUrl"
                />
                <div class="itemTxtList">
                    <div class="itemTop">
                        <div
                            class="itemState"
                            :style="{ color: certificate.stateColor }"
                        >
                            {{ certificate.state }}
                        </div>
                        <div class="itemDistance">{{ certificate.distance }}</div>
                    </div>
                    <div class="itemTitle">{{ certificate.title }}</div>
                    <div class="itemInfo">
                        {{ certificate.watched }} 浏览 |
                        {{ certificate.collected }} 关注
                    </div>
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

            contestList: [],

            certificateList: []
        };
    },
    created() {
        this.getContestCollections();
        this.getCertificateCollections();
    },
    methods: {
        getCertificateCollections() {
            this.$api.Collect.GetCertificateCollect().then((data) => {
                let list = data.data;
                list.forEach((index) => {
                    let listItem = {};
                    listItem.title = index.certificateName;
                    listItem.imgUrl = index.pic_url;
                    listItem.level = index.level;
                    listItem.id = index.certificateId;
                    listItem.watched = index.views;
                    listItem.collected = index.collections;

                    let fireNum = parseInt(index.views / 9);
                    listItem.fireNum = fireNum;

                    if (index.status == 2) {
                        listItem.distance = index.restTime;
                        listItem.state = "正在报名";
                        listItem.stateColor = "#22BFA7";
                    } else if (index.status == 1) {
                        listItem.state = "即将报名";
                        listItem.stateColor = "#05C0FF";
                    } else {
                        listItem.state = "报名已截止";
                        listItem.stateColor = "#AAAAAA";
                    }
                    this.certificateList.push(listItem);
                });
            });
        },
        getContestCollections() {
            this.$api.Collect.GetContestCollect().then((data) => {
                let list = data.data;
                list.forEach((index) => {
                    let listItem = {};
                    listItem.title = index.contestName;
                    listItem.imgUrl = index.pic_url;
  
                    listItem.id = index.contestId;
                    listItem.watched = index.views;
                    listItem.collected = index.collections;

                    let fireNum = parseInt(index.views / 9);
                    listItem.fireNum = fireNum;

                    if (index.status == 2) {
                        listItem.distance = index.restTime;
                        listItem.state = "正在报名";
                        listItem.stateColor = "#22BFA7";
                    } else if (index.status == 1) {
                        listItem.state = "即将报名";
                        listItem.stateColor = "#05C0FF";
                    } else {
                        listItem.state = "报名已截止";
                        listItem.stateColor = "#AAAAAA";
                    }
                    this.contestList.push(listItem);
                });
            });
        },
        lookMoreInfo(e) {
            this.$router.push({
                path: "/competitionInfo",
                query: { contestId: e },
            });
        },
        lookMoreInfoC(e) {
            localStorage.setItem("certificateId", e);
            this.$router.push({
                path: "/certificateInfo"
            });
        },
        onClickLeft() {
            this.$router.push({
                path: "/mine",
            });
        },
        changeTabs(name, title) {
            if (title == "竞赛") {
                this.isDisplayJ = true;
                this.isDisplayZ = false;
            } else {
                this.isDisplayJ = false;
                this.isDisplayZ = true;
            }
        },
    },
};
</script>

<style scoped>
.navbar {
    background: #0079fe;
}

.itemList {
    padding-top: 105px;
    padding-bottom: 1px;
    background: rgba(242, 242, 242);
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
    background: #fff;
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
    color: #aaaaaa;
}
.itemTitle {
    margin-top: 5px;
    font-size: 21px;
    font-weight: 600;
}
.itemAbout,
.itemInfo {
    margin-top: 5px;
    color: #aaaaaa;
    font-size: 15px;
    margin-bottom: 5px;
}
</style>

<style>
.navbar .van-nav-bar__title {
    color: #fff;
}
.van-nav-bar .van-icon,
.van-nav-bar__text {
    color: #fff;
}
.van-tabs__nav--card {
    border: 1px solid #0079fe;
}
.van-tabs__nav--card .van-tab.van-tab--active {
    background-color: #0079fe;
}
.van-tabs__nav--card .van-tab {
    color: #0079fe;
    border-right: 1px solid #0079fe;
}
</style>