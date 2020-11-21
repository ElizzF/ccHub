import axios from "axios";

let ax = axios.create();


// // Azure secure server
ax.defaults.baseURL = "https://soft.leavessoft.cn";

ax.interceptors.request.use(config => {
    let userKey = JSON.parse(localStorage.getItem('userData'));
    if (userKey) {
        let token = userKey.accesstoken
        config.headers["Authorization"] = token;
    }
    return config;
});

export default ax;