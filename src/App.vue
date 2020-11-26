<template>
    <div id="app" style="background: rgb(242, 242, 242)">
        <router-view />
        <pwa-button
            ref="button"
            v-show="pwaButtonVisible"
            @click="showPwaApplicationAddWindow"
            @hide="pwaButtonVisible = false"
        />
    </div>
</template>

<script>
import PwaButton from "@/components/common/pwaButton.vue";
import { mapActions } from "vuex";
export default {
    components: {
        PwaButton,
    },
    data() {
        return {
            pwaButtonVisible: false,
            pwaEvent: null,
            messageEvents: null,
        };
    },
    mounted() {
        // setTimeout(()=>{
        //     this.pwaButtonVisible=true
        // },1000)
        if (!this.messageEvents) {
            this.UpdateMessageList();
            this.messageEvents = setInterval(() => {
                this.UpdateMessageList();
            }, 60000);
        }
        window.onload = function () {
            document.addEventListener("touchstart", function (event) {
                if (event.touches.length > 1) {
                    event.preventDefault();
                }
            });
            var lastTouchEnd = 0;
            document.addEventListener(
                "touchend",
                function (event) {
                    var now = new Date().getTime();
                    if (now - lastTouchEnd <= 300) {
                        event.preventDefault();
                    }
                    lastTouchEnd = now;
                },
                false
            );
        };
        // 提示安装pwa 应用
        // window.addEventListener("beforeinstallprompt", (evt) => {
        //     evt.preventDefault();
        //     this.pwaButtonVisible = true;
        //     this.pwaEvent = evt;
        // });
    },
    beforeDestroy(){
        if (this.messageEvents){
            clearInterval(this.messageEvents)
        }
    },
    methods: {
        showPwaApplicationAddWindow() {
            this.pwaButtonVisible = false;
            this.pwaEvent.prompt();
            this.pwaEvent.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    // console.log("User accepted the A2HS prompt");
                } else {
                    // console.log("User dismissed the A2HS prompt");
                }
                this.pwaEvent = null;
            });
        },
        ...mapActions(["UpdateMessageList"]),
    },
};
</script>
<style>
/* Reset Css */
body,
html {
    margin: 0 !important;
    padding: 0 !important;
    height: calc(100% - 25px) !important;
}
ul,
li {
    list-style: none;
    outline: none;
}
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
