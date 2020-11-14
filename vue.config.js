module.exports = {
    css: {
        requireModuleExtension: true,// 去掉文件名中的 .module
        
    },
    devServer: {
        host: '192.168.0.109', // ip  192.168.0.109
        port: 8080, // 设置端口号
        https: false, // https:{type:Boolean}
        open: false, //配置自动启动浏览器
        proxy:null  //设置代理
    }
}
