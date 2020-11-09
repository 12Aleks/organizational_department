import firebase from "firebase/app";

export default {
    actions: {
        async dataUsers({commit}, cats) {
            try {
                await firebase.database().ref('/users').set(cats);
            } catch (e) {
                this.commit('setError', true);
                throw e
            }
        },
        async receiveData({commit}) {
            try {
                const data = (await firebase.database().ref('/users').once('value')).val();
                const workersData = await Object.keys(data).map(key => ({...data[key]}))
                commit('receiveData', workersData);
                return workersData
            } catch (e) {
                this.commit('setError', true);
                throw e
            }
        },
        async departmentName({commit, dispatch}, departmentName) {
            try{
                const data = (await firebase.database().ref('/users').once('value')).val();
                const workersData = await Object.keys(data).map(key => ({...data[key]})).reduce((acc, n) => ((acc[n.department] = acc[n.department] || []).push(n), acc), {})[departmentName]
                commit('receiveData', workersData)
                return workersData
            }catch (e) {
                this.commit('setError', true);
                throw e
            }
        }
    }
}
