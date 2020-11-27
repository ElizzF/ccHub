<template>
    <div class='container' style="background: #FFF;">
        <!-- 导航栏 -->
        <van-nav-bar
            title="搜索"
            class="navbar"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        
        <form action="javascript:return true" @submit.prevent="formSubmit">
            <van-search class='toSearch' 
                @keydown="searchTo($event)"
                v-model="search_value"
                shape="round"
                placeholder="请输入你感兴趣的内容"
                style="padding-top: 57px;"
                show-action
            >
                <template #action>
                    <van-button round type="info" @click="onLoad" style="height: 30px; display: inline-block">搜索</van-button>
                </template>
            </van-search>
        </form>
       
       <div class='searchList'>
           <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class='comList' ref="pullRefresh">
                <div v-if='IsNotFound' style="text-align: center"></div>
                <template v-else>
                    <van-list
                        class="listMain"
                        v-model="loading"
                        :finished="finished"
                        finished-text="- 没有更多了 -"
                        @load="onLoad"
                        :offset="130"
                    >
                        <van-cell @click="lookMoreInfo(item.id)" v-for="item in searchList" :key="item.id" :title="item.title" title-class="titleStyle">
                            <template #label>
                                <div class="labelDistance" :style="{ color: item.stateColor }">{{ item.state }}</div>
                                <div class="labelTime">{{ item.time }}</div>
                            </template>
                        </van-cell>
                    </van-list>
                </template>
            </van-pull-refresh>
       </div>
       <!-- <div class='searchMain'>
           <div class='hotSearch'>
               <div class='txt'>热门搜索</div>
               <van-grid :border="false" :column-num="3">
                    <van-grid-item v-for="item in hotItems" :key="item.id">
                        <div class='hotSearchItem'>{{ item.value }}</div>
                    </van-grid-item>
                </van-grid>
           </div>

           <div class='historySearch'>
               <div class='txt'>历史搜索</div>
               <van-grid :border="false" :column-num="3">
                    <van-grid-item v-for="item in historyItems" :key="item.id">
                        <div class='historySearchItem'>{{ item.value }}</div>
                    </van-grid-item>
                </van-grid>
           </div>
       </div>     -->
       <div class="search-not-found__container"  v-if="IsNotFound">
           <!-- 搜索404页面 -->
           <div class="">
               <img src="@/assets/image/search-404.jpg" />
               <div style="text-align:center;margin-top:5px;">搜不到想要的竞赛/证书</div>
               <div style="text-align:center;margin-top:2px;"><a href="feedback">点击我反馈</a></div>
           </div>
       </div>
    </div>
</template>

<script>
//import { Dialog } from 'vant'
export default {
    data() {
        return {
            hotItems: [
                { id: 1, value: '数学建模' },
                { id: 2, value: '英语六级' },
                { id: 3, value: 'xxx' },
                { id: 4, value: '巴拉巴拉' },
            ],
            historyItems: [
                { id: 1, value: '数学建模' },
            ],
            IsNotFound: false,
            search_value: "",
            
            page: 1,
            loading: false, // 当loading为true时，转圈圈
            finished: false, // 数据是否请求结束，结束会先显示- 没有更多了 -
        
            isLoading:false, // 下拉的加载图案

            searchList: [],
            tempFlagValue: '',   //判断现在写的关键词与上一次是否一致
        };
    },
    created() {
      
    },
    methods: {
        onClickLeft() {
            let flag = localStorage.getItem("ccflag");
            console.log(flag);
            if(flag == true) {
                this.$router.push({
                    path: '/competition'
                })
            } else {
                this.$router.push({
                    path: '/certificate'
                })
            }
        },
        formSubmit () {
            return false; 
        },
        search() {
            let nowDate = new Date();
            let nowTime= nowDate.toLocaleString('zh', { hour12: false }); 
            let flag = localStorage.getItem("ccflag");
            if(flag == true) {
                this.axios({
                    method: "GET",
                    url: "/contest/search",
                    params: {
                        keyword: this.search_value,
                        pageNum: this.page,
                    }
                }).then((res) => {
                    this.IsNotFound = false;
                    this.loading = false;

                    let list = res.data.data.content;
                    if (list.length == 0 && this.page == 1) {
                        this.IsNotFound = true;
                    }

                    list.forEach((index) => {
                        let listItem = {};
                        listItem.title = index.name;
                        listItem.id = index.id;
                        if(index.contestStart == index.contestEnd) listItem.time = "比赛时间尚未决定";
                        else listItem.time = index.contestStart + " — " + index.contestEnd;
                        
                        let enrollStart = new Date(index.enrollStart.replace(/-/g,"/"));
                        let enrollEnd = new Date(index.enrollEnd.replace(/-/g,"/"));
                        if(new Date(nowTime) >= enrollStart && new Date(nowTime) <= enrollEnd) {
                            let distance = parseInt((Date.parse(enrollEnd) - Date.parse(new Date(nowTime))) / (1000 * 60 * 60 * 24)); 
                            listItem.state = '距报名结束还有' + distance + '天'; 
                            listItem.stateColor = '#22BFA7';
                        } 
                        else if(new Date(nowTime) <= enrollStart) {
                            let distance = parseInt((Date.parse(enrollStart) - Date.parse(new Date(nowTime))) / (1000 * 60 * 60 * 24)); 
                            listItem.state = '距报名报名开始还有' + distance + '天';
                            listItem.stateColor = '#05C0FF';
                        }
                        else {
                            listItem.state = '报名已结束';
                            listItem.stateColor = '#AAAAAA';
                        }
                        this.searchList.push(listItem);
                    })

                    this.page++;
                    // 如果加载完毕，显示没有更多了
                    if (this.page == res.data.data.totalPages + 1) {
                        this.finished = true;
                    }
                }).catch(() => {
                    this.IsNotFound = true;
                });
            } else {
                this.axios({
                    method: "GET",
                    url: "/certificate/search",
                    params: {
                        keyword: this.search_value,
                        pageNum: this.page,
                    }
                }).then((res) => {
                    this.IsNotFound = false;
                    this.loading = false;

                    let list = res.data.data.content;
                    if (list.length == 0 && this.page == 1) {
                        this.IsNotFound = true;
                    }

                    list.forEach((index) => {
                        let listItem = {};
                        listItem.title = index.name;
                        listItem.id = index.id;
                        if(index.contest_start == index.contest_end) listItem.time = "比赛时间尚未决定";
                        else listItem.time = index.contest_start + " — " + index.contest_end;
                        
                        let enrollStart = new Date(index.enroll_start.replace(/-/g,"/"));
                        let enrollEnd = new Date(index.enroll_end.replace(/-/g,"/"));
                        if(new Date(nowTime) >= enrollStart && new Date(nowTime) <= enrollEnd) {
                            let distance = parseInt((Date.parse(enrollEnd) - Date.parse(new Date(nowTime))) / (1000 * 60 * 60 * 24)); 
                            listItem.state = '距报名结束还有' + distance + '天'; 
                            listItem.stateColor = '#22BFA7';
                        } 
                        else if(new Date(nowTime) <= enrollStart) {
                            let distance = parseInt((Date.parse(enrollStart) - Date.parse(new Date(nowTime))) / (1000 * 60 * 60 * 24)); 
                            listItem.state = '距报名报名开始还有' + distance + '天';
                            listItem.stateColor = '#05C0FF';
                        }
                        else {
                            listItem.state = '报名已结束';
                            listItem.stateColor = '#AAAAAA';
                        }
                        this.searchList.push(listItem);
                    })

                    this.page++;
                    // 如果加载完毕，显示没有更多了
                    if (this.page == res.data.data.totalPages + 1) {
                        this.finished = true;
                    }
                }).catch(() => {
                    this.IsNotFound = true;
                });
            }
        },
        //手机键盘事件
        searchTo(event){
            if(event.keyCode==13) { 
                this.onLoad();
            }
        },

        lookMoreInfo(e) {
            let flag = localStorage.getItem("ccflag");
            if(flag == true) {
                localStorage.setItem("contestId", e);
                this.$router.push({
                    path: '/competitionInfo'
                })
            } else {
                localStorage.setItem("certificateId", e);
                this.$router.push({
                    path: '/certificateInfo'
                })
            }
            
        },

        // 列表加载
        onLoad () {
            if(this.search_value.length == 0) {
                this.isLoading = false;
                this.searchList = [];
                this.page = 1;
                this.loading = false;
                this.finished = false;
                this.IsNotFound = true;
                this.tempFlagValue = '';
            } else {
                if(this.tempFlagValue != this.search_value) {
                    this.isLoading = false;
                    this.searchList = [];
                    this.page = 1;
                    this.loading = true;
                    this.finished = false;
                    this.IsNotFound = false;
                    this.tempFlagValue = this.search_value;
                }
                setTimeout(() => {
                    this.loading = true;
                    this.search()
                }, 500)
            }
        },
        onRefresh () {
            setTimeout(() => {
                // 重新初始化这些属性
                this.isLoading = false
                this.searchList = []
                this.page = 1
                this.loading = false
                this.finished = false
                this.IsNotFound = false
                // 请求信息
                this.search()
            }, 500)
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
.container {
    height: 100%;
    background: #FFF;   
}
.txt {
    font-size: 16px;
    font-weight: 600;
    margin-left: 20px;
    margin-top: 5px;
}
.hotSearchItem, .historySearchItem {
    width: 78px;
    height: 29px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(242, 242, 242, 1);
    border: none;
    border-radius: 17px;
}
.search-not-found__container{
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100% - 120px)
}
.titleStyle {
    font-size: 16px;
}
.labelDistance {
    display: inline-block;
    border: 1px solid;
    padding: 0 11px 0 11px;
    border-radius: 20px;
    font-size: 9px;
    margin-top: 10px;
}
.labelTime {
    font-size: 9px;
    margin-top: 3px;
    margin-left: 3px;
}
</style>

<style>
.navbar .van-nav-bar__title {
    color: #FFF;
}
.van-nav-bar .van-icon, .van-nav-bar__text {
    color: #FFF;
}
.toSearch .van-cell__value {
    margin-left: 20px !important;
}
</style>