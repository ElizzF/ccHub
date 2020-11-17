<template>
    <transition name="swipe-fade">"
        <div class="cc-pwa__container" ref="button">
            <!-- <div class="cc-pwa__background" /> -->
            <img src="@/assets/image/logo.jpg" class="icon" alt="logo" style="z-index:1"/>
            <div class="label" style="z-index:1">竞枢</div>
            <div style="z-index:1">
                <van-button size="mini" type="default" @click="$emit('click')"
                    >添加应用</van-button
                >
                <van-button size="mini" type="default" @click="$emit('hide')"
                    >关闭弹窗</van-button
                >
            </div>
            <div  style="font-size: 12px;z-index:1">
                Safari点击中间分享以添加到主屏幕
            </div>
            
        </div>
    </transition>
</template>

<script>
export default {
    name: "CCPwaApplicationAddButton",
    data() {
        return {};
    },
    mounted() {},
    beforeDestroy() {},
    methods: {},
};
</script>

<style scoped>
.cc-pwa__container {
    position: fixed;
    z-index: 3000;
    /* display: none; */
    background-color: rgba(255,255,255,0.9);
    display: flex;
    bottom: 0;
    height: 20vh;
    max-height: 200px;
    min-height: 150px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.cc-pwa__background{
    position: absolute;
    height:100%;
    width:100%;
    background:rgba(255,255,255,1);
    z-index: 0;
    filter: blur(25px);
}

@supports (
    (-webkit-backdrop-filter: blur(25px)) or (backdrop-filter: blur(25px))
) {
    .cc-pwa__container {
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
    }
}
.cc-pwa__container > .icon {
    height: 50px;
    width: 50px;
    border-radius: 5px;
}
.cc-pwa__container > .label {
    margin-bottom: 5px;
}


.swipe-fade-enter-active,
.swipe-fade-leave-active {
    transition: opacity 1s ease-in-out, height 0.3s ease-in-out;
    min-height: 150px;
    height: 20vh;
}
.swipe-fade-enter,
.swipe-fade-leave-to {
    height: 0;
    min-height: 0;
    opacity: 0;
}
</style>