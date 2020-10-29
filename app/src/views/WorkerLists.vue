<template>
    <div>
                <div class="app-page">
                    <div>
                        <div class="page-title">
                            <h3>Lista osob</h3>
                        </div>

                        <div class="row img_attachment">
                            <div class="col s12 m12">
                                <div class="table-wrapper">
                                    <table class="highlight">
                                        <thead>
                                        <tr>
                                            <th>Nawisko i Imię</th>
                                            <th>ZESPÓŁ</th>
                                            <th>KOMÓRKA</th>
                                            <th>Aktualne wynagrodzenie [CKP]/ wynagrodzenie za godzinę</th>
                                            <th>Propozycja Zespołu Personalnego w uzgodnieniu z Pracownikiem [CKP]/
                                                wynagrodzenie za godzinę
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody id="table" v-for="(value, name, index) in workersInfo" :key="index">
                                        <tr>
                                            <td>{{value.name }}</td>
                                            <td>{{value.sections==='(puste)' && value.department ==='(puste)'? value.process :
                                                value.department }}
                                            </td>
                                            <td>{{value.sections !=='(puste)'? value.sections : '(puste)' }}</td>
                                            <td>{{value.salary}}zł / {{value.per_hour}}zł/h</td>
                                            <td>{{value.final_salary }}zł / {{value.final_per_hour }}zł/h</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
</template>

<script>

    export default {
        name: "WorkerLists",
        async mounted() {
           await this.$store.dispatch('receiveData')
        },
        computed: {
            workersInfo() {
                return this.$store.getters.receiveData
            },
        }
    }
</script>

<style scoped>
    .table-wrapper {
        overflow: auto;
        height: -webkit-calc(100vh - 245px);
        height: calc(100vh - 245px);
    }
    table{
        table-layout: fixed;
    }
</style>
