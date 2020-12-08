export default {
    install(Vue) {
        Vue.prototype.$titleApp = function(titleKey) {
            const appName = process.env.VUE_APP_TITLE
            return `${appName} | ${titleKey}`
        }
    }
}