import firebase from "firebase/app";

export default {
    actions:{
      async dataUsers({commit}, cats){
          try{
              // for (const item of cats) {
              // const status =
              //     console.log(status)
              // }
              await firebase.database().ref('/users/data').push(cats);
              console.log(cats)
          }catch (e) {
              // this.commit('setError', true);
              console.log(e);
              throw e
          }
        }
    }
}
