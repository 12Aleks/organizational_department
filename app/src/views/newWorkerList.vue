<template>
        <div>
            <div class="page-title">
                <h3 class="flow-text">Nowi pracownicy</h3>
            </div>
            <div class="row img_attachment">
                <div class="col s12 m12">
                    <ul class="tabs" ref="tabs">
                        <li class="tab col s6"><a class="active" href="#tabFirst">Lista nowych pracowników</a></li>
                        <li class="tab col s6"><a href="#tabSecond">Wykres słupkowy</a></li>
                    </ul>
                </div>
                <Loader v-if="loader"/>
                <div v-show="!loader" id="tabFirst" class="col s12">
                    <div class="table-wrapper">
                        <table class="highlight">
                            <thead>
                            <tr>
                                <th style="width: 50px;">&#8470</th>
                                <th :class="{active: sortParam === 'name', toggle: toggle}" @click="sort('name')">
                                    <i class="material-icons tiny right">search</i> Nazwisko i
                                    Imię
                                </th>
                                <th :class="{active: sortParam==='process', toggle: toggle}" @click="sort('process')">
                                    <i class="material-icons tiny right" >search</i> Proces
                                </th>
                                <th :class="{active: sortParam==='department', toggle: toggle}"
                                    @click="sort('department')"><i class="material-icons tiny right">search</i>
                                    Zespół
                                </th>
                                <th :class="{active: sortParam==='sections', toggle: toggle}" @click="sort('sections')">
                                    Komórka
                                </th>
                                <th :class="{active: sortParam==='salary', toggle: toggle}" @click="sort('salary')">
                                    Aktualne
                                    wynagrodzenie <br><span>CKP / za godzinę</span>
                                </th>
                                <th :class="{active: sortParam==='salary_worker', toggle: toggle}"
                                    @click="sort('salary_worker')">Propozycja
                                    pracownika<br/><span>CKP / za godzinę</span></th>
                                <th :class="{active: sortParam==='salary_department', toggle: toggle}"
                                    @click="sort('salary_department')">Propozycja zespołu
                                    pracownika<br/><span>CKP / za godzinę</span>
                                </th>
                                <th :class="{active: sortParam==='salary_HR', toggle: toggle}"
                                    @click="sort('salary_HR')">Propozycja zespołu personalnego<br/><span>CKP / za godzinę</span>
                                </th>
                                <th :class="{active: sortParam==='final_salary', toggle: toggle}"
                                    @click="sort('final_salary')">
                                    Uzgodnione z pracownikiem <br><span>CKP / za godzinę</span>
                                </th>
                                <th :class="{active: sortParam==='decision', toggle: toggle}" @click="sort('decision')">
                                    Kontynuacja zatrudnienia TAK/NIE
                                </th>
                            </tr>
                            </thead>
                            <tbody id="table">
                            <tr v-for="(value, index) in sortedList" :key="index"
                                :class="{decision: value.decision.toUpperCase() !== 'TAK', doubt: (value.decision.toUpperCase() === 'TAK' && !value.final_salary)}">
                                <td style="width: 50px">{{ index + 1 }}</td>
                                <td>
                                    <router-link :to="`/${value.process.toLowerCase()}/${value.sections === '(puste)' && value.department === '(puste)' ? value.process.toLowerCase() :
          value.department.toLowerCase()}/${value.name.toLowerCase()}`">{{ value.name }}
                                    </router-link>
                                </td>
                                <td><router-link :to="`/departments`">{{ value.process }}</router-link></td>
                                <td>
                                    <router-link :to="`/${value.process.toLowerCase()}/${value.sections === '(puste)' && value.department === '(puste)' ? value.process.toLowerCase() :
                          value.department.toLowerCase()}`">{{
                                        value.sections === '(puste)' && value.department === '(puste)' ? value.process
                                        : value.department
                                        }}
                                    </router-link>
                                </td>
                                <td>{{ value.sections !== '(puste)' ? value.sections : '(puste)' }}</td>
                                <td>{{ value.salary }}zł / {{ value.per_hour }}zł/h</td>
                                <td>{{ value.salary_worker}}zł / {{ value.per_hour_worker }}zł/h</td>
                                <td>{{ value.salary_department }}zł / {{ value.per_hour_department }}zł/h</td>
                                <td>{{ value.salary_HR }}zł / {{ value.per_hour_HR }}zł/h</td>
                                <td>{{ value.final_salary }}zł / {{ value.final_per_hour }}zł/h</td>
                                <td>{{ value.decision.toUpperCase() }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="tabSecond" class="col s12">
                    <worker-chart/>
                </div>
            </div>
        </div>
</template>

<script>

    import M from 'materialize-css'
    import workerChart from "@/components/Charts/workerChart";

    export default {
        name: "newWorkerList",
        metaInfo() {
            return {
                title: this.$titleApp('Nowi pracownicy')
            }
        },
        data: () => ({
            sortParam: '',
            toggle: false,
            instance: null,
            loader: true,
            surnames: true,
            workersInfo: []
        }),
        async mounted() {
            this.instance = M.Tabs.init(this.$refs.tabs);
            this.workersInfo = await this.$store.dispatch('receiveData');
            this.loader = false;
        },
        components: {
            workerChart
        },
        methods: {
            sort(value) {
                this.sortParam = value;
                this.toggle = !this.toggle
            }
        },
        computed: {
            newWorkers() {
                return this.workersInfo.filter((item, i, arr) => arr[i].final_salary !== 0 && arr[i].final_per_hour !== 0 || arr[i].decision !== 'data not found' || arr[i].salary_worker !== 0 && arr[i].per_hour_worker !== 0 );
            },
            sortedList() {
                switch (this.sortParam) {
                    case 'name':
                        let name = this.newWorkers.sort((d1, d2) => d1.name.toLowerCase().localeCompare(d2.name.toLowerCase()));
                        return this.toggle ? name : name.reverse()
                    case 'process':
                        let process = this.newWorkers.sort((d1, d2) => d1.process.toLowerCase().localeCompare(d2.process.toLowerCase()));
                        return this.toggle ? process : process.reverse()
                    case 'department':
                        let department = this.newWorkers.sort((d1, d2) => d1.department.toLowerCase().localeCompare(d2.department.toLowerCase()));
                        return this.toggle ? department : department.reverse()
                    case 'sections':
                        let sections = this.newWorkers.sort((d1, d2) => d1.sections.toLowerCase().localeCompare(d2.sections.toLowerCase()));
                        return this.toggle ? sections : sections.reverse()
                    case 'salary':
                        let salary = this.newWorkers.sort((d1, d2) => d1.salary > d2.salary ? 1 : -1);
                        return this.toggle ? salary : salary.reverse()
                    case 'salary_worker':
                        let salary_worker = this.newWorkers.sort((d1, d2) => d1.salary_worker > d2.salary_worker ? 1 : -1);
                        return this.toggle ? salary_worker : salary_worker.reverse()
                    case 'salary_department':
                        let salary_department = this.newWorkers.sort((d1, d2) => d1.salary_department > d2.salary_department ? 1 : -1);
                        return this.toggle ? salary_department : salary_department.reverse()
                    case 'salary_HR':
                        let salary_HR = this.newWorkers.sort((d1, d2) => d1.salary_HR > d2.salary_HR ? 1 : -1);
                        return this.toggle ? salary_HR : salary_HR.reverse()
                    case 'final_salary':
                        let final_salary = this.newWorkers.sort((d1, d2) => d1.final_salary > d2.final_salary ? 1 : -1);
                        return this.toggle ? final_salary : final_salary.reverse()
                    case 'decision':
                        let decision = this.newWorkers.sort((d1, d2) => d1.decision.toLowerCase().localeCompare(d2.decision.toLowerCase()));
                        return this.toggle ? decision : decision.reverse()
                    default:
                        return this.newWorkers;
                }
            }
        },
        destroyed() {
            if (this.instance && this.instance.destroy) {
                this.instance.destroy()
            }
        }
    }
</script>

<style lang="scss" scoped>

    h6 {
        text-transform: uppercase;
        font-weight: 400;
        font-size: 14px;
        margin-top: 10px;
        color: #9b9b9b;
    }

</style>

