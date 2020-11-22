import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    comtestData: null,
    userinfo:JSON.parse(localStorage.getItem("userData")?localStorage.getItem("userData"):"{}")
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
