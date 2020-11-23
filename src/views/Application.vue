<template>
    <div
        class="container"
        style="background: rgba(242, 242, 242); height: 100%"
    >
        <!-- 导航栏 -->
        <van-nav-bar
            :title="`${message.team_name} 队伍详情`"
            class="navbar"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="cellList" style="padding-top: 47px">
            <van-cell
                size="large"
                style="align-items: center; position: relative"
            >
                <template #icon>
                    <van-image
                        round
                        width="3rem"
                        height="3rem"
                        style="margin-right: 15px"
                        :src="message.userinfo.avatar_url"
                        @click="toAppliInfo"
                    />
                </template>
                <template #title>
                    <div class="appliTitle" @click="toAppliInfo">
                        {{ message.send_userName }}
                    </div>
                </template>

                <template #label>
                    <div class="appliLabel" @click="toAppliInfo">
                        {{ message.contain }}
                    </div>
                </template>

                <template #right-icon>
                    <div v-if="message.type == 1">
                        <van-button
                            round
                            type="info"
                            @click="accept"
                            class="acceptButton"
                            >同意</van-button
                        >
                        <van-button
                            round
                            color="#D7D7D7"
                            type="info"
                            @click="ignore"
                            class="ignoreButton"
                            >忽略</van-button
                        >
                    </div>
                    <div v-if="message.type == 0">
                        <div class="acceptTxt">已处理</div>
                    </div>
                    <!-- <div v-if="message.type == 3">
                        <div class="ignoreTxt">已忽略</div>
                    </div> -->
                </template>
            </van-cell>

            <!-- <van-cell title="路人丁" label="我想加入" 
                size='large' style="align-items: center;position: relative;"
            >
                <template #icon>
                    <van-image
                        round
                        width="3rem"
                        height="3rem"
                        style="margin-right: 15px;"
                        :src="avatarImg"
                    />
                </template>

                <template #right-icon>
                    <div class="acceptTxt">已同意</div>
                </template>
            </van-cell> -->
        </div>
    </div>
</template>

<script>
// import { Dialog } from 'vant'
export default {
    data() {
        return {
            teammateName: "路人甲",
            checked: true,
            display: 0,
            message: {
                userinfo: {},
            },
        };
    },
    mounted() {
        this.mid = this.$route.query.mid;
        if (!this.mid) {
            this.$router.back();
        }
        this.getMessageDetail();
    },
    methods: {
        accept() {
            this.$api.Team.DealRequest(this.mid,1).then(data=>{
                if (data.status==0){
                    this.getMessageDetail()
                }
            })
        },
        ignore() {
             this.$api.Team.DealRequest(this.mid,2).then(data=>{
                if (data.status==0){
                    this.getMessageDetail()
                }
            })
        },

        onClickLeft() {
            this.$router.push({
                path: "/chat",
            });
        },
        toAppliInfo() {
            this.$router.push({
                path: "/applicationInfo",
                query:{mid:this.mid}
            });
        },
        getMessageDetail() {
            this.$api.Message.GetMessageDetail(this.mid, 1).then(
                async (data) => {
                    let message = data.data
                    await this.$api.User.GetUserInfoById(
                        message.send_uid
                    ).then((data) => {
                        this.$set(message, "userinfo", data.data);
                    });
                    this.message = message 
                }
            );
        }
    },
};
</script>

<style scoped>
.navbar {
    background: #0079fe;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
}
.avatarList {
    display: flex;
    padding-top: 5px;
    padding-bottom: 5px;
}
.teammateName {
    color: black;
}
.title {
    background: #fff;
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 17px;
    color: black;
    justify-content: center;
}
.teamTxt {
    font-size: 16px;
    margin-left: 15px;
    color: black;
    margin-top: 10px;
}
.acceptButton {
    height: 30px;
    display: inline-block;
    margin-right: 10px;
}
.ignoreButton {
    height: 30px;
    display: inline-block;
}
.ignoreTxt,
.acceptTxt {
    margin-right: 10px;
}
</style>

<style>
.navbar .van-nav-bar__title {
    color: #fff;
}
.van-nav-bar .van-icon,
.van-nav-bar__text {
    color: #fff;
}
</style>