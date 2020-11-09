import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Calendar, SwipeCell, NavBar, Search, Button, Col, Row, Tabbar, TabbarItem, 
Cell, Image, DropdownMenu, DropdownItem, Icon, GoodsAction, GoodsActionIcon, GoodsActionButton,
Loading, Collapse, CollapseItem, Tab, Tabs, Toast, ShareSheet, CellGroup, Field, Checkbox} from 'vant';
Vue.use(NavBar);
Vue.use(Calendar);
Vue.use(Search);
Vue.use(Button);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Cell);
Vue.use(Image);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Icon);
Vue.use(SwipeCell);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Loading);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Toast);
Vue.use(ShareSheet);
Vue.use(CellGroup);
Vue.use(Field);
Vue.use(Checkbox);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
