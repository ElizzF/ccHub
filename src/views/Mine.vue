<template>
    <div class='container' style="background: rgba(242,242,242);">
        <!-- 导航栏 -->
        <van-nav-bar
            title="我的"
            class="navbar"
        />

        <van-cell :title="username" :label="description" is-link to="/personInfo" style="padding-top: 60px; align-items: center;">
            <template #icon>
                <van-image
                    round
                    width="3rem"
                    height="3rem"
                    :src="avatarImg"
                    style="margin-right: 10px;"
                />
            </template>
        </van-cell>

        <div class="cellList">
            <van-cell title="我的路线" is-link to="moreRoute" />
            <van-cell title="我的收藏" is-link to="myCollection" />
            <van-cell title="我的消息" is-link to="myInfo" />
            <van-cell title="我的组队" is-link to="myTeam" />
        </div>

        <div class='cellSafeList'>
            <van-cell title="修改密码" is-link to="modifyPassword" />
        </div>

        <van-button type="primary" block style="margin-top: 20px;" @click="logout">退出当前账号</van-button>

        <!-- <van-tabbar v-model="active" route>
            <van-tabbar-item icon='wap-home-o' to='/'>首页</van-tabbar-item>
            <van-tabbar-item class='trophy' icon-prefix='iconfont icon' icon='trophy' to='/competition'>竞赛</van-tabbar-item>
            <van-tabbar-item class='trophy' icon-prefix='iconfont icon' icon='jiangbei' to='/certificate'>证书</van-tabbar-item>
            <van-tabbar-item icon="chat-o" badge="20" to='/chat'>聊天</van-tabbar-item>
            <van-tabbar-item icon="user-o" to='/mine'>我的</van-tabbar-item>
        </van-tabbar> -->
        <nav-bottom v-model="active" />
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import navBottom from '../components/common/navBottom.vue';
export default {
    components: { navBottom },
    data() {
        return {
            active: 4,     
            username: '',
            description: '',
            avatarImg: ''
        };
    },
    created() {
        this.initUserData();
    },
    computed:{
        ...mapState([
            "userinfo"
        ])
    },
    methods: {
        ...mapMutations({
            clearUserInfo:"Logout"
        }),
        initUserData() {
            this.$api.User.GetUserInfoById(0).then(data=>{
                let userData = data.data;
                this.username = userData.username;
                this.description = userData.description;
                this.avatarImg = userData.avatar_url;
            })
        },
        logout() {
            this.clearUserInfo()
            this.$router.push({
                path: '/'
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
}
.cellList, .cellSafeList {
    margin-top: 10px;
}
</style>

<style>
.navbar .van-nav-bar__title {
    color: #FFF;
}
.trophy .iconfont {
    font-size: 22px;
}
</style>