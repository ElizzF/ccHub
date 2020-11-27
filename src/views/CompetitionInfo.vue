<template>
    <div class="container">
        <!-- 导航栏 -->
        <van-nav-bar
            title="竞赛详情"
            class="navbar"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <van-image
            class="topImg"
            style="padding-top: 45px"
            :src="imgUrl"
            height="200px"
            width="100%"
        >
        </van-image>
        <van-cell-group>
            <van-cell
                :title="title"
                :label="watch"
                title-class="comTitle"
                label-class="comLabel"
            />
            <van-cell :title="enrollTime" title-class="cellStyle" />
            <van-cell :title="contestTime" title-class="cellStyle" />
            <van-cell :title="originator" title-class="cellStyle" />
        </van-cell-group>
        <van-collapse v-model="activeNames1">
            <van-collapse-item
                title="详细内容"
                name="1"
                title-class="collapseCellStyle"
            >
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

        <van-collapse v-model="activeNames2" style="margin-top: 10px">
            <van-collapse-item
                class="colItem"
                title="竞赛附件"
                name="2"
                title-class="collapseCellStyle"
            ></van-collapse-item>
            <van-collapse-item
                class="colItem"
                title="通知公告"
                name="3"
                title-class="collapseCellStyle"
            ></van-collapse-item>
        </van-collapse>

        <van-cell
            class="allTroopscellTxt"
            title="全部队伍"
            title-class="allTroopsTxt"
        />
        <div class="cellGroup" style="padding-bottom: 50px">
            <van-cell
                v-for="(team, index) in teams"
                :key="`${team.tid}-${index}`"
                :title="`队伍名:${team.tname}`"
                :label="`小组成员数：${team.teamPartnerUrls.length + 1}`"
                is-link
                :to="`/teamInfo?teamid=${team.tid}`"
                title-class="cellStyle"
                label-class="labelStyle"
                style="align-items: center"
            >
                <template #icon>
                    <van-image
                        round
                        width="4rem"
                        height="4rem"
                        :src="team.leaderAvatarUrl"
                        style="margin-right: 10px"
                    />
                </template>
            </van-cell>
        </div>

        <van-goods-action class="bottomBar">
            <div class="barIcon">
                <van-goods-action-icon
                    icon="chat-o"
                    text="分享"
                    @click="showShare = true"
                />
                <van-goods-action-icon
                    :icon="isCollection"
                    text="收藏"
                    @click="goCollection"
                />
            </div>
            <div style="margin-right: 10px">
                <van-button
                    round
                    type="info"
                    @click="goCreateTeam"
                    style="height: 35px; margin-right: 10px"
                    >创建队伍</van-button
                >
                <van-button
                    round
                    type="info"
                    style="height: 35px"
                    @click="addRoute"
                    >加入我的路线</van-button
                >
            </div>
        </van-goods-action>
        
        
        <van-share-sheet
            v-model="showShare"
            title="立即分享给好友"
            :options="options"
            @select="shareItem"
        />
        <button ref="share" style="display: none"></button>
    </div>
</template>

<script>
import { Dialog } from "vant";
import ClipBoardJs from "clipboard";
import { mapActions, mapState } from 'vuex';
export default {
    data() {
        return {
            title: "",
            imgUrl: "",
            originator: "",
            enrollTime: "",
            contestTime: "",
            watch: "",
            info: "",
            teams: [],
            copyText: "",
            showShare: false,
            options: [
                // { name: '微信', icon: 'wechat' },
                // { name: '微博', icon: 'weibo' },
                { name: "复制链接", icon: "link" },
                // { name: '分享海报', icon: 'poster' },
                // { name: '二维码', icon: 'qrcode' },
            ],
            activeNames1: [],
            activeNames2: [],
            isCollection: "star-o",
        };
    },
    computed:{
        ...mapState(["user"])
    },
    created() {
        this.initContestInfo();
        this.getTeams();
        this.getContestStatus();
        this.getUser();
    },
    mounted() {
        let el = this;
        this.clip = new ClipBoardJs(this.$refs.share, {
            text: function () {
                return el.copyText;
            },
        });
        this.clip.on("success", () => {
            Dialog.alert({
                title: "提示",
                theme: "round-button",
                message: "链接已复制",
                confirmButtonColor: "#1989FA",
            });
        });
        this.clip.on("error", () => {
            Dialog.alert({
                title: "提示",
                theme: "round-button",
                message: "链接复制失败",
                confirmButtonColor: "#1989FA",
            });
        });
    },
    beforeDestroy() {
        this.clip.destroy();
    },
    methods: {
        ...mapActions([
            "updateUser"
        ]),
        getUser(){
            this.updateUser();
        },
        initContestInfo() {
            //   let contestId = localStorage.getItem("contestId");
            let contestId = this.$route.query.contestId;
            if (!contestId) {
                this.$router.back();
            }
            this.contestId = contestId;

            this.$api.Contest.GetContestById(this.contestId).then((res) => {
                this.title = res.data.name;
                this.imgUrl = res.data.picUrl;
                this.watch =
                    res.data.watched +
                    " 浏览 | " +
                    res.data.collected +
                    " 关注";
                this.originator = "主办方 " + res.data.originator;
                this.enrollTime =
                    "报名时间 " +
                    res.data.enrollStart +
                    " — " +
                    res.data.enrollEnd;
                if (res.data.contestStart == res.data.contestEnd)
                    this.contestTime = "比赛时间 未知";
                else
                    this.contestTime =
                        "比赛时间 " +
                        res.data.contestStart +
                        " — " +
                        res.data.contestEnd;
                this.info = res.data.info;
            });
        },
        shareItem(item) {
            if (item.name == "复制链接") {
                this.copyText = `${this.user.name} 邀请你参加比赛！比赛链接: ${document.documentURI}`;
                this.$refs.share.click();
                // this.copyText = "";
            }
        },
        onClickLeft() {
            this.$router.push({
                path: "/competition",
            });
        },
        getTeams() {
            this.$api.Team.GetContestTeam(this.contestId).then((data) => {
                data = data.data;
                this.teams = data;
            });
        },
        goCreateTeam() {
            this.$router.push({
                path: "/createTeam",
                query: { contestId: this.contestId },
            });
        },
        getContestStatus() {
            this.$api.Contest.GetContestStatusById(this.contestId).then(
                (data) => {
                    if (data.data == 1) this.isCollection = "star";
                    else this.isCollection = "star-o";
                }
            );
        },
        goCollection() {
            this.$api.Contest.AddOrDeleteCollectContestById(
                this.contestId
            ).then((data) => {
                if (data.status == 0)
                    this.isCollection =
                        this.isCollection == "star" ? "star-o" : "star";
            });
        },
        addRoute() {
            this.$api.Route.AddRouteByContestId(this.contestId)
                .then((data) => {
                    if (data.status == 0) {
                        Dialog.alert({
                            title: "提示",
                            theme: "round-button",
                            message: "添加成功！",
                            confirmButtonColor: "#1989FA",
                        });
                    }
                })
                .catch((error) => {
                    Dialog.alert({
                        title: "警告",
                        theme: "round-button",
                        message: error.message,
                        confirmButtonColor: "#1989FA",
                    });
                });
        },
    },
};
</script>

<style scoped>
.navbar {
    background: #0079fe;
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
    color: #aaaaaa;
    font-weight: 400;
}
.cellStyle {
    font-size: 14px;
}
.allTroopsTxt {
    font-size: 16px;
    margin-left: 15px;
    color: #7f7f7f;
    margin-top: 10px;
    margin-bottom: 10px;
}
.labelStyle {
    font-size: 12px;
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
.collapseCellStyle {
    font-size: 14px;
}
.colItem .van-collapse-item__content {
    font-size: 14px;
}
.topImg .van-image__img {
    border-radius: 0;
}
.allTroopscellTxt {
    background: rgb(242, 242, 242);
    padding: 0;
}
.contestInfoStyle .van-field__control {
    color: #969799;
}
</style>