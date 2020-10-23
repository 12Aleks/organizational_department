import firebase from "firebase/app";

export default {
    actions:{
      async dataUsers({commit}, cats){
          try{
              for (const item of cats) {
                  await firebase.database().ref('/users').push(cats[item]);
                  console.log('Success')
              }
          }catch (e) {
              this.commit('setError', true);
              throw e
          }
        }
    }
}
