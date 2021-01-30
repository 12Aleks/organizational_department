export default {
    actions: {
        async fetchCurrency({commit}) {
            try{
                const res = await fetch(`http://api.nbp.pl/api/exchangerates/tables/c/`);
                return await res.json();
            }catch (e) {
                commit('setError', e);
                throw e
            }
        }
    }
}