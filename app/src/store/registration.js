import firebase from "firebase/app";

export default {
    actions: {
      async login({commit, dispatch}, {email, password}) {
            try{
                await firebase.auth().signInWithEmailAndPassword(email, password)
            }catch(e){
                commit('setError', e)
                throw e
            }
        }
    }
}