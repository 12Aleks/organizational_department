import firebase from "firebase/app";

export default {
    state: {
        photo: {},
        info: {}
    },
    getters: {
        info(state){
          return state.info
        },
        updatePhoto(state){
            return state.photo
        }
    },
    mutations: {
        setInfo(state, payload) {
            state.info = payload
        },
        setPhoto(state, payload){
            state.photo = payload
        }
    },
    actions: {
        async fetchInfo({ dispatch, commit }) {
            try {
                const uid = await dispatch('getUid');
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                commit('setInfo', info)
                const storageData = await firebase.storage().ref(`/users/${uid}/photo`)
                const photo = await storageData.getDownloadURL()
                commit('setPhoto', photo)
            } catch (e) {
                commit('setError', e);
                throw e
            }
        }
    }
}
