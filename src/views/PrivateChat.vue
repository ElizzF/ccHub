<template>
    <div
        class="container"
        style="background: rgba(245, 245, 249); height: 100%"
    >
        <!-- 导航栏 -->
        <van-nav-bar
            v-if="chatUser && chatUser.info"
            :title="chatUser.info.username"
            class="navbar"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
        >
            <template #right>
                <van-icon
                    class-prefix="iconfont icon"
                    name="caidan"
                    size="23px"
                    color="#FFF"
                />
            </template>
        </van-nav-bar>

        <div
            class="chatbox"
            ref="chatBox"
            :style="{ height: `calc(100vh - ${showDialog ? '300' : '50'}px)` }"
        >
            <div
                class=""
                v-for="(item, index) in box()"
                :key="`${item.uid}-${index}`"
            >
                <div
                    style="display: flex; margin-bottom: 10px"
                    :style="{
                        flexDirection: item.owner ? 'row-reverse' : 'row',
                    }"
                >
                    <van-image
                        round
                        width="3rem"
                        height="3rem"
                        v-if="chatUser && chatUser.info"
                        :src="
                            item.owner
                                ? user.avatar_url
                                    ? user.avatar_url
                                    : 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3994862347,1268351928&fm=26&gp=0.jpg'
                                : chatUser.info.avatar_url
                                ? chatUser.info.avatar_url
                                : 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3994862347,1268351928&fm=26&gp=0.jpg'
                        "
                        style="margin: 0 10px"
                    />
                    <div
                        style="
                            width: 60%;
                            min-height: 50px;
                            padding: 10px;
                            background-color: white;
                            border-radius: 10px;
                        "
                    >
                        {{ item.content }}
                    </div>
                </div>
            </div>
        </div>

        <van-tabbar class="chatBar" :style="{ height: barHeight }">
            <div class="chatBarTop" :style="{ height: barTopHeight }">
                <input class="chatInput" type="text" v-model="valueInput" />
                <van-icon
                    class="emoji"
                    name="smile-o"
                    size="33"
                    color="rgba(170, 170, 170, 1)"
                    @click="toogleDialogEmoji"
                />
                <!-- <van-icon
                    class="add"
                    name="add-o"
                    size="32"
                    color="rgba(170, 170, 170, 1)"
                /> -->
                <van-button
                    size="small"
                    type="info"
                    style="width: 50px; margin: 0 5px"
                    @click="sendMessage(valueInput)"
                >
                    发送
                </van-button>
            </div>
            <VEmojiPicker
                class="emojiPicker"
                style="background: #fff; width: 100%; border-top: none"
                v-show="showDialog"
                labelSearch="Search"
                lang="pt-BR"
                @select="onSelectEmoji"
            />
        </van-tabbar>
    </div>
</template>

<script>
import { VEmojiPicker } from "v-emoji-picker";
import { mapActions, mapMutations, mapState } from "vuex";
import { Dialog } from "vant";
export default {
    components: {
        VEmojiPicker,
    },
    data() {
        return {
            showDialog: false,
            valueInput: "",
            barHeight: "",
            barTopHeight: "50px",
            chatUser: {},
        };
    },
    computed: {
        ...mapState(["wss", "chatList", "userinfo", "user"]),
    },
    mounted() {
        this.chatUser = this.$route.params.user;
        this.teaminfo = this.$route.params.teaminfo;
        if (!this.chatUser || !this.teaminfo) {
            this.onClickLeft();
        }
        if (!this.chatUser.info) {
            this.$api.User.GetUserInfoById(this.chatUser.uid).then((data) => {
                this.$set(this.chatUser, "info", data.data);
            });
        }
    },
    methods: {
        ...mapMutations(["MergeChatList"]),
        ...mapActions(["registerWSS"]),
        box() {
            if (this.$refs.chatBox)
                this.$refs.chatBox.scrollTo(
                    0,
                    this.$refs.chatBox.scrollHeight -
                        this.$refs.chatBox.clientHeight
                );
            let box = this.chatList.find((e) => e.uid == this.chatUser.uid);
            if (!box) return [];
            return box.box;
        },
        onClickLeft() {
            this.$router.push({
                path: "/chat",
            });
        },
        onClickRight() {
            this.$router.push({
                path: "/privateChatInfo",
            });
        },
        toogleDialogEmoji() {
            this.showDialog = !this.showDialog;
            this.barTopHeight = this.showDialog ? "72px" : "50px";
            this.barHeight = this.showDialog ? "290px" : "";
        },
        onSelectEmoji(emoji) {
            this.valueInput += emoji.data;
        },
        sendMessage(message) {
            if (message == "") return;
            let messagePackage = {
                message: message,
                tid: this.teaminfo.tid,
                uid: this.chatUser.uid,
            };
            if (this.wss) {
                this.wss.send(JSON.stringify(messagePackage));
                messagePackage.owner = this.userinfo.id;
                this.$api.User.GetUserInfoById(this.chatUser.uid).then(
                    (data) => {
                        messagePackage.user = data.data;
                    }
                );
                this.MergeChatList(messagePackage);
                this.$refs[`chatBox`].scrollTo(
                    0,
                    this.$refs.chatBox.scrollHeight -
                        this.$refs.chatBox.clientHeight
                );
            } else {
                Dialog.alert({
                    message: "当前已离线",
                });
                this.registerWSS();
            }
            this.valueInput = "";
        },
    },
};
</script>

<style scoped>
.chatbox {
    margin-top: 45px;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    overflow: auto;
}
.navbar {
    background: #0079fe;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
}
.chatBar {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.chatBarTop {
    width: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    height: 50px;
}
.chatInput {
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(170, 170, 170, 1);
    border-radius: 20px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    height: 70%;
    margin-left: 10px;
    width: 73%;
    padding-left: 10px;
}
.emoji,
.add {
    margin-left: 10px;
    cursor: pointer;
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
.emojiPicker #InputSearch {
    display: none !important;
}
</style>