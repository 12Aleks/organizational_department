import M from 'materialize-css'

export default {
    install(Vue){
        Vue.prototype.$message = function (options) {
           M.toast({options})
        }
        Vue.prototype.$error = function (error) {
          M.toast({html: `Error: ${error}`})
        }
    }
}