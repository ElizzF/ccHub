<template>
    <div class="container" style="background: rgba(242, 242, 242)">
        <!-- 导航栏 -->
        <van-nav-bar title="聊天" class="navbar" />

        <form action="javascript:return true" @submit.prevent="formSubmit">
            <van-search
                v-model="search_value"
                shape="round"
                placeholder="搜索"
                style="padding-top: 57px;"
            />
        </form>

        <div class="chatList">
            <van-swipe-cell
                v-for="(item, index) in messageList"
                :key="`${index}-${item.mid}`"
                style="align-items: center"
                class="chatListItem"
            >
                <van-cell
                    :title="item.send_userName"
                    label="查看详情"
                    value="昨天"
                    to="/chatPage"
                    style="align-items: center"
                >
                    <template #icon>
                        <van-image
                            round
                            width="3rem"
                            height="3rem"
                            :src="item.user.avatar_url"
                            style="margin-right: 10px"
                        />
                    </template>
                </van-cell>
                <template #right>
                    <van-button
                        square
                        text="删除"
                        type="danger"
                        class="delete-button"
                    />
                </template>
            </van-swipe-cell>
 <!--
            <van-swipe-cell style="align-items: center" class="chatListItem">
                <van-cell
                    title="路人丁"
                    label="阿巴阿巴阿巴"
                    value="昨天"
                    to="/privateChat"
                    style="align-items: center"
                >
                    <template #icon>
                        <van-image
                            round
                            width="3rem"
                            height="3rem"
                            src="https://img.yzcdn.cn/vant/cat.jpeg"
                            style="margin-right: 10px"
                        />
                    </template>
                </van-cell>
                <template #right>
                    <van-button
                        square
                        text="删除"
                        type="danger"
                        class="delete-button"
                    />
                </template>
            </van-swipe-cell>

            <van-swipe-cell style="align-items: center" class="chatListItem">
                <van-cell
                    title="路人甲"
                    label="阿巴阿巴阿巴"
                    value="昨天"
                    to="/chatPage"
                    style="align-items: center"
                >
                    <template #icon>
                        <van-image
                            round
                            width="3rem"
                            height="3rem"
                            src="https://img.yzcdn.cn/vant/cat.jpeg"
                            style="margin-right: 10px"
                        />
                    </template>
                </van-cell>
                <template #right>
                    <van-button
                        square
                        text="删除"
                        type="danger"
                        class="delete-button"
                    />
                </template>
            </van-swipe-cell>

            <van-swipe-cell style="align-items: center" class="chatListItem">
                <van-cell
                    title="消息"
                    label="某人申请加入你的xxx队伍"
                    value="周六"
                    to="/application"
                    style="align-items: center"
                >
                    <template #icon>
                        <van-button type="info" class="infoAvatar"
                            ><van-icon
                                class-prefix="iconfont icon"
                                name="bell"
                                size="23px"
                        /></van-button>
                    </template>
                </van-cell>
                <template #right>
                    <van-button
                        square
                        text="删除"
                        type="danger"
                        class="delete-button"
                    />
                </template>
            </van-swipe-cell>-->
        </div>

        <van-tabbar v-model="active" route>
            <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item
                class="trophy"
                icon-prefix="iconfont icon"
                icon="trophy"
                to="/competition"
                >竞赛</van-tabbar-item
            >
            <van-tabbar-item
                class="trophy"
                icon-prefix="iconfont icon"
                icon="jiangbei"
                to="/certificate"
                >证书</van-tabbar-item
            >
            <van-tabbar-item icon="chat-o" badge="20" to="/chat"
                >聊天</van-tabbar-item
            >
            <van-tabbar-item icon="user-o" to="/mine">我的</van-tabbar-item>
        </van-tabbar> 
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 3,
            search_value: "",
            messageList: {},
        };
    },
    mounted() {
        this.getMessage();
    },
    methods: {
        getMessage() {
            this.$api.Message.GetMessageList().then((data) => {
                let tasks = [];
                for (let message of data.data) {
                    {
                        if (message.type == 0) {
                            tasks.push(
                                this.$api.User.GetUserInfoById(
                                    message.send_uid
                                ).then((data) => {
                                    this.$set(message, "user", data.data);
                                })
                            );
                        }
                    }
                }
                Promise.all(tasks).then(() => {
                    this.messageList = data.data;
                });
            });
            // TODO: 时间格式化
        },
        formSubmit () {
            return false; 
        }
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
.chatListItem {
    margin-bottom: 1px;
}
.infoAvatar {
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    margin-right: 10px;
}
</style>

<style>
.navbar .van-nav-bar__title {
    color: #fff;
}
.delete-button {
    height: 100%;
}
.trophy .iconfont {
    font-size: 22px;
}
</style>