const fs = require('fs')
module.exports = {
    css: {
        requireModuleExtension: true,// 去掉文件名中的 .module
        
    },
    devServer: {
        //host: 'localhost', // ip  192.168.0.109
        // host: 'cc.leavessoft.cn',
        port: 8080, // 设置端口号
        open: true, //配置自动启动浏览器
        proxy:null,  //设置代理,
        https: false
    }
}
