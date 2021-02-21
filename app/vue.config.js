module.exports = {
    devServer: {
        port: 8081
    },
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "~@/styles/styles.scss";`
            },
        }
    },
    pwa: {
        manifestOptions: {
            name: "Terma departments",
            short_name: "Terma",
            start_url: "./",
            display: "standalone",
            theme_color: "#000000",
            icons: [
                {
                    'src': 'img/icons/chrome-72x72.png',
                    'sizes': '72x72',
                    'type': 'image/png',
                },
                {
                    src: "img/icons/chrome192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                },
                {
                    'src': 'img/icons/chrome-48x48.png',
                    'sizes': '48x48',
                    'type': 'image/png',
                },
            ],
        },

        themeColor: "rgba(242, 241, 239, 1)",
        msTileColor: "#000000",
        appleMobileWebAppCapable: "yes",
        appleMobileWebAppStatusBarStyle: "black",
        iconPaths: {
            favicon32: "img/icons/chrome-32x32.png",
            favicon16: "img/icons/chrome-16x16.png",
            maskIcon: "img/icons/svg.svg",
            appleTouchIcon: "img/icons/chrome192x192.png",
            msTileImage: "img/icons/mstile-144x144.png",
        },
        // configure the workbox plugin
        workboxPluginMode: "GenerateSW",
    },
}
