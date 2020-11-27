<template>
    <div class='container' style="background: rgba(242,242,242);">
        <!-- 导航栏 -->
        <van-nav-bar
            title="首页"
            class="navbar"
        />
        <!-- 这是首页头部搜索栏+索引栏 -->
        <div class='topBar' style="background: #fff; padding-bottom: 10px;">
            <!-- 设置移动端软键盘有搜索 -->
            <form action="javascript:return true" @submit.prevent="formSubmit">
                <van-search
                    v-model="search_value"
                    shape="round"
                    placeholder="请输入你感兴趣的内容"
                    style="padding-top: 57px;"
                />
            </form>
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
                <div v-if="noData" class="noDataTxt" style="text-align: center;">暂无数据</div>

                <a-steps progress-dot :current="current" v-if="!noData">
                    <a-step v-for="step in stepList" :key="step.id" :title="step.time" >
                        <span slot="description">
                            <div class='stepTitle'>{{ step.title }}</div>
                        </span>
                    </a-step>
                </a-steps>
                <!-- <div class="lineTime">
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
                <div class='timeLine'></div> -->
            </div>
        </div>

        <!-- 近期赛事 -->
        <div class="recentEvent" style="background: #fff;">
            <div class='recentTxt'>
                <div class='recentTitleTxt'>近期赛事</div>
                <div class='recentAboutMore' @click="toMoreCompetition">更多></div>
            </div>
            <div class='eventList'>
                <div class='eventItem' v-for="item in recentList" :key="item.id" @click="lookMoreInfo(item.id)">
                    <van-image width="50vw" height="98" radius="15" :src="item.imgUrl" />
                    <div class='eventInfo'>
                        <div class='eventTxt'>{{ item.title }}</div>
                        <div class='eventState'>{{ item.state }}</div>
                        <div class="eventTime"> {{ item.time }}</div>
                    </div>
                </div>

            </div>
        </div>
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
import { Dialog } from 'vant';
import navBottom from '../components/common/navBottom.vue';
import { mapMutations, mapState } from 'vuex';
export default {
    components: { navBottom },
    data() {
        return {
            search_value: '',
            active: 0,
            recentList: [],

            stepList: [],
            current: 0,
            noData: true
        };
    },
    computed:{
        ...mapState(["showAlert"])
    },
    created() {
        this.initRecentEventList();
        this.initRoute();
        this.alertRouteMessage();
    },
    methods: {
        ...mapMutations(
            ["toggleAlert"]
        ),
        alertRouteMessage() {
            if (!this.showAlert) return;
            this.$api.Route.AlertRouteMessage().then(data=>{
                if(data.data.length != 0) {
                    this.toggleAlert();
                    let mes = data.data[0];
                    Dialog.confirm({
                        title: '提示',
                        confirmButtonText: '前往',
                        message: "你报名的<a>" + mes.name + "</a>还剩" + mes.countdown + "天",
                        confirmButtonColor: '#1989FA'
                    }).then(() => {
                        this.toMoreInfo(mes.data_id, mes.type);
                    })
                }
            })
        },
        initRoute() {
            let nowDate = new Date();
            let nowTime= nowDate.toLocaleString('zh', { hour12: false }).substr(0,10);
            this.$api.Route.GetRoute().then(data=>{
                let list = data.data;
                if(list.length != 0) this.noData = false;
                list.forEach((index) => {
                    let listItem = {};
                    listItem.id = index.id;
                    listItem.title = index.name;
                    listItem.description = index.remarks;
                    listItem.time = index.time;
                    listItem.type = index.type;

                    let temp = index.time.replace(/-/g,"/");
                    if(new Date(temp) < new Date(nowTime)) this.current++;
                    this.stepList.push(listItem);
                })
            })
        },
        initRecentEventList() {
            let nowDate = new Date();
            let nowTime= nowDate.toLocaleString('zh', { hour12: false });

            this.$api.Contest.GetContest(null, null, null, null, 6).then(res=>{
                let list = res.data.list;
                list.forEach((index) => {
                    let listItem = {};
                    listItem.title = index.name;
                    listItem.imgUrl = index.picUrl;
                    listItem.id = index.id;
                    if(index.contestStart == index.contestEnd) listItem.time = "比赛时间尚未决定";
                    else {
                        listItem.time = index.contestStart + " — " + index.contestEnd;
                    }

                    let enrollStart = new Date(index.enrollStart.replace(/-/g,"/"));
                    let enrollEnd = new Date(index.enrollEnd.replace(/-/g,"/"));
                    if(new Date(nowTime) >= enrollStart && new Date(nowTime) <= enrollEnd) {
                        listItem.state = '正在报名'; 
                    } 
                    else if(new Date(nowTime) <= enrollStart) {
                        listItem.state = '即将报名';
                    }
                    else {
                        listItem.state = '报名结束';
                    }
                    this.recentList.push(listItem);   
                })
            }) 
        },
        toMoreInfo(id, type) {
           if(type == 1) {
                localStorage.setItem("contestId", id);
                this.$router.push({
                    path: '/competitionInfo'
                })
           }
            else {
                localStorage.setItem("certificateId", id);
                this.$router.push({
                    path: '/certificateInfo'
                })
            }
        },
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
        lookMoreInfo(e) {
            localStorage.setItem("contestId", e);
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
        },
        formSubmit () {
            return false; 
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
.stepTitle {
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; 
    -webkit-box-orient: vertical; 
    -webkit-line-clamp: 2; 
    overflow: hidden; 
    padding: 0 10px 0 10px
}
.myRouteTxt, .recentTxt {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
    display: flex;
    justify-content: center;
    align-items: center;
    /* position: relative; */
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
    align-items: center;
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
    width: 50vw;
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