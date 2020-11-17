import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant';
import 'vant/lib/index.css';

import Step from 'ant-design-vue/lib/steps';
import 'ant-design-vue/dist/antd.css';

Vue.use(Step);

Vue.use(Vant);
Vue.config.productionTip = false

import VEmojiPicker from 'v-emoji-picker';

Vue.use(VEmojiPicker);

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);

import './assets/icon/iconfont.css';
import './registerServiceWorker'


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
