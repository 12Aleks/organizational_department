import firebase from "firebase/app";

export default {
    state:{
        workersInfo: []
    },
    getters:{
        receiveData(state){
            return state.workersInfo
        }
    },
    mutations:{
        receiveData(state, data){
            state.workersInfo = data
        }
    },
    actions:{
      async dataUsers({commit}, cats){
          try{
              await firebase.database().ref('/users').set(cats);
              console.log(cats)
          }catch (e) {
              this.commit('setError', true);
              console.log(e);
              throw e
          }
        },
      async receiveData({commit}){
          try{
             const data =  (await firebase.database().ref('/users').once('value')).val();
             const workersData =  Object.keys(data).map(key => ({...data[key]}))
             commit('receiveData', workersData)
          }catch(e){
              this.commit('setError', true);
              throw e
          }
        }
    }
}
