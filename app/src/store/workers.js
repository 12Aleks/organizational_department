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
    }

}
