<template>
    <div
        class="container"
        style="background: rgba(242, 242, 242); height: 100%"
    >
        <!-- 导航栏 -->
        <div class="navTop">
            <van-nav-bar
                title="我的组队"
                class="navbar"
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
        <div
            class="itemList"
            v-if="isDisplayJ"
            style="background: rgba(242, 242, 242)"
        >
            <div class="item" v-for="(item,index) in created" :key="`${item.tid}-${index}`">
                <div class="itemTitle" v-if="item.contestDetail">{{item.contestDetail.name}}</div>
                <van-cell
                    :title="item.tname"
                    :label="`小组成员数：${item.detail.teamPartners.length}`"
                    :to="`/teaminfo?teamid=${item.tid}`"
                    title-class="cellStyle"
                    label-class="labelStyle"
                    center
                >
                    <template #icon>
                        <van-image
                            round
                            width="4rem"
                            height="4rem"
                            :src="item.leaderAvatarUrl"
                            style="margin-right: 10px"
                        />
                    </template>
                    
                    <template #right-icon>
                        <van-icon name="arrow"></van-icon>
                    </template>
                </van-cell>
            </div>
        </div>

        <div
            class="itemList"
            v-else
            style="background: rgba(242, 242, 242)"
        >
            <div class="item" v-for="(item,index) in joined" :key="`${item.tid}-${index}`">
                <div class="itemTitle" v-if="item.contestDetail" >{{item.contestDetail.name}}</div>
                <van-cell
                    :title="item.tname"
                    :label="`小组成员数：${item.detail.teamPartners.length}`"
                    is-link
                    :to="`/teaminfo?teamid=${item.tid}`"
                    title-class="cellStyle"
                    label-class="labelStyle"
                    style="align-items: center"
                   
                >
                    <template #icon>
                        <van-image
                            round
                            width="4rem"
                            height="4rem"
                            :src="item.leaderAvatarUrl"
                            style="margin-right: 10px"
                        />
                    </template>
                </van-cell>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            isDisplayJ: true,
            isDisplayZ: false,
            joined: [], // 我加入的
            created: [], // 我发起的
        };
    },
    computed: {
        ...mapState(["userinfo"]),
    },
    mounted() {
        this.getData();
    },
    methods: {
        onClickLeft() {
            this.$router.push({
                path: "/mine",
            });
        },
        changeTabs(name, title) {
            if (title == "我发起的") {
                this.isDisplayJ = true;
                this.isDisplayZ = false;
            } else {
                this.isDisplayJ = false;
                this.isDisplayZ = true;
            }
        },
        init() {},
        getData() {
            this.joined=[]
            this.created=[]
            this.$api.Team.GetMyTeams().then(async (data) => {
                let joined=[],created=[]
                let tasks = []
                data.data.forEach((teaminfo) => {
                    tasks.push(this.$api.Team.GetDetail(teaminfo.tid).then(async (data) => {
                        data = data.data;
                        let me = data.teamPartners.find(
                            (e) => e.uid == this.userinfo.id && e.position==0
                        );
                        this.$set(teaminfo, "detail", data);
                        await this.$api.Contest.GetContestById(
                            teaminfo.contestid
                        ).then((data) => {     
                            data = data.data;
                            this.$set(teaminfo,"contestDetail",data);
                        });
                        if (me) {
                            joined.push(teaminfo);
                        } else {
                            created.push(teaminfo);
                        }
                    }));
                });
                await Promise.all(tasks)
                this.joined=joined
                this.created=created
            });
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
}

.navTop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
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
    font-size: 22px;
    font-weight: 600;
    margin-left: 10px;
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
.item .van-cell,
.item .van-image {
    /* position: static; */
}
</style>