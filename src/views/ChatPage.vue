<template>
    <div class='container' style="background: rgba(245,245,249); height: 100%">
        <!-- 导航栏 -->
        <van-nav-bar title="路人甲" class="navbar" 
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        >
          <template #right>
            <van-icon class-prefix="iconfont icon" name="caidan" size='23px' color="#FFF"/>
          </template>
        </van-nav-bar>

        
        <van-tabbar class='chatBar' :style="{ height: barHeight }">
          <div class='chatBarTop' :style="{ height: barTopHeight }">
            <input class="chatInput" type="text" v-model="valueInput"/>
            <van-icon class="emoji" name="smile-o" size="33" color="rgba(170, 170, 170, 1)"  @click="toogleDialogEmoji"/>
            <van-icon class="add" name="add-o" size="32" color="rgba(170, 170, 170, 1)"/>
          </div>
          <VEmojiPicker
            class="emojiPicker"
            style="background: #fff; width: 100%; border-top: none"
            v-show="showDialog"
            labelSearch="Search"
            lang="pt-BR"
            @select="onSelectEmoji"
          />
        </van-tabbar>
  </div>
</template>

<script>
import { VEmojiPicker } from "v-emoji-picker";
export default {
  components: {
    VEmojiPicker
  },
  data() {
    return {
      showDialog: false,
      valueInput: "",
      barHeight: '',
      barTopHeight: '50px'
    }
  },

  methods: {
    onClickLeft() {
        this.$router.push({
            path: '/chat'
        })
    },
    onClickRight() {
        this.$router.push({
            path: '/groupInfo'
        })
    },
    toogleDialogEmoji() {
      this.showDialog = !this.showDialog;
      this.barTopHeight = this.showDialog ? '72px' : '50px';
      this.barHeight = this.showDialog ? '290px' : '';
    },
    onSelectEmoji(emoji) {
      this.valueInput += emoji.data;
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
.chatBar {
  display: flex;
  flex-direction: column;
  align-items: center;

}
.chatBarTop {
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  height: 50px;
}
.chatInput {
  background: inherit;
  background-color: rgba(255, 255, 255, 1);
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(170, 170, 170, 1);
  border-radius: 20px;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  height: 70%;
  margin-left: 10px;
  width: 73%;
  padding-left: 10px;
}
.emoji, .add {
  margin-left: 10px;
  cursor: pointer;
}

</style>

<style>

.navbar .van-nav-bar__title {
    color: #FFF;
}
.van-nav-bar .van-icon, .van-nav-bar__text {
  color: #FFF;
}
.emojiPicker #InputSearch {
  display: none !important;
}
</style>