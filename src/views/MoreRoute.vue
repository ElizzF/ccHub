<template>
    <div class='container' style="background: #FFF;">
        <!-- 导航栏 -->
        <van-nav-bar
            title="更多路线"
            class="navbar"
            left-text="返回"
            left-arrow
            right-text="日历模式"
            @click-left="onClickLeft"
            @click-right="calendar = true"
        />
        
        <div class='main' style="padding-top: 45px; height: 100%;" v-if="display">
            <div style="text-align: center; margin-top: 10px;">暂无数据</div>
            <!-- <div class='majorTxt'>您的专业是：</div>
            <van-grid :border="false" :column-num="3">
                <van-grid-item v-for="item in majorItems" :key="item.id" class='selectItem'>
                    <van-button
                        round 
                        type="info" 
                        :plain="item.plain"
                        :id="item.id"
                        @click="selectMajor($event)"
                    >
                        {{ item.name }}
                    </van-button>
                </van-grid-item>
                
            </van-grid>
            
            <div class='gradeTxt'>您现在是：</div>
            <van-grid :border="false" :column-num="3" style="margin-bottom: 30px;">
                <van-grid-item v-for="item in gradeItems" :key="item.id" class='selectItem'>
                    <van-button
                        round 
                        type="info" 
                        :plain="item.plain"
                        :id="item.id"
                        @click="selectGrade($event)"
                    >
                        {{ item.name }}
                    </van-button>
                </van-grid-item>
            </van-grid>

            <van-button type="info" @click="confirm" round block style="width: 230px; margin: 0 auto;">确定</van-button> -->
        </div>
        
        
        <div class='main' style="padding-top: 70px; margin-left: 20px; margin-right: 20px" v-if="!display">
            <a-steps direction="vertical" :current="current">
                <a-step 
                    :title="step.title" 
                    v-for="step in stepList"
                    :key="step.id"
                >
                    <span slot="description">
                        <div>{{ step.time }}</div>
                        <div>{{ step.description }}</div>
                        <div style="display: flex; align-items: center; margin-top: 5px;">
                            <van-icon @click="openEdit(step.id)" name="edit" size='23px' />
                            <van-icon @click="deleteStep(step.data_id, step.type)" style="margin-left: 10px;" name="delete" size='23px' />
                        </div>
                    </span>
                </a-step>
            </a-steps>
        </div>
        
        <van-dialog v-model="show" title="修改备注" show-cancel-button @confirm="edit" @cancel="cancel">
            <van-field style="margin-top: 10px;" class="editFieldTxt" clearable v-model="value" label="" placeholder="请输入你对该路径点的备注" />
        </van-dialog>
      
        <van-calendar v-model="calendar" @select="dateSelect" :show-confirm="false" color="#0079FE" position="right" :round="false" title="路线日历" :formatter="formatter" />
    </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
    data() {
        return {
            display: true,

            majorItems: [
                { id: '1', name: '理科', plain: true },
                { id: '2', name: '工科', plain: true },
                { id: '3', name: '商科', plain: true },
                { id: '4', name: '文科', plain: true },
            ],
            majorSelectedList: [],

            gradeItems: [
                { id: '1', name: '大一', plain: true },
                { id: '2', name: '大二', plain: true },
                { id: '3', name: '大三', plain: true },
                { id: '4', name: '大四', plain: true },
            ],
            gradeSelectedList: [],

            current: 0,
            show: false,
            stepList: [],
            value: '',
            contestId: null,

            calendar: false
        };
    },
    created() {
       this.initRoute();
    },
    methods: {
        dateSelect(day) {
            const month = day.getMonth() + 1;
            const date = day.getDate();
            this.stepList.forEach((index) => {
                let stepMonth = new Date(index.time.replace(/-/g,"/")).getMonth() + 1;
                let stepDate = new Date(index.time.replace(/-/g,"/")).getDate();
                if(month == stepMonth && date == stepDate) {
                    Dialog.confirm({
                        title: index.title,
                        message: index.description,
                        confirmButtonText: '前往',
                        confirmButtonColor: '#1989FA'
                    }).then(() => {
                        this.toMoreInfo(index.data_id, index.type);
                    })
                }
            })
        },
        formatter(day) {
            const month = day.date.getMonth() + 1;
            const date = day.date.getDate();

            this.stepList.forEach((index) => {
                let stepMonth = new Date(index.time.replace(/-/g,"/")).getMonth() + 1;
                let stepDate = new Date(index.time.replace(/-/g,"/")).getDate();
                if(month == stepMonth && date == stepDate) {
                    day.bottomInfo = "●"
                    day.className = "dayStyle"
                }
            })
            return day;
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
        openEdit(e) {
            this.show = true;
            this.contestId = e;
        },
        deleteStep(id, type) {
            Dialog.confirm({
                title: '提示',
                message: '你确定要从路线中移出它吗？',
               
            }).then(() => {
                this.$api.Route.RemoveRouteById(type, id).then(data=>{
                    if(data.status == 0) {
                        Dialog.alert({
                            title: '提示',
                            theme: 'round-button',
                            message: '删除成功！',
                            confirmButtonColor: '#1989FA'
                        });
                        this.stepList = [];
                        this.initRoute();
                    }
                }).catch(error=>{
                    Dialog.alert({
                        title: '警告',
                        theme: 'round-button',
                        message: error.message,
                        confirmButtonColor: '#1989FA'
                    })
                })
            })
        },
        edit() {
            let jsons = {
                "remarks": this.value
            }
            this.$api.Route.EditRouteRemarksByRouteId(this.contestId, jsons).then(data=>{
                if(data.status == 0) {
                    Dialog.alert({
                        title: '提示',
                        theme: 'round-button',
                        message: '修改成功！',
                        confirmButtonColor: '#1989FA'
                    });
                    this.value = "";
                    this.stepList = [];
                    this.initRoute();
                }
            }).catch(error=>{
                Dialog.alert({
                    title: '警告',
                    theme: 'round-button',
                    message: error.message,
                    confirmButtonColor: '#1989FA'
                })
            })
        },
        cancel() {
            this.value = "";
        },
        stepsChange(current) {
            this.current = current;
        },
        initRoute() {
            let nowDate = new Date();
            let nowTime= nowDate.toLocaleString('zh', { hour12: false }).substr(0,10);
            this.$api.Route.GetRoute().then(data=>{
                let list = data.data;
                if(list.length != 0) {
                    this.display = false;
                }
                list.forEach((index) => {
                    let listItem = {};
                    listItem.id = index.id;
                    listItem.title = index.name;
                    listItem.description = index.remarks;
                    listItem.time = index.time;
                    listItem.type = index.type;
                    listItem.data_id = index.data_id;

                    let temp = index.time.replace(/-/g,"/");
                    if(new Date(temp) < new Date(nowTime)) this.current++;
                    this.stepList.push(listItem);
                })
            })
        },
        onClickLeft() {
            // if(this.display == false) {
            //     this.display = true;
            // }
            // else {
                this.$router.push({
                    path: '/'
                })
            // }
        },
        selectMajor(e) {
            //console.log(e.currentTarget.id);
            let target = e.currentTarget.id;
            this.majorItems[target - 1].plain = !this.majorItems[target - 1].plain;
            this.majorItems.forEach((item) => {
                if(item.id != target) {
                    item.plain = true;
                }
            })
            
            //遍历选择项，找到已选择的
            let newSelectedList = this.majorItems.filter( (item) => {
                return item.plain == false;
            })
            this.majorSelectedList = newSelectedList;
        },

        selectGrade(e) {
            //console.log(e.currentTarget.id);
            let target = e.currentTarget.id;
            this.gradeItems[target - 1].plain = !this.gradeItems[target - 1].plain;
            this.gradeItems.forEach((item) => {
                if(item.id != target) {
                    item.plain = true;
                }
            })
            
            //遍历选择项，找到已选择的
            let newSelectedList = this.gradeItems.filter( (item) => {
                return item.plain == false;
            })
            this.gradeSelectedList = newSelectedList;
        },

        confirm() {
            this.display = false;
        },

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
    display: flex;
    flex-direction: column;   
}

.majorTxt, .gradeTxt {
    margin-top: 20px;
    margin-left: 10px;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
}
</style>

<style>
.navbar .van-nav-bar__title {
    color: #FFF;
}
.van-nav-bar .van-icon, .van-nav-bar__text {
    color: #FFF;
}

.selectItem .van-button {
    width: 100px;
    height: 35px;
}
.editFieldTxt .van-field__label{
    width: 2.2em;
}
.dayStyle {
    background: #ee0a24;
    color: #FFF;
    border-radius: 4px;
    width: 54px;
    height: 54px;
}
.van-dialog__header {
    padding-left: 10px;
    padding-right: 10px;
}
</style>