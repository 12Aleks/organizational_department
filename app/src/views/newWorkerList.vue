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
                                    <th @click="sortParam='name'">Nawisko i Imię</th>
                                    <th @click="sortParam='department'">ZESPÓŁ</th>
                                    <th @click="sortParam='sections'">KOMÓRKA</th>
                                    <th @click="sortParam='salary'">Aktualne wynagrodzenie [CKP]/ wynagrodzenie za godzinę</th>
                                    <th @click="sortParam='final_salary'">Propozycja Zespołu Personalnego w uzgodnieniu z Pracownikiem [CKP]/
                                        wynagrodzenie za godzinę
                                    </th>
                                </tr>
                                </thead>
                                <tbody id="table" v-for="(value, name, index) in sortedList" :key="index">
                                <tr>
                                    <td>{{value.name }}</td>
                                    <td>{{value.sections==='(puste)' && value.department ==='(puste)'? value.process
                                        : value.department }}
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
                        <canvas ref="canvas" style="height:100% !important;"></canvas>
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
            sortParam: '',
            instance: null,
            newWorkers: this.newWorkers
        }),
        async mounted() {
            await this.$store.dispatch('receiveData');
            this.instance = M.Tabs.init(this.$refs.tabs);
            this.setup(this.newWorkers)
        },
        computed: {
            workersInfo() {
                return this.$store.getters.receiveData
            },
            newWorkers() {
                const arrg = this.workersInfo.filter((item, i, arr) => arr[i].final_salary !== 0 && arr[i].final_per_hour !== 0);
                console.log(arrg)
                return arrg
            },
            sortedList() {
                switch (this.sortParam) {
                    case 'name':
                        return this.newWorkers.sort((d1, d2) => d1.name.toLowerCase() > d2.name.toLowerCase() ? 1 : -1);
                    case 'department':
                        return this.newWorkers.sort((d1, d2) => d1.department.toLowerCase() > d2.department.toLowerCase() ? 1 : -1);
                    case 'sections':
                        return this.newWorkers.sort((d1, d2) => d1.sections.toLowerCase() > d2.sections.toLowerCase() ? 1 : -1);
                    case 'salary':
                        return this.newWorkers.sort((d1, d2) => d1.salary > d2.salary ? 1 : -1);
                    case 'final_salary':
                        return this.newWorkers.sort((d1, d2) => d1.final_salary > d2.final_salary ? 1 : -1);
                    default:
                        return this.newWorkers;
                }
            }
        },
        methods: {
            setup(newWorkers) {
                this.renderChart({
                    labels: newWorkers.map((c) => c.name),
                    datasets: [{
                        data: newWorkers.map((item, i, arr) => {
                            return arr[i].final_salary
                        }),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgb(255,70,86, 0.2)',
                            'rgb(73,117,235, 0.2)',
                            'rgb(169,255,72, 0.2)',
                            'rgb(65,192,159, 0.2)',
                            'rgb(111,73,255, 0.2)',
                            'rgb(255,134,25,0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgb(255,70,86, 1)',
                            'rgb(73,117,235, 1)',
                            'rgb(169,255,72, 1)',
                            'rgb(65,192,159, 1)',
                            'rgb(111,73,255, 1)',
                            'rgb(255,134,25, 1)'
                        ],
                        borderWidth: 1
                    }]
                })
            }
        },
        beforeDestroy() {
            if (this.instance && this.instance.distroy) {
                this.instance.distroy
            }
        }
    }
</script>

<style scoped lang="scss">
    .img_attachment {
        height: -webkit-calc(100vh - 253px);
        height: calc(100vh - 253px);

        .tabs {
            margin-bottom: 10px;
            border-bottom: 1px solid #bbbbbb;

            .tab a, .tab a:hover, .tab a.active {
                color: #bbbbbb;
            }

            .tab a.active {
                color: #9b9b9b;
            }
        }

        .table-wrapper {
            overflow: auto;
            height: -webkit-calc(100vh - 365px);
            height: calc(100vh - 365px);

            table {
                table-layout: fixed;
                th{
                    background-color: #bbbbbb33;
                }
            }
        }
    }

</style>
