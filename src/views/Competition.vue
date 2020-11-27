<template>
    <div class='container' style="background: rgba(242,242,242);">
        <!-- 导航栏 -->
        <div class='navTop'>
            <van-nav-bar title="竞赛" class="navbar" @click-right="onClickRight">
                <template #right>
                    <van-icon name="search" color="#FFF" size="18" />
                </template>
            </van-nav-bar>
            <van-dropdown-menu>
                <van-dropdown-item v-model="value1" :title="styleTitle" ref="item">
                    <van-tree-select 
                        class="styleSelect"
                        @click-nav="initItem"
                        @click-item="changeStyleTitle"
                        :items="items"
                        :active-id.sync="activeId"
                        :main-active-index.sync="activeIndex"
                    />
                </van-dropdown-item>
                <van-dropdown-item v-model="value2" :options="option2" :title="levelTitle" @change="changeLevelTitle"/>
                <van-dropdown-item v-model="value3" :options="option3" :title="sortTitle" @change="changeSortTitle"/>
            </van-dropdown-menu>
        </div>

        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class='comList' ref="pullRefresh">
            <div v-if='noData' style="text-align: center">
                暂无数据
            </div>
            <template v-else>
                <van-list
                    class="listMain"
                    v-model="loading"
                    :finished="finished"
                    finished-text="- 没有更多了 -"
                    @load="onLoad"
                    :offset="130"
                >
                    <div v-for="item in competitionList" :key="item.id" class='comListItem' @click="lookMoreInfo(item.id)">
                        <van-image class='comImgs' width="100%" height="140" :src="item.imageUrl" />
                        <div class='itemTop'>
                            <div class='itemState' :style="{ color: item.stateColor }">{{ item.state }}</div>
                            <div class='itemDistance'>{{ item.distance }}</div>
                        </div>
                        <div class='itemTitle'>{{ item.title }}</div>
                        <div class='itemBottom'>
                            <div style="color: red;"><van-icon color="red" class-prefix="iconfont icon" name="fire" size='23px' />{{ item.fireNum }}</div>
                            <div class='itemInfo'>{{ item.watch }} 浏览 | {{ item.collected }} 关注 | {{ item.level }} </div>
                        </div>
                    </div>
                </van-list>
            </template>

        </van-pull-refresh>

   

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
            items: [{
                text: '全部'
            }, {
                text: '工科类',
                children: [
                    { text: '数学建模', id: 1 },
                    { text: '程序设计', id: 2 },
                    { text: '机器人', id: 3 },
                    { text: '大数据', id: 4 },
                    { text: '电子&自动化', id: 5 },
                    { text: '工程机械', id: 6 },
                    { text: '计算机&信息技术', id: 7 },
                    { text: '土木建筑', id: 8 },
                    { text: '交通车辆', id: 9 },
                    { text: '航空航天', id: 10 },
                    { text: '船舶海洋', id: 11 },
                    { text: '材料高分子', id: 12 },
                    { text: '环境能源', id: 13 }
                ],
            }, {
                text: '理科类',
                children: [
                    { text: '数学', id: 1 },
                    { text: '物理', id: 2 },
                    { text: '化学化工', id: 3 },
                    { text: '力学', id: 4 },
                    { text: '健康生命&医学', id: 5 }
                ],
            }, {
                text: '商科类',
                children: [
                    { text: '创业', id: 1 },
                    { text: '创青春', id: 2 },
                    { text: '商业', id: 3 }
                ],
            }, {
                text: '文体类',
                children: [
                    { text: '外语', id: 1 },
                    { text: 'UI设计', id: 2 },
                    { text: '体育', id: 3 },
                    { text: '工业&创意设计', id: 4 },
                    { text: '服装设计', id: 5 },
                    { text: '歌舞书画&摄影', id: 6 },
                    { text: '模特', id: 7 },
                    { text: '演讲主持&辩论', id: 8 },
                    { text: '电子竞技', id: 9 },
                    { text: '科学文化艺术节', id: 10 }
                ],
            }, {
                text: '综合类',
                children: [
                    { text: '挑战杯', id: 1 },
                    { text: '环保公益', id: 2 },
                    { text: '职业技能', id: 3 },
                    { text: '社会综合', id: 4 }
                ],
            }],
            activeId: 1,
            activeIndex: 0,

            page: 1,
            loading: false, // 当loading为true时，转圈圈
            finished: false, // 数据是否请求结束，结束会先显示- 没有更多了 -
            noData: false, // 如果没有数据，显示暂无数据
            isLoading:false, // 下拉的加载图案


            active: 1,
            value1: '',
            styleTitle: '类别',
            value2: '',
            levelTitle: '级别',
            value3: '',
            sortTitle: '排序',
            option2: [
                { text: '全部', value: 0 },
                { text: '自由', value: 1 },
                { text: '国际级', value: 2 },
                { text: '国家级', value: 3 },
                { text: '省级', value: 4 },
                { text: '市级', value: 5 },
                { text: '校级', value: 6 },
            ],
            option3: [
                { text: '报名时间', value: 0 },
                { text: '浏览量', value: 1 },
            ],

            competitionList: [],
            scroll: 0,
        };
    },
    created() {
        this.initCompetitionList();
    },
    destroyed() {
        //保存当前页面状态
        this.scroll = document.documentElement.scrollTop;
        this.$store.state.comtestData = this.$data;
    },
    methods: {
        initCompetitionList() {
            if(this.$store.state.comtestData != null) {
                this.replaceCompetitionList();
                this.$store.state.comtestData = null;
                return ;
            }
            let nowDate = new Date();
            let nowTime= nowDate.toLocaleString('zh', { hour12: false });  
            
            let level = null;   //级别
            let type = null;  //类别
            if(this.levelTitle != '级别') {
                level = this.levelTitle;
            }
            if(this.styleTitle != '类别') {
                type = this.styleTitle;
            }
            let orderBy = null;  //排序
            if(this.sortTitle == "报名时间") orderBy = "enrollEnd";
            else if(this.sortTitle == "浏览量") orderBy = "watched";
            
            this.$api.Contest.GetContest(this.page, level, type, orderBy, null).then(res=>{
                this.loading = false
            
                let list = res.data.list;
                // 如果没有数据，显示暂无数据
                if (list.length == 0 && this.page == 1) {
                    this.noData = true
                }
                list.forEach((index) => {
                    let listItem = {};
                    listItem.title = index.name;
                    listItem.imageUrl = index.picUrl;
                    listItem.level = index.level;
                    listItem.id = index.id;
                    listItem.watch = index.watched;
                    listItem.collected = index.collected;

                    let fireNum = parseInt(index.watched / 9);
                    listItem.fireNum = fireNum;

                    let enrollStart = new Date(index.enrollStart.replace(/-/g,"/"));
                    let enrollEnd = new Date(index.enrollEnd.replace(/-/g,"/"));
                    if(new Date(nowTime) >= enrollStart && new Date(nowTime) <= enrollEnd) {
                        let distance = parseInt((Date.parse(enrollEnd) - Date.parse(new Date(nowTime))) / (1000 * 60 * 60 * 24)); 
                        listItem.distance = '离报名截止还有' + distance + '天';
                        listItem.state = '正在报名'; 
                        listItem.stateColor = '#22BFA7';
                    } 
                    else if(new Date(nowTime) <= enrollStart) {
                        listItem.state = '即将报名';
                        listItem.stateColor = '#05C0FF';
                    }
                    else {
                        listItem.state = '报名结束';
                        listItem.stateColor = '#AAAAAA';
                    }
                    this.competitionList.push(listItem);
                })
                this.page++;
                // 如果加载完毕，显示没有更多了
                if (this.page == res.data.pages + 1) {
                    this.finished = true;
                }
            }).catch(() => {
                this.noData = true;
            });
            // this.axios({
            //     method: "GET",
            //     url: "/contest",
            //     params: {
            //         pageNum: this.page,
            //         level: level,
            //         type: type,
            //         orderBy: orderBy
            //     }
            // }).then((res) => {
            //     this.loading = false

            //     let list = res.data.data.list;
            //     // 如果没有数据，显示暂无数据
            //     if (list.length == 0 && this.page == 1) {
            //         this.noData = true
            //     }
            //     list.forEach((index) => {
            //         let listItem = {};
            //         listItem.title = index.name;
            //         listItem.imageUrl = index.picUrl;
            //         listItem.level = index.level;
            //         listItem.id = index.id;
            //         listItem.watch = index.watched;
            //         listItem.collected = index.collected;

            //         let fireNum = parseInt(index.watched / 9);
            //         listItem.fireNum = fireNum;

            //         let enrollStart = new Date(index.enrollStart.replace(/-/g,"/"));
            //         let enrollEnd = new Date(index.enrollEnd.replace(/-/g,"/"));
            //         if(new Date(nowTime) >= enrollStart && new Date(nowTime) <= enrollEnd) {
            //             let distance = parseInt((Date.parse(enrollEnd) - Date.parse(new Date(nowTime))) / (1000 * 60 * 60 * 24)); 
            //             listItem.distance = '离报名截止还有' + distance + '天';
            //             listItem.state = '正在报名'; 
            //             listItem.stateColor = '#22BFA7';
            //         } 
            //         else if(new Date(nowTime) <= enrollStart) {
            //             listItem.state = '即将报名';
            //             listItem.stateColor = '#05C0FF';
            //         }
            //         else {
            //             listItem.state = '报名结束';
            //             listItem.stateColor = '#AAAAAA';
            //         }
            //         this.competitionList.push(listItem);
            //     })
            //     this.page++;
            //     // 如果加载完毕，显示没有更多了
            //     if (this.page == res.data.data.pages + 1) {
            //         this.finished = true;
            //     }
            // }).catch(() => {
            //     this.noData = true;
            // });
        },

        //恢复保存的页面状态
        replaceCompetitionList() {
            let tempData = this.$store.state.comtestData;
            this.activeId = tempData.activeId;
            this.activeIndex = tempData.activeIndex;

            this.page = tempData.page;
            this.loading = tempData.loading;
            this.finished = tempData.finished;
            this.noData = tempData.noData;
            this.isLoading = tempData.isLoading;

            this.active = tempData.active;
            this.value1 = tempData.value1;
            this.styleTitle = tempData.styleTitle;
            this.value2 = tempData.value2;
            this.levelTitle = tempData.levelTitle;
            this.value3 = tempData.value3;
            this.sortTitle = tempData.sortTitle;
            this.competitionList = tempData.competitionList;
            this.scroll = tempData.scroll;
            this.$nextTick(() => {
                document.documentElement.scrollTop = tempData.scroll;
            })
        },

        changeStyleTitle () {
            if(this.activeIndex != 0) 
                this.styleTitle = this.items[this.activeIndex].children[this.activeId - 1].text;
            else this.styleTitle = "类别";
            this.$refs.item.toggle();
            // 重新初始化这些属性
            this.isLoading = false
            this.competitionList = []
            this.page = 1
            this.loading = false
            this.finished = false
            this.noData = false
            // 请求信息
            this.initCompetitionList();
        },
        changeLevelTitle (i) {
            if(i == 0) this.levelTitle = "级别";
            else this.levelTitle = this.option2[i].text;
            // 重新初始化这些属性
            this.isLoading = false
            this.competitionList = []
            this.page = 1
            this.loading = false
            this.finished = false
            this.noData = false
            // 请求信息
            this.initCompetitionList();
        },
        changeSortTitle (i) {
            this.sortTitle = this.option3[i].text;
            // 重新初始化这些属性
            this.isLoading = false
            this.competitionList = []
            this.page = 1
            this.loading = false
            this.finished = false
            this.noData = false
            // 请求信息
            this.initCompetitionList();
        },

        lookMoreInfo(e) {
            localStorage.setItem("contestId", e);
            this.$router.push({
                path: '/competitionInfo',
                query:{"contestId":e}
            })
        },
        onClickRight() {
            this.$router.push({
                path: '/searchPage'
            })
        },
        initItem() {
            if(this.activeIndex == 0) {
               this.changeStyleTitle();
            }
            this.activeId = 1;
        },
        // 列表加载
        onLoad () {
            setTimeout(() => {
                this.initCompetitionList()
                this.loading = true
            }, 500)
        },
        onRefresh () {
            setTimeout(() => {
                // 重新初始化这些属性
                this.isLoading = false
                this.competitionList = []
                this.page = 1
                this.loading = false
                this.finished = false
                this.noData = false
                // 请求信息
                this.initCompetitionList()
            }, 500)
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
}
.itemTop {
    display: flex;
    margin-top: 5px;
    align-items: center;
}
.itemState {
    font-size: 16px;
    /* color: #008080; */
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
    font-size: 16px;
}
.itemBottom {
    display: flex;
    justify-content: space-between;
}
</style>

<style>

.navbar .van-nav-bar__title {
    color: #FFF;
}
.trophy .iconfont {
    font-size: 22px;
}
.styleSelect .van-sidebar-item--select::before {
    background: none;
}
</style>