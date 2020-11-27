<template>
    <div class="container" style="background: rgba(242, 242, 242)">
        <!-- 导航栏 -->
        <van-nav-bar title="聊天" class="navbar" />

        <form action="javascript:return true" @submit.prevent="formSubmit">
            <van-search
                v-model="search_value"
                shape="round"
                placeholder="搜索"
                style="padding-top: 57px"
            />
        </form>

        <div class="chatList" >
            <template v-for="(item, index) in messageList">
                <van-swipe-cell
                    v-if="item.type == 1 && item.detail"
                    :key="`${index}-${item.mid}`"
                    style="align-items: center"
                    class="chatListItem"
                >
                    <van-cell
                        title="消息"
                        :label="`${item.send_userName} 申请加入你的${item.tname}队伍`"
                        :value="item.create_time | timeFormat"
                        :to="`/application?mid=${item.mid}`"
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
                </van-swipe-cell>
                <van-swipe-cell
                    :key="`${index}-${item.mid}`"
                    v-if="item.type == 3  && item.user && item.detail"
                    style="align-items: center"
                    class="chatListItem"
                >
                    <van-cell
                        :title="item.send_userName"
                        :label="`${item.detail.contain}`"
                        :to="`/application?mid=${item.mid}`"
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
            </template>
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
            -->
            <template  v-for="(item, index) in chatPreviewBox">
                <van-swipe-cell
                    :key="`${index}-${item. uid}-chat`"
                    v-if="item.user"
                    style="align-items: center"
                    class="chatListItem"
                >
                    <van-cell
                        :title="item.user.username"
                        :label="`${item.content}`"
                        :value="item.lasttime | timeFormat"
                        style="align-items: center"
                        @click="goChat(item)"
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
            </template>
        </div>
        <nav-bottom v-model="active"></nav-bottom>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import NavBottom from '@/components/common/navBottom.vue';
export default {
    data() {
        return {
            active: 3,
            search_value: "",
        };
    },
    components:{
        NavBottom
    },
    computed:{
        ...mapState([
            "messageList","chatList"
        ]),
        chatPreviewBox(){
            let box = []
            for (let item of this.chatList){
                if (item.box.length>0){
                    box.push(item.box[item.box.length-1])
                }
            }
            return box
        }
    },
    mounted() {
    },
    filters:{
        timeFormat:function(date){
            if (!date) return '很久之前'
            date = new Date(date)
            let now = new Date()
            now.setHours(0)
            // 今天
            if (date>now){
                return `${date.getHours()}`.padStart(2,'0')+':'+`${date.getMinutes()}`.padStart(2,'0')
            }   
            now.setDate(now.getDate()-1)
            // 昨天
            if (date>now){
                return `昨天`
            }
            // 几天前
            now = new Date()
            return `${parseInt((now.getTime()-date.getTime())/1000/24/60/60)}天前`
            
        }
    },
    methods: {
        formSubmit() {
            return false;
        },
        goChat(item){
            this.$router.push({
                name:"PrivateChat",
                params:{user:{uid:item.uid},teaminfo:{tid:item.tid}}
            })
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
.chatList{
    max-height:calc(100vh - 151px);
    overflow: auto;
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