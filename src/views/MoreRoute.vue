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
        
        <div class='main' style="padding-top: 45px" v-if="display">
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
            <van-grid :border="false" :column-num="3">
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

            <van-button type="info" @click="confirm" round block style="margin-top: 30px; width: 230px; margin: 0 auto;">确定</van-button>
        </div>
        
        
        <div class='main' style="padding-top: 60px; margin-left: 20px;" v-if="!display">
            <a-steps direction="vertical" :current="1">
                <a-step 
                    :title="step.title" 
                    :description="step.description"
                    v-for="step in stepList"
                    :key="step.id"
                >
                </a-step>
              
               
            </a-steps>
        </div>
        
        
      
    </div>
</template>

<script>
//import { Dialog } from 'vant'
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

            stepList: [
                { id: '1', title: '3.24 中国大学生知识竞赛', description: '规划：巴拉巴拉巴拉' },
                { id: '2', title: '6.24 CET-4英语考试', description: '规划：巴拉巴拉巴拉' },
                { id: '3', title: '8.24 中国大学生某某大赛', description: '规划：巴拉巴拉巴拉' },
                { id: '4', title: '9.22 中国大学生互联网+创新创业大赛', description: '规划：巴拉巴拉巴拉' },
            ]
        };
    },
    created() {
       
    },
    methods: {
        onClickLeft() {
            if(this.display == false) {
                this.display = true;
            }
            else {
                this.$router.push({
                    path: '/'
                })
            }
        },
        selectMajor(e) {
            //console.log(e.currentTarget.id);
            let target = e.currentTarget.id;
            this.majorItems[target - 1].plain = !this.majorItems[target - 1].plain;
            
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

.van-cell__value {
    margin-left: 20px !important;
}
.selectItem .van-button {
    width: 100px;
}
</style>