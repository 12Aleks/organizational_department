import firebase from "firebase/app";

export default {
    state: {
        info: {}
    },
    getters: {
        info(state) {
            return state.info
        }
    },
    mutations: {
        setInfo(state, payload) {
            state.info = payload
        },
        clearInfo(state) {
            state.info = {}
        }
    },
    actions: {
        async fetchInfo({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid');
                const info = (await firebase.database().ref(`/profiles/${uid}/info`).once('value')).val()
                commit('setInfo', info);
            } catch (e) {
                commit('setError', e);
                throw e
            }
        }
    }
}
