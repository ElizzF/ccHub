<template>
    <div class='container' style="background: #FEFEFE;">
        <!-- 导航栏 -->
        <div class='navTop'>
            <van-nav-bar title="证书" class="navbar" @click-right="onClickRight">
                <template #right>
                    <van-icon name="search" color="#FFF" size="18" />
                </template>
            </van-nav-bar>
            <van-dropdown-menu>
                <van-dropdown-item v-model="value1" :options="option1" :title="styleTitle" @change="changeStyleTitle"/>
                <van-dropdown-item v-model="value2" :options="option2" :title="sortTitle" @change="changeSortTitle"/>
            </van-dropdown-menu>
        </div>

        <div class='comList'>
            <div class='comListItem' @click="toCerInfo">
                
                <van-image width="100%" height="140" :src="require('../assets/image/u808.png')" />
                <div class='itemTop'>
                    <div class='itemState'>正在报名</div>
                    <div class='itemDistance'>离报名截止还有45天</div>
                </div>
                <div class='itemTitle'>2020年下半年CET考试</div>
                <div class='itemInfo'>8888 浏览 | 624 关注 | 通用型证书</div>
            </div>
            <div class='comListItem'>
                <van-image class='comImg' width="100%" height="140" :src="require('../assets/image/u815.png')" />
                <div class='itemTop'>
                    <div class='itemState'>正在报名</div>
                    <div class='itemDistance'>离报名截止还有45天</div>
                </div>
                <div class='itemTitle'>2020年ACCA国际注册会计师</div>
                <div class='itemInfo'>8888 浏览 | 624 关注 | 国际级证书</div>
            </div>
            
        </div>

        <!-- <van-tabbar v-model="active" route>
            <van-tabbar-item icon='wap-home-o' to='/'>首页</van-tabbar-item>
            <van-tabbar-item class='trophy' icon-prefix='iconfont icon' icon='trophy' to='/competition'>竞赛</van-tabbar-item>
            <van-tabbar-item class='trophy' icon-prefix='iconfont icon' icon='jiangbei' to='/certificate'>证书</van-tabbar-item>
            <van-tabbar-item icon="chat-o" badge="20" to='/chat'>聊天</van-tabbar-item>
            <van-tabbar-item icon="user-o" to='/mine'>我的</van-tabbar-item>
        </van-tabbar> -->
        <nav-bottom v-model="active"/>
    </div>
</template>

<script>
import navBottom from '../components/common/navBottom.vue';

export default {
    components: { navBottom },
    data() {
        return {
            active: 2,
            value1: '',
            styleTitle: '类别',
            value2: '',
            sortTitle: '排序',
            option1: [
                { text: '全部', value: 0 },
                { text: '通用型证书', value: 1 },
                { text: '英语能力证书', value: 2 },
                { text: '职业资格类证书', value: 3 },
            ],
            option2: [
                { text: '综合', value: 0 },
                { text: '近期报名', value: 1 },
                { text: '考试费用', value: 2 },
            ],
        };
    },
    methods: {
        changeStyleTitle (i) {
            this.styleTitle = this.option1[i].text;
        },
        changeSortTitle (i) {
            this.sortTitle = this.option2[i].text;
        },
        toCerInfo() {
            this.$router.push({
                path: '/certificateInfo'
            })
        },
        onClickRight() {
            this.$router.push({
                path: '/searchPage'
            })
        },
    }
}
</script>

<style scoped>
.navbar {
    background: #0079FE;
}
.navTop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
}
.comList {
    background: rgba(242,242,242);
    padding-top: 110px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 45px;
}
.comListItem {
    border-radius: 15px;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    flex-direction: column;
    background: #fff;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 15px;
}
.itemImg {
    width: 100%;
    height: 120px;
    background: deepskyblue;
}
.itemTop {
    display: flex;
    margin-top: 5px;
    align-items: center;
}
.itemState {
    font-size: 16px;
    color: #008080;
    font-weight: 600;
}
.itemDistance {
    margin-left: 25px;
    font-size: 16px;
    color: #AAAAAA;
}
.itemTitle {
    margin-top: 5px;
    font-size: 20px;
    font-weight: 600;
}
.itemRegisterTime, .itemBeginTime {
    font-size: 16px;
    margin-top: 5px;
}
.itemAbout, .itemInfo {
    margin-top: 5px;
    color: #AAAAAA;
    font-size: 17px;
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