import firebase from "firebase/app";

export default {
    state: {
        workersInfo: [],
        departmentName: null,
    },
    getters: {
        receiveData(state) {
            return state.workersInfo.reduce((acc, n) => ((acc[n.process] = acc[n.process] || []).push(n), acc), {});
        },
        department(state) {
            return state.departmentName
        }
    },
    mutations: {
        receiveData(state, data) {
            state.workersInfo = data
        },
        departmentName(state, departmentName) {
            state.departmentName = state.workersInfo.reduce((acc, n) => ((acc[n.department] = acc[n.department] || []).push(n), acc), {})[departmentName]
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
        async receiveData({commit, dispatch}, departmentName ) {
            try {
                const data = (await firebase.database().ref('/users').once('value')).val();
                const workersData = await Object.keys(data).map(key => ({...data[key]}))
                commit('receiveData', workersData);
                dispatch('departmentName', departmentName )
            } catch (e) {
                this.commit('setError', true);
                throw e
            }
        },
        departmentName({commit}, departmentName) {
            commit('departmentName', departmentName)
        }
    }
}
