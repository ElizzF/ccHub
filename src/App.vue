<template>
    <div id="app" style="background: rgb(242, 242, 242)">
        <router-view />
        <pwa-button ref="button" v-show="pwaButtonVisible" @click="showPwaApplicationAddWindow"/>
    </div>
</template>

<script>
import PwaButton from "@/components/common/pwaButton.vue";
export default {
    components: {
        PwaButton,
    },
    data() {
        return {
            pwaButtonVisible: false,
            pwaEvent: null,
        };
    },
    mounted() {
        // 提示安装pwa 应用
        window.addEventListener("beforeinstallprompt", (evt) => {
            evt.preventDefault();
            this.pwaButtonVisible = true;
            this.pwaEvent = evt;
        });
    },
    methods: {
        showPwaApplicationAddWindow() {
            this.pwaEvent.prompt();
            this.pwaEvent.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the A2HS prompt");
                } else {
                    console.log("User dismissed the A2HS prompt");
                }
                this.pwaEvent = null;
            });
        },
    },
};
</script>
<style>
/* Reset Css */
body,
html {
    margin: 0;
    padding: 0;
}
ul,
li {
    list-style: none;
    outline: none;
}
html,
body,
#app {
    height: 100%;
}
#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
