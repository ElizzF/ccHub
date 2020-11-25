<template>
    <div class='container' style="background: #FFF;">
        <!-- 导航栏 -->
        <van-nav-bar
            title="更多路线"
            class="navbar"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        
        <div class='main' style="padding-top: 45px; height: 100%;" v-if="display">
            <div class='majorTxt'>您的专业是：</div>
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

            <van-button type="info" @click="confirm" round block style="width: 230px; margin: 0 auto;">确定</van-button>
        </div>
        
        
        <div class='main' style="padding-top: 60px; margin-left: 20px;" v-if="!display">
            <a-steps direction="vertical" :current="current" @change="stepsChange">
                <a-step 
                    :title="step.title" 
                    v-for="step in stepList"
                    :key="step.id"
                >
                    <span slot="description">
                        <div>{{ step.time }}</div>
                        <div>{{ step.description }}</div>
                    </span>
                </a-step>
               <!-- :description="step.description" -->
            </a-steps>
        </div>
        
        
      
    </div>
</template>

<script>
//import { Dialog } from 'vant'
export default {
    data() {
        return {
            display: false,

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
            stepList: []
        };
    },
    created() {
       this.initRoute();
    },
    methods: {
        stepsChange(current) {
            this.current = current;
        },
        initRoute() {
            this.$api.Route.GetRoute().then(data=>{
                let list = data.data;
                list.sort(this.cmp);
                list.forEach((index) => {
                    let listItem = {};
                    listItem.id = index.id;
                    listItem.title = index.name;
                    listItem.description = index.remarks;
                    listItem.time = index.time;
                    listItem.type = index.type;
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
</style>