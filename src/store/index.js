import Vue from 'vue'
import Vuex from 'vuex'
import { api } from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        comtestData: null,
        certificateData: null,
        userinfo: JSON.parse(localStorage.getItem("userData") ? localStorage.getItem("userData") : "{}"),
        messageList: [],
        showAlert:true,
        flag: true
    },
    mutations: {
        toggleAlert(state){
            state.showAlert^=true;
        },
        setUserInfo(state, userinfo) {
            localStorage.setItem(
                "userData",
                JSON.stringify(userinfo)
            );
            state.userinfo = userinfo
            state.messageList=[]
        },
        Logout(state) {
            localStorage.removeItem("userData");
            state.userinfo = {}
            state.messageList=[]
        },
        MergeMessageList(state, messageList) {
            let oldMessageList = state.messageList;
            // 区别已读和未读的状态
            // 已经处理的队伍请求就不再显示
            for (let message of messageList) {
                let index = oldMessageList.findIndex(e => e.mid == message.mid)
                if (index == -1) {
                    oldMessageList.unshift(message);
                    continue;
                }
                if (message.type != oldMessageList[index].type || message.readed != message.readed) {
                    // 如果类型变了，即队伍接收或者拒绝了,则更新
                    Vue.set(oldMessageList, index, message);
                    continue;
                }
            }
        }
    },
    actions: {
        UpdateMessageList({ commit, state }) {
            if (state.userinfo.id) {
                api.Message.GetMessageList().then(async data => {
                    let tasks = [];
                    let messageList = data.data;
                    for (let message of messageList) {
                        tasks.push(
                            api.User.GetUserInfoById(
                                message.send_uid
                            ).then((data) => {
                                Vue.set(message, "user", data.data);
                            })
                        );
                        // if (message.type==2 || message.type==3){
                        tasks.push(
                            api.Message.GetMessageDetail(message.mid).then(data => {
                                Vue.set(message, "detail", data.data)
                            })
                        )
                        // }
                    }
                    await Promise.all(tasks);
                    commit("MergeMessageList", messageList);
                })
            }
        }
    },
    modules: {

    }
})
