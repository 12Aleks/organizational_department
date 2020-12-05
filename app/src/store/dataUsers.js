import firebase from "firebase/app";

export default {
    actions: {
        async dataUsers({commit}, cats) {
            try {
                await firebase.database().ref('/users').set(cats);
            } catch (e) {
                commit('setError', true);
                throw e
            }
        },
        async receiveData({commit, dispatch}) {
            try {
                const data = (await firebase.database().ref('/users').once('value')).val();
                return await Object.keys(data).map(key => ({...data[key]}))
            } catch (e) {
                commit('setError', true);
                throw e
            }
        },
        async departmentName({commit, dispatch}, departmentName) {
            try{
                const data = (await firebase.database().ref('/users').once('value')).val();
                return await Object.keys(data).map(key => ({...data[key]})).reduce((acc, n) => ((acc[n.department] = acc[n.department] || []).push(n), acc), {})[departmentName]
            }catch (e) {
                commit('setError', true);
                throw e
            }
        },
        async selectedProcessAndDepartment({commit, dispatch}, payload) {
            try{
                const data = (await firebase.database().ref('/users').once('value')).val();
                let selectDepartment = await Object.keys(data).map(key => ({...data[key]})).reduce((acc, n) => ((acc[n.department] = acc[n.department] || []).push(n), acc), {})[payload.departmentName]
                return Object.values(selectDepartment).filter(key => key.process === payload.selectProcessName )
            }catch (e) {
                commit('setError', true);
                throw e
            }
        },
        async processName({commit}, processName){
            try{
                await firebase.database().ref('/process').set(processName);
            }catch (e) {
                commit('setError', true);
                throw e
            }
        }
    }
}
