<template>
    <div class='container' style="background: rgba(242,242,242);">
        <!-- 导航栏 -->
        <van-nav-bar
            title="个人资料"
            class="navbar"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />

        <van-cell title="头像" size='large' style="padding-top: 60px; align-items: center;">
            <template #right-icon>
                <van-image
                    round
                    width="3rem"
                    height="3rem"
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
            </template>
        </van-cell>

        <div class="cellList">
            <van-cell title="姓名" size='large' value="张三" is-link />
            <van-cell title="性别" size='large' value="男" is-link />
            <van-cell title="签名" size='large' value="巴拉巴拉巴拉巴拉" is-link />
          
        </div>

        <div class='cellList'>
            <van-cell title="教育经历" size='large' is-link />
            <van-cell title="获奖经历" size='large' is-link />
        </div>

        <div class='cellList'>
            <van-cell title="兴趣标签" size='large' is-link />
        </div>

      
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        };
    },
    methods: {
        onClickLeft() {
            this.$router.push({
                path: '/mine'
            })
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
}
.cellList, .cellSafeList {
    margin-top: 10px;
}
</style>

<style>
.navbar .van-nav-bar__title {
    color: #FFF;
}
.van-nav-bar .van-icon, .van-nav-bar__text {
  color: #FFF;
}

</style>