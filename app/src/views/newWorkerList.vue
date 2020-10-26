<template>
    <div>
        <div class="app-page">
            <div>
                <div class="page-title">
                    <h3>Nowi pracownicy</h3>
                </div>

                <div class="row img_attachment">
                    <div class="col s12 m12">

                        <ul class="tabs" ref="tabs">
                            <li class="tab col s3"><a href="#test1">Lista nowzch pracownikow</a></li>
                            <li class="tab col s3"><a class="active" href="#test2">Diagramy</a></li>
                        </ul>
                    </div>
                    <div id="test1" class="col s12">
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
                                <tbody id="table" v-for="(value, name, index) in newWorkers" :key="index">
                                <tr>
                                    <td>{{value.name }}</td>
                                    <td>{{value.sections==='(puste)' && value.department ==='(puste)'? value.process
                                        :
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

                    <div id="test2" class="col s12">

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Pie} from 'vue-chartjs'
    import M from 'materialize-css'

    export default {
        name: "newWorkerList",
        extends: Pie,
        data: () => ({
            instance: null,
            newWorkers: this.newWorkers
        }),
        async mounted() {
            await this.$store.dispatch('receiveData');
            this.instance = M.Tabs.init(this.$refs.tabs);
        },
        computed: {
            workersInfo() {
                return this.$store.getters.receiveData
            },
            newWorkers() {
                const arrg = this.workersInfo.filter((item, i, arr) => arr[i].final_salary !== 0 && arr[i].final_per_hour !== 0);
                console.log(arrg)
                return arrg
            }
        },
        methods:{
            // setup(categories){
            //     this.setupPagination(this.records.map(record => {
            //         return {
            //             ...record,
            //             categoryName: categories.find(c => c.id === record.categoryId).title,
            //             typeClass: record.type === 'income'? 'green' : 'red',
            //             typeText:
            //                 record.type === 'income'
            //                     ? localizeFilter('Income')
            //                     : localizeFilter('Outcome')
            //         }
            //     }));
            //
            //     this.renderChart({
            //     labels: categories.map((c) => c.title ),
            //     datasets: [{
            //         label: localizeFilter('CostsForCategories'),
            //         data: categories.map( (c) => {
            //             return this.records.reduce((total, r) => {
            //                 if(r.categoryId === c.id && r.type ==='outcome'){
            //                     total += +r.amount
            //                 }
            //                 return total
            //             }, 0)
            //         }),
            //         backgroundColor: [
            //             'rgba(255, 99, 132, 0.2)',
            //             'rgba(54, 162, 235, 0.2)',
            //             'rgba(255, 206, 86, 0.2)',
            //             'rgba(75, 192, 192, 0.2)',
            //             'rgba(153, 102, 255, 0.2)',
            //             'rgba(255, 159, 64, 0.2)'
            //         ],
            //         borderColor: [
            //             'rgba(255, 99, 132, 1)',
            //             'rgba(54, 162, 235, 1)',
            //             'rgba(255, 206, 86, 1)',
            //             'rgba(75, 192, 192, 1)',
            //             'rgba(153, 102, 255, 1)',
            //             'rgba(255, 159, 64, 1)'
            //         ],
            //         borderWidth: 1
            //     }]
            // })
        },
        beforeDestroy() {
            if (this.instance && this.instance.distroy) {
                this.instance.distroy
            }
        }
    }
</script>

<style scoped>
    .table-wrapper {
        overflow: auto;
        height: -webkit-calc(100vh - 293px);
        height: calc(100vh - 293px);
    }

    table {
        table-layout: fixed;
    }

</style>
