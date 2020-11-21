<template>
    <div class='container' style="background: rgba(242,242,242);">
        <!-- 导航栏 -->
        <van-nav-bar
            title="首页"
            class="navbar"
        />
        <!-- 这是首页头部搜索栏+索引栏 -->
        <div class='topBar' style="background: #fff; padding-bottom: 10px;">
            <van-search
                v-model="search_value"
                shape="round"
                placeholder="请输入你感兴趣的内容"
                style="padding-top: 57px;"
            />
            <van-row type="flex" justify="space-around" class="infoBar">
                <van-col span="6">

                    <div class='item' @click="toCom()">
                        
                        <van-button type="info" class='toCompetition'><van-icon class-prefix="iconfont icon" name="trophy" size='23px' /></van-button>
                        <div class='itemTxt' style="margin-top: 7px;">竞赛</div>
                    </div>
                </van-col>
                <van-col span="6">
                    <div class='item' @click="toCer()">
                        <van-button type="info" class='toCompetition'><van-icon class-prefix="iconfont icon" name="jiangbei" size='23px' /></van-button>
                        <div class='itemTxt' style="margin-top: 7px;">考证</div>
                    </div>
                </van-col>
                <van-col span="6">
                    <div class='item' @click="toTeam()">
                        <van-button type="info" class='toCompetition'><van-icon name='friends-o' size='25px'></van-icon></van-button>
                        <div class='itemTxt' style="margin-top: 7px;">组队</div>
                    </div>
                </van-col>
            </van-row>
        </div>

        <!-- 我的路线 -->
        <div class="myRoute" style="background: #fff;">
            <div class='myRouteTxt'>
                <div class='myRouteTitleTxt'>我的路线</div>
                <div class='aboutMore' @click="toMoreRoute">更多></div>
            </div>
            <div class='routeTime'>
                <div class="lineTime">
                    <div class='lineTimeItem'>
                        <div class='itemTop'>3.24</div>
                        <div class='itemBottom'>
                            <div class='txt'>某某比赛</div>
                        </div>
                    </div>
                   <div class='lineTimeItem'>
                        <div class='itemTop'>4.24</div>
                        <div class='itemBottom'>
                            <div class='txt'>某某比赛</div>
                        </div>
                    </div>
                    <div class='lineTimeItem'>
                        <div class='itemTop'>5.24</div>
                        <div class='itemBottom'>
                            <div class='txt'>某某比赛某某比赛某某比赛</div>
                        </div>
                    </div>
                    <div class='lineTimeItem'>
                        <div class='itemTop'>6.24</div>
                        <div class='itemBottom'>
                            <div class='txt'>某某比赛某某比赛</div>
                        </div>
                    </div>
                    <div class='lineTimeItem'>
                        <div class='itemTop'>7.24</div>
                        <div class='itemBottom'>
                            <div class='txt'>某某比赛</div>
                        </div>
                    </div>
                </div>
                <div class='timeLine'></div>
            </div>
        </div>

        <!-- 近期赛事 -->
        <div class="recentEvent" style="background: #fff;">
            <div class='recentTxt'>
                <div class='recentTitleTxt'>近期赛事</div>
                <div class='recentAboutMore' @click="toMoreCompetition">更多></div>
            </div>
            <div class='eventList'>
                <div class='eventItem' @click="toComInfo">
                    <van-image width="166" height="98" radius="15" :src="require('../assets/image/testImg.svg')" />
                    <div class='eventInfo'>
                        <div class='eventTxt'>第四届工业大数据创新竞赛</div>
                        <div class='eventState'>正在进行</div>
                        <div class="eventTime">12.01 07:00-12.31 23:59</div>
                    </div>
                </div>
                <div class='eventItem'>
                    <van-image width="166" height="98" radius="15" :src="require('../assets/image/testImg.svg')" />
                    <div class='eventInfo'>
                        <div class='eventTxt'>第四届工业大数据创新竞赛</div>
                        <div class='eventState'>正在进行</div>
                        <div class="eventTime">12.01 07:00-12.31 23:59</div>
                    </div>
                </div>
                <div class='eventItem'>
                    <van-image width="166" height="98" radius="15" :src="require('../assets/image/testImg.svg')" />
                    <div class='eventInfo'>
                        <div class='eventTxt'>第四届工业大数据创新竞赛</div>
                        <div class='eventState'>正在进行</div>
                        <div class="eventTime">12.01 07:00-12.31 23:59</div>
                    </div>
                </div>
                <div class='eventItem'>
                    <van-image width="166" height="98" radius="15" :src="require('../assets/image/testImg.svg')" />
                    <div class='eventInfo'>
                        <div class='eventTxt'>第四届工业大数据创新竞赛</div>
                        <div class='eventState'>正在进行</div>
                        <div class="eventTime">12.01 07:00-12.31 23:59</div>
                    </div>
                </div>

            </div>
        </div>
        <van-tabbar v-model="active" route>
            <van-tabbar-item icon='wap-home-o' to='/'>首页</van-tabbar-item>
            <van-tabbar-item class='trophy' icon-prefix='iconfont icon' icon='trophy' to='/competition'>竞赛</van-tabbar-item>
            <van-tabbar-item class='trophy' icon-prefix='iconfont icon' icon='jiangbei' to='/certificate'>证书</van-tabbar-item>
            <van-tabbar-item icon="chat-o" badge="20" to='/chat'>聊天</van-tabbar-item>
            <van-tabbar-item icon="user-o" to='/mine'>我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search_value: '',
            active: 0,
        };
    },
    methods: {
        toCom() {
            this.$router.push({
                path: '/competition'
            })
        },
        toCer() {
            this.$router.push({
                path: '/certificate'
            })
        },
        toTeam() {
            this.$router.push({
                path: '/myTeam'
            })
        },
        toComInfo() {
            this.$router.push({
                path: '/competitionInfo'
            })
        },
        toMoreCompetition() {
            this.$router.push({
                path: '/competition'
            })
        },
        toMoreRoute() {
            this.$router.push({
                path: '/moreRoute'
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
    z-index: 1;
}
.infoBar {
    margin-top: 10px;
    text-align: center;
}
.itemTxt {
    font-size: 14px;
    text-align: center;
}
.myRouteTxt, .recentTxt {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.myRouteTitleTxt, .recentTitleTxt {
    font-size: 20px;
    margin-left: 15px;
}
.aboutMore, .recentAboutMore {
    color: #7F7F7F;
    cursor: pointer;
    margin-right: 15px;
}
.myRoute, .recentEvent {
    margin-top: 20px;
    padding-top: 10px;
}
.timeLine {
    width: 100%;
    height: 1px;
    background: rgba(171,171,171);
    position: absolute;
    top: 64px;
}
.item {
    cursor: pointer;
}
.lineTime {
    display: flex;
    overflow: auto;
    margin-top: 20px;
    padding-bottom: 20px;
    padding-left: 15px;
    padding-right: 15px;
}
.lineTimeItem {
    margin-right: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}
.routeTime {
    overflow: auto;
    height: 150px;
    position: relative;
}
.itemTop {
    margin-bottom: 20px;
    width: 85px;
    height: 34px;
    color: #FFF;
    line-height: 34px;
    text-align: center;
    background: inherit;
    background-color: rgba(0, 121, 254, 0.43921568627451);
    border: none;
    border-radius: 42px;
}
.itemBottom {
    width: 105px;
    padding: 6px;
    font-size: 15px;
    background: #0079FE;
    border-radius: 8px;
    color: #FFF;
}
.itemBottom::before {
    content: '';
    width: 0;
    height: 0;
    border: 10px solid;
    position: absolute;
    top: 35px;
    left: 43px;
    border-color:  transparent transparent #0079FE transparent;
}
.txt {
    text-align: center;
}
.eventList {
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 60px;
}
.eventItem {
    display: flex;
    margin-top: 10px;
}
.eventInfo {
    margin-left: 20px;
}
.eventTxt {
    font-size: 18px;
    margin-top: 7px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 90%;
}
.eventState {
    background: rgba(112, 182, 3, 0.23921568627451);
    color:#70B603;
    display: inline-block;
    padding: 3px;
    font-size: 10px;
    margin-top: 5px;
}
.eventTime {
    font-size: 10px;
    color: #AAAAAA;
    margin-top: 2px;
}

</style>

<style>
.navbar .van-nav-bar__title {
    color: #FFF;
}
.toCompetition {
    border-radius: 50%;
    width: 44px;
    height: 44px;
}
.trophy .iconfont {
    font-size: 22px;
}

</style>