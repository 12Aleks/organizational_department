import firebase from "firebase/app";

export default {
    state: {
        workersInfo: [],
        departmentSelect: null,
    },
    getters: {
        receiveData(state) {
            return state.workersInfo.reduce((acc, n) => ((acc[n.process] = acc[n.process] || []).push(n), acc), {});
        },
        department(state) {
            return state.departmentSelect
        }
    },
    mutations: {
        receiveData(state, data) {
            state.workersInfo = data
        },
        departmentName(state, payload) {
            state.departmentSelect = payload
        }
    },
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
            } catch (e) {
                this.commit('setError', true);
                throw e
            }
        },
        async departmentName({commit, dispatch}, departmentName) {
            const data = (await firebase.database().ref('/users').once('value')).val();
            const workersData = await Object.keys(data).map(key => ({...data[key]})).reduce((acc, n) => ((acc[n.department] = acc[n.department] || []).push(n), acc), {})[departmentName.toUpperCase()]
            commit('departmentName', workersData)
            return workersData
        }
    }
}
