<template>
    <div class="cc-pwa__container" ref="button">
        <img src="@/assets/image/logo.jpg" class="icon" alt="logo" />
        <div class="label">竞枢</div>
        <van-button size="mini" type="default" style="display: block" @click="$emit('click')" >添加应用</van-button>
    </div>
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
    background-color: white;
    display: flex;
    bottom: 0;
    height: 20vh;
    max-height: 200px;
    min-height: 150px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
}
.cc-pwa__container > .icon {
    height: 50px;
    width: 50px;
}
.cc-pwa__container > .label{
    margin-bottom:5px;
}
</style>