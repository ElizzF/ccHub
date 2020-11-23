importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js')

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
        new workbox.strategies.StaleWhileRevalidate({})
    );

    // 缓存web的js资源
    workbox.routing.registerRoute(
        // 缓存JS文件
        /.*\.js/,
        // 使用缓存，但尽快在后台更新
        new workbox.strategies.StaleWhileRevalidate({
        })
    );

    // 缓存web的图片资源
    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg)$/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: `${CACHE_NAME}-images`,
            plugins: [
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60 // 设置缓存有效期为30天
                })
            ]
        })
    );

    workbox.routing.registerRoute(
        ({ request }) => request.destination === 'image',
        new workbox.strategies.CacheFirst({
            cacheName: `${CACHE_NAME}-avatar`,
            plugins: [
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [0],
                }),
                new workbox.expiration.ExpirationPlugin({
                    maxEntries: 60,
                    maxAgeSeconds: 24 * 60 * 60 // 设置缓存有效期为1天
                })
            ]
        })
    )

    self.addEventListener("install", () => {
        self.skipWaiting();
    })
}

