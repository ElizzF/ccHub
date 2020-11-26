
module.exports = {
    css: {
        requireModuleExtension: true,// 去掉文件名中的 .module

    },
    devServer: {

        port: 8080, // 设置端口号
        open: true, //配置自动启动浏览器
        proxy: null,  //设置代理,
        https: false
    },
    chainWebpack: config => {
        config.output.filename('[name].[hash].js').end()
    },
    pwa: {
        name: "竞枢",
        themeColor: "#0079fe",
        msTileColor: "#0079fe",
        manifestOptions: {
            background_color: "#ffffff"
        },
        workboxPluginMode: 'InjectManifest',
        appleMobileWebAppCapable:"yes",
        appleMobileWebAppStatusBarStyle:"#0079fe",
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: './public/sw.js',
            // ...other Workbox options...
        }
    }
}
