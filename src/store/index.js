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
        chatList: {},
        previewChatList: [],
        reconnectCount: 0,
        chatHistory: {}
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
        setUser(state, user) {
            state.user = user;
        },
        Logout(state) {
            localStorage.removeItem("userData");
            state.userinfo = {}
            state.messageList = []
        },
        setWSS(state, wss) {
            state.wss = wss;
        },
        /**
         * 更新聊天预览
         * @param {*} state 
         * @param {*} payload 
         */
        updatePreviewChatList(state, payload) {
            if (Array.isArray(payload)) {
                state.previewChatList = payload;
            } else {
                let index = state.previewChatList.findIndex(e => e.uid == payload.uid);
                if (index != -1) {
                    let obj = state.previewChatList[index];
                    obj.content = payload.content;
                    obj.last_time = payload.last_time;
                    state.previewChatList.splice(index, 1, obj)
                } else {
                    state.previewChatList.push(payload);
                }
            }
            Vue.set(state,"previewChatList",state.previewChatList.sort((a, b) => new Date(b.last_time) - new Date(a.last_time)))
        },
        /**
         * 合并聊天记录
         * @param {*} state 
         * @param {*} chatMessage 
         */
        MergeChatList(state, payload) {
            // payload的数据机构
            /**
                {
                    "id": 8,
                    "content": "cao",
                    "send_id": 4,
                    "receive_id": 3,
                    "time": "2020-11-19 20:55:12"
                },
            */
            // 获取聊天的键值
            let chat = payload;
            let key = chat.send_id;
            if (chat.send_id == state.userinfo.id) { // 如果是本人
                key = chat.receive_id
            }
            if (!state.chatList[key]) {
                Vue.set(state.chatList, key, [chat])
            } else {
                let chatBox = state.chatList[key];
                let first = chatBox[0]
                if (new Date(first.time) < new Date(chat.time)) {
                    chatBox.push(chat)
                } else {
                    chatBox.unshift(chat)
                }
            }
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
            if (state.userinfo.id)
                api.User.GetUserInfoById(state.userinfo.id).then(data => {
                    state.user = data.data;
                })
        },
        getHistoryDetail({ commit, state }, uid) {
            if (uid) {
                if (state.chatHistory[uid]) {
                    return;
                }
                state.chatHistory[uid] = true;
                api.Chat.GetChatHistory(uid).then(async data => {
                    data.data.forEach(element => {
                        commit("MergeChatList", element);
                    });
                })
            }
        },
        /**
         * 初始化历史消息
         * @param {*} 
         */
        getChatHistory({ commit }) {
            api.Chat.GetChatList().then(data => {
                commit("updatePreviewChatList", data.data);
            })
        },
        /**
         * 初始化WebSocket
         * @param {*} 
         */
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
                data.content = data.message;
                data.time = new Date()
                commit("MergeChatList", data);
                // 更新预览
                let index = state.previewChatList.findIndex(e=>e.uid==data.send_uid);
                if (index!=-1){
                    commit("updatePreviewChatList",
                        {
                            uid:data.send_uid,
                            content: data.content,
                            last_time: new Date()
                        },
                    )
                }

            }
            ws.onopen = () => {
                commit("setWSS", ws);
                Toast.success("用户当前登陆成功")
            }
            ws.onclose = () => {
                commit("setWSS", null);
            }
            ws.onerror = () => {
                Toast.success("用户当前登陆失败")
                if (state.reconnectCount <= 3 && state.userinfo.id)
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
