import M from 'materialize-css'

export default {
    install(Vue){
        Vue.prototype.$message = function (html) {
           M.toast({html})
        }
        Vue.prototype.$error = function (error) {
          M.toast({html: `Error: ${error}`})
        }
    }
}