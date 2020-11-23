import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        comtestData: null,
        userinfo: JSON.parse(localStorage.getItem("userData") ? localStorage.getItem("userData") : "{}")
    },
    mutations: {
        setUserInfo(state, userinfo) {
            localStorage.setItem(
                "userData",
                JSON.stringify(userinfo)
            );
            state.userinfo = userinfo
        },
        Logout(state){
            localStorage.removeItem("userData");
            state.userinfo = {}
        }
    },
    actions: {
    },
    modules: {
    }
})
