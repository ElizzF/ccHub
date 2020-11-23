importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

if (workbox) {
    workbox.core.setCacheNameDetails({
        prefix: 'cc',
        suffix: 'v0.0.1',
        precache: 'precache',
        runtime: 'runtime'
    })

    let CACHE_NAME = workbox.core.cacheNames.runtime

    // 缓存web的css资源
    workbox.routing.registerRoute(
        // Cache CSS files
        /.*\.css/,
        // 使用缓存，但尽快在后台更新
        workbox.strategies.staleWhileRevalidate({})
    );

    // 缓存web的js资源
    workbox.routing.registerRoute(
        // 缓存JS文件
        /.*\.js/,
        // 使用缓存，但尽快在后台更新
        workbox.strategies.staleWhileRevalidate({
        })
    );

    // 缓存web的图片资源
    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: `${CACHE_NAME}-images`,
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60 // 设置缓存有效期为30天
                })
            ]
        })
    );

    self.addEventListener("install", () => {
        self.skipWaiting();
    })
}

