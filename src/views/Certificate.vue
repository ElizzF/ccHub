<template>
    <div class='container' style="background: #FEFEFE;">
        <!-- 导航栏 -->
        <div class='navTop'>
            <van-nav-bar title="证书" class="navbar" >
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
                <van-image class='comImg' width="100%" height="140" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
                <div class='itemTop'>
                    <div class='itemState'>正在报名</div>
                    <div class='itemDistance'>离报名截止还有45天</div>
                </div>
                <div class='itemTitle'>2020年工业大数据创新竞赛</div>
                <div class='itemRegisterTime'>报名时间 2020.10.01——2020.12.01</div>
                <div class='itemBeginTime'>比赛时间 2020.10.01——2020.12.31</div>
                <div class='itemAbout'>阿巴阿巴阿巴</div>
                <div class='itemInfo'>8888 浏览 | 624 关注 | 国家级比赛</div>
            </div>
            <div class='comListItem'>
                <van-image class='comImg' width="100%" height="140" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
                <div class='itemTop'>
                    <div class='itemState'>正在报名</div>
                    <div class='itemDistance'>离报名截止还有45天</div>
                </div>
                <div class='itemTitle'>2020年工业大数据创新竞赛</div>
                <div class='itemRegisterTime'>报名时间 2020.10.01——2020.12.01</div>
                <div class='itemBeginTime'>比赛时间 2020.10.01——2020.12.31</div>
                <div class='itemAbout'>阿巴阿巴阿巴</div>
                <div class='itemInfo'>8888 浏览 | 624 关注 | 国家级比赛</div>
            </div>
            <div class='comListItem'>
                <van-image class='comImg' width="100%" height="140" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
                <div class='itemTop'>
                    <div class='itemState'>正在报名</div>
                    <div class='itemDistance'>离报名截止还有45天</div>
                </div>
                <div class='itemTitle'>2020年工业大数据创新竞赛</div>
                <div class='itemRegisterTime'>报名时间 2020.10.01——2020.12.01</div>
                <div class='itemBeginTime'>比赛时间 2020.10.01——2020.12.31</div>
                <div class='itemAbout'>阿巴阿巴阿巴</div>
                <div class='itemInfo'>8888 浏览 | 624 关注 | 国家级比赛</div>
            </div>
            <div class='comListItem'>
                <van-image class='comImg' width="100%" height="140" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
                <div class='itemTop'>
                    <div class='itemState'>正在报名</div>
                    <div class='itemDistance'>离报名截止还有45天</div>
                </div>
                <div class='itemTitle'>2020年工业大数据创新竞赛</div>
                <div class='itemRegisterTime'>报名时间 2020.10.01——2020.12.01</div>
                <div class='itemBeginTime'>比赛时间 2020.10.01——2020.12.31</div>
                <div class='itemAbout'>阿巴阿巴阿巴</div>
                <div class='itemInfo'>8888 浏览 | 624 关注 | 国家级比赛</div>
            </div>
        </div>

        <van-tabbar v-model="active" route>
            <van-tabbar-item icon="wap-home-o" to='/'>首页</van-tabbar-item>
            <van-tabbar-item icon="search" to='/competition'>竞赛</van-tabbar-item>
            <van-tabbar-item icon="friends-o" to='/certificate'>证书</van-tabbar-item>
            <van-tabbar-item icon="chat-o" badge="20" to='/chat'>聊天</van-tabbar-item>
            <van-tabbar-item icon="user-o" to='/mine'>我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
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
        }
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
}
.comList {
    padding-top: 100px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 45px;
}
.comListItem {
    display: flex;
    flex-direction: column;
    background: #fff;
    padding-top: 10px;
    padding-bottom: 10px;
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
    font-size: 20px;
    color: #008080;
    font-weight: 600;
}
.itemDistance {
    margin-left: 25px;
    font-size: 17px;
    color: #AAAAAA;
}
.itemTitle {
    margin-top: 5px;
    font-size: 24px;
    font-weight: 600;
}
.itemRegisterTime, .itemBeginTime {
    font-size: 17px;
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
.comImg {
    position: static;
}
</style>