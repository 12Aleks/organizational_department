export default {
    actions: {
        async fetchCurrency({commit}) {
            try{
                const res = await fetch(`https://api.nbp.pl/api/exchangerates/tables/c/`);
                const data = await res.json();
                return data[0].rates
            }catch (e) {
                commit('setError', e);
                throw e
            }
        }
    }
}