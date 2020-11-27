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
                    <div v-for="item in certificateList" :key="item.id" class='comListItem' @click="lookMoreInfo(item.id)">
                        <van-image class='comImgs' width="100%" height="140" :src="item.imageUrl" />
                        <div class='itemTop'>
                            <div class='itemState' :style="{ color: item.stateColor }">{{ item.state }}</div>
                            <div class='itemDistance'>{{ item.distance }}</div>
                        </div>
                        <div class='itemTitle'>{{ item.title }}</div>
                        <div class='itemBottom'>
                            <div style="color: red;"><van-icon color="red" class-prefix="iconfont icon" name="fire" size='23px' />{{ item.fireNum }}</div>
                            <div class='itemInfo'>{{ item.watch }} 浏览 | {{ item.collected }} 关注 </div>
                        </div>
                    </div>
                </van-list>
            </template>

        </van-pull-refresh>
        <!-- <div class='comList'>
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
            
        </div> -->

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

            page: 1,
            loading: false, // 当loading为true时，转圈圈
            finished: false, // 数据是否请求结束，结束会先显示- 没有更多了 -
            noData: false, // 如果没有数据，显示暂无数据
            isLoading:false, // 下拉的加载图案

            certificateList: [],
            scroll: 0
        };
    },
    created() {
        this.initCompetitionList();
    },
    destroyed() {
        //保存当前页面状态
        this.scroll = document.documentElement.scrollTop;
        this.$store.state.certificateData = this.$data;
    },
    methods: {
        initCompetitionList() {
            if(this.$store.state.certificateData != null) {
                this.replaceCompetitionList();
                this.$store.state.certificateData = null;
                return ;
            }
            let nowDate = new Date();
            let nowTime= nowDate.toLocaleString('zh', { hour12: false });  
            
            let orderBy = null;  //排序
            if(this.sortTitle == "报名时间") orderBy = "enroll_end";
            else if(this.sortTitle == "浏览量") orderBy = "watched";
            
            this.$api.Certificate.GetCertificate(this.page, orderBy, null).then(res=>{
                this.loading = false
            
                let list = res.data.list;
                // 如果没有数据，显示暂无数据
                if (list.length == 0 && this.page == 1) {
                    this.noData = true
                }
                list.forEach((index) => {
                    let listItem = {};
                    listItem.title = index.name;
                    listItem.imageUrl = '';
                    listItem.id = index.id;
                    listItem.watch = index.watched;
                    listItem.collected = index.collected;

                    let fireNum = parseInt(index.watched / 9);
                    listItem.fireNum = fireNum;

                    let enrollStart = new Date(index.enroll_start.replace(/-/g,"/"));
                    let enrollEnd = new Date(index.enroll_end.replace(/-/g,"/"));
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
                    this.certificateList.push(listItem);
                })
                this.page++;
                // 如果加载完毕，显示没有更多了
                if (this.page == res.data.pages + 1) {
                    this.finished = true;
                }
            }).catch(() => {
                this.noData = true;
            });
        },

        //恢复保存的页面状态
        replaceCompetitionList() {
            let tempData = this.$store.state.certificateData;
            this.activeId = tempData.activeId;
            this.activeIndex = tempData.activeIndex;

            this.page = tempData.page;
            this.loading = tempData.loading;
            this.finished = tempData.finished;
            this.noData = tempData.noData;
            this.isLoading = tempData.isLoading;

            
            this.certificateList = tempData.certificateList;
            this.scroll = tempData.scroll;
            this.$nextTick(() => {
                document.documentElement.scrollTop = tempData.scroll;
            })
        },

        lookMoreInfo(e) {
            localStorage.setItem("certificateId", e);
            this.$router.push({
                path: '/certificateInfo'
            })
        },
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
            this.$store.state.flag = false;
            this.$router.push({
                path: '/searchPage'
            })
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
                this.certificateList = []
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
    background: deepskyblue;
}
.itemTop {
    display: flex;
    margin-top: 5px;
    align-items: center;
}
.itemBottom {
    display: flex;
    justify-content: space-between;
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