const fs = require('fs')
module.exports = {
    css: {
        requireModuleExtension: true,// 去掉文件名中的 .module
        
    },
    devServer: {
<<<<<<< HEAD
        //host: '192.168.0.109',
=======
        //host: 'localhost', // ip  192.168.0.109
        // host: 'cc.leavessoft.cn',
>>>>>>> 62b1832d3da31a76f360916acf88d116d6aba4f2
        port: 8080, // 设置端口号
        open: true, //配置自动启动浏览器
        proxy:null,  //设置代理,
        https: false
    }
}
