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
        },
        async registrations({commit, dispatch}, {name, department, email, password}){
          try{
              await firebase.auth().createUserWithEmailAndPassword(email, password)
              const uid = await dispatch('getUid');
              await firebase.database().ref(`/users/${uid}/info`).set({
                  name, department
              });
          }catch(e){
              commit('setError', e)
              throw e
          }
        },
        async onFileChange({commit, dispatch}, {photo}){
          try{
              const uid = await dispatch('getUid');
              const storageData =  await firebase.storage().ref(`/users/${uid}/photo`)
                    storageData.put(photo)
                    return storageData.getDownloadURL()

          }catch(e){
             commit('setError', e)
             throw e
          }
        },
        getUid(){
          const user = firebase.auth().currentUser
          return user ? user.uid : null
        },
        async logout({commit}){
            await firebase.auth().signOut()
            commit('clearInfo')
        }
    }
}
