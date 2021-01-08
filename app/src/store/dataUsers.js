import firebase from "firebase/app";

export default {
    actions: {
        async dataUsers({commit}, cats) {
            try {
                for (const item of cats) {
                    await firebase.database().ref('/users').push(cats[item]);
                    console.log('Success')
                }
                // await firebase.database().ref('/users').set(cats);
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
        async selectedProcessAndDepartment({commit, dispatch}, payload) {
            try{
                const data = (await firebase.database().ref('/users').once('value')).val();
                let selectDepartment = await Object.keys(data).map(key => ({...data[key]})).reduce((acc, n) => ((acc[n.department] = acc[n.department] || []).push(n), acc), {})[payload.departmentName]
                return Object.values(selectDepartment).filter(key => key.process === payload.selectProcessName )
            }catch (e) {
                commit('setError', true);
                throw e
            }
        }
    }
}
