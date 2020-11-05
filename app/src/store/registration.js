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
              await firebase.auth().createUserWithEmailAndPassword(email, password);
              const uid = await dispatch('getUid');
              const photo =  await firebase.storage().ref(`profile.jpg`).getDownloadURL();
              await firebase.database().ref(`/profiles/${uid}/info`).set({
                  name, department, email, photo
              });
          }catch(e){
              commit('setError', e);
              throw e
          }
          function signUpUser() {
                firebase.auth().createUserWithEmailAndPassword(email.value, pword.value).then(auth => {
                    firebase
                        .storage()
                        .ref("profiles")
                        .child(auth.user.uid + "/profile.jpg")
                        .put(file);

                }).catch(error => {
                    console.log(error.message)
                })
            }
        },
        async onFileChange({commit, dispatch}, {photo, name, department, email}){
          try{
              const uid = await dispatch('getUid');
              const storageData =  await firebase.storage().ref(`/profiles/${uid}/photo`)
                    storageData.put(photo)
              let newPhoto = await storageData.getDownloadURL();
              // let updates = {
              //     name: name,
              //     department: department,
              //     email: email,
              //     photo: newPhoto
              // };
              // updates[`/users/${uid}/info/photo`] = newPhoto;
              await firebase.database().ref(`/profiles/${uid}/info/`).update({
                  name: name,
                  department: department,
                  email: email,
                  photo: newPhoto
              });
              return newPhoto

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
