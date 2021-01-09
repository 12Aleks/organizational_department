import firebase from "firebase/app";

export default {
    actions: {
        async workerPhoto({commit, dispatch}, { photo, abbreviatedData }){
            try{
                const storageData =  await firebase.storage().ref(`/workers/${abbreviatedData}`)
                storageData.put(photo)
                let newPhoto = await storageData.getDownloadURL();
                await firebase.database().ref(`/workers/${abbreviatedData}`).update({
                    photo: newPhoto
                });
                return newPhoto

            }catch(e){
                commit('setError', e)
                throw e
            }
        },
        async receiveWorkerData({commit}, {workerName, departmentName}){
            const worker = workerName.slice(0,4).toLowerCase() + '_' + departmentName.slice(0,3).toLowerCase();
            try{
                const worker_photo = (await firebase.database().ref(`/workers/${worker}`).once('value')).val();
                if(worker_photo !== null) return Object.values(worker_photo);
                else return null;
            }catch (e){
                commit('setError', e)
                throw e
            }

        }
    }

}
