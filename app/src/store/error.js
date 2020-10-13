export default {
    state:{
        error: null
    },
    getters: {
        error(state){
            return state.error
        }
    },
    mutations: {
        setError(state, error) {
            state.error = error
        },
        clearError(state) {
            state.error = null
        },
    }
}