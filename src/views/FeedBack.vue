<template>
    <div>
        <!-- 导航栏 -->
        <van-nav-bar
            title="用户反馈"
            class="navbar"
            left-text="返回"
            left-arrow
            @click-left="back"
        />
        <div class="cc-contest-feedback__container">
            <div class="form">
                <van-field type="text" label="竞赛名称" v-model="name" />
                <van-field type="text" label="相关网址" v-model="url" />
                <van-field type="textarea" label="备注" v-model="mark" /> 
            </div>
            <div class="submit-bottom-button">
                <van-button type="info" size="small" class="button" @click="submit">提交</van-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            form:{
                name:"",
                url:"",
                mark:""
            }
        }
    },
    methods:{
        back(){
            this.$router.back();
        },
        submit(){
            let url = ""
            this.axios.post(url,{
                data:this.form
            }).then(res=>{
                console.log(res)               
            }).catch(err=>{
                console.log(err)
            })
        }
    }
};
</script>

<style scoped>
.navbar {
    background: #0079FE;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}
.cc-contest-feedback__container{
    margin: 5px;
    margin-top: 45px;
    /* border-radius: 15px; */
    overflow: auto;
    height: calc(70vh - 45px);
    position: relative;
}
.cc-contest-feedback__container > .form{
    overflow: hidden;
    margin: 60px 5px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
.cc-contest-feedback__container > .submit-bottom-button{
    display: flex;
    align-items: center;
    justify-content: center;
    /* position: absolute; */
    margin-top: 50px;
    bottom: 20px;
    width:100%;
}
.cc-contest-feedback__container > .submit-bottom-button > .button{
    width: 160px;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
    border-radius: 25px;
}
</style>


<style>
.navbar .van-nav-bar__title {
    color: #FFF;
}
.van-nav-bar .van-icon,
.van-nav-bar__text {
    color: #FFF;
}
.toSearch .van-cell__value {
    margin-left: 20px !important;
}
</style>