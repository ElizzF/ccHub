import { Toast } from 'vant'
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
        showAlert: true,
        flag: true,
        user: {},
        wss: null,
        chatList: [],
        reconnectCount:0
    },
    mutations: {
        toggleAlert(state) {
            state.showAlert ^= true;
        },
        setUserInfo(state, userinfo) {
            localStorage.setItem(
                "userData",
                JSON.stringify(userinfo)
            );
            state.userinfo = userinfo
            state.messageList = []
        },
        setUser(state,user){
            state.user=user;
        },
        Logout(state) {
            localStorage.removeItem("userData");
            state.userinfo = {}
            state.messageList = []
        },
        setWSS(state,wss){
            state.wss =wss;
        },
        /**
         * 合并聊天记录
         * @param {*} state 
         * @param {*} chatMessage 
         */
        MergeChatList(state, chatMessage) {
            let chatList = state.chatList;
            // 统一化聊天记录
            if (!chatMessage.lasttime) {
                chatMessage.lasttime = chatMessage.last_time ? new Date(chatMessage.last_time) : new Date();
            }
            if (!chatMessage.content) {
                chatMessage.content = chatMessage.message
            }
            if (!chatMessage.uid) {
                chatMessage.uid = chatMessage.send_id
            }
            if ((chatMessage.type && chatMessage.type == 2) || chatMessage.recvice_id) {
                // 群聊
                let teamChat = chatList.find(e => e.tid == chatMessage.tid);
                if (!teamChat) {
                    teamChat = {
                        tid: chatMessage.tid,
                        box: []
                    }
                    chatList.unshift(teamChat);
                }
                teamChat.box.push(chatMessage);
            } else {
                // 私聊
                let userChat = chatList.find(e => e.uid == chatMessage.uid);
                if (!userChat) {
                    userChat = {
                        uid: chatMessage.uid,
                        box: []
                    }
                    chatList.unshift(userChat)
                }
                userChat.box.push(chatMessage)
            }
            console.log(chatList)
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
        },
        updateUser({ state }) {
            api.User.GetUserInfoById(state.userinfo.id).then(data => {
                state.user = data.data;
                
            })
        },
        getChatHistory({commit}){
            api.Chat.GetChatList().then(data=>{
                data.data.forEach(async element => {
                    await api.User.GetUserInfoById(element.uid).then(res=>{
                        element.user = res.data
                        commit("MergeChatList", element)
                    })
                });
            })
        },
        registerWSS({ state, dispatch, commit }) {
            if (!state.userinfo.id) {
                return
            }
            if (state.wss != null) {
                state.wss.close();
            }
            state.reconnectCount++;
            let ws = new WebSocket(`wss://soft.leavessoft.cn/chat/single/${state.userinfo.id}`);
            // 初始化ws
            ws.onmessage = message => {
                // message 处理方法
                let data = JSON.parse(message.data)?.chat;
                api.User.GetUserInfoById(data.send_id).then(res=>{
                    data.user = res.data
                    commit("MergeChatList", data)
                })
            }
            ws.onopen = () => {
                commit("setWSS",ws);
                Toast.success("用户当前登陆成功")
            }
            ws.onclose = () => {
                commit("setWSS",null);
            }
            ws.onerror = () => {
                Toast.success("用户当前登陆失败")
                if (state.reconnectCount<=3 && state.userinfo.id)
                // 如果发生错误，则延迟3s后重新注册
                    setTimeout(() => {
                        dispatch("registerWSS")
                    }, 3000);
            }

        },
    },
    modules: {

    }
})
