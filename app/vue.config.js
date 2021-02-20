module.exports = {
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "~@/styles/styles.scss";`
            },
        }
    },
    pwa: {
        name: 'Terma departments',
        themeColor: 'rgba(255, 104, 115, 1)',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        iconPaths: {
            favicon32: './img/icons/android-chrome-36x36.png',
            favicon16: './img/icons/favicon16x16.png',
            appleTouchIcon: './img/icons/apple-icon-57x57.png',
            msTileImage: 'img/icons/ms-icon-144x144.png'
        },
    }
}
