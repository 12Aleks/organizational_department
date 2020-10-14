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
              await firebase.auth().createUserWithEmailAndPassword(email, password).then(auth => {
                  firebase
                      .database()
                      .ref(`/users/${auth.user.uid}/info`).set({
                      name, department, email
                  });
                  firebase
                      .storage()
                      .ref("users")
                      .child(auth.user.uid + "/profile.jpg")
                      .put('gs://departments-1c007.appspot.com/profile.jpg');

              })

          }catch(e){
              commit('setError', e);
              throw e
          }





            function signUpUser() {
                firebase.auth().createUserWithEmailAndPassword(email.value, pword.value).then(auth => {
                    firebase
                        .storage()
                        .ref("users")
                        .child(auth.user.uid + "/profile.jpg")
                        .put(file);

                }).catch(error => {
                    console.log(error.message)
                })
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
