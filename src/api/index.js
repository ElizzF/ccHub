import * as api from "./api";

export default {
    api,
    install: function(Vue) {
        Vue.prototype.$api = api;
    }
};

export {api}