<template>
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3 class="flow-text">Nowi pracownicy</h3>
        </div>
        <div class="row img_attachment">
          <div class="col s12 m12">
            <ul class="tabs" ref="tabs">
              <li class="tab col s6"><a class="active" href="#tabFirst">Lista nowzch pracownikow</a></li>
              <li class="tab col s6"><a href="#tabSecond">Wykres słupkowy</a></li>
            </ul>
          </div>
          <Loader v-if="loader"/>
          <div v-show="!loader" id="tabFirst" class="col s12">
            <div class="table-wrapper z-depth-1">
              <table class="highlight">
                <thead>
                <tr>
                  <th style="width: 50px; background-color: #26a69a; color: #fff">&#8470</th>
                  <th :class="{active: sortParam === 'name', toggle: toggle}" @click="sort('name')">Nawisko i
                    Imię
                  </th>
                  <th :class="{active: sortParam==='process', toggle: toggle}" @click="sort('process')">Process
                  </th>
                  <th :class="{active: sortParam==='department', toggle: toggle}" @click="sort('department')">
                    Zespół
                  </th>
                  <th :class="{active: sortParam==='sections', toggle: toggle}" @click="sort('sections')">
                    Komórka
                  </th>
                  <th :class="{active: sortParam==='salary', toggle: toggle}" @click="sort('salary')">Aktualne
                    wynagrodzenie <br><span>CKP / za godzinę</span>
                  </th>
                  <th :class="{active: sortParam==='final_salary', toggle: toggle}" @click="sort('final_salary')">
                    Uzgodnione z Pracownikiem <br><span>CKP / za godzinę</span>
                  </th>
                </tr>
                </thead>
                <tbody id="table" v-for="(value, index) in sortedList" :key="index">
                <tr>
                  <td style="width: 50px">{{ index + 1 }}</td>
                  <td>{{ value.name }}</td>
                  <td>{{ value.process }}</td>
                  <td>
                    <router-link :to="`/${value.process.toLowerCase()}/${value.sections === '(puste)' && value.department === '(puste)' ? value.process.toLowerCase() :
                          value.department.toLowerCase()}`">{{
                        value.sections === '(puste)' && value.department === '(puste)' ? value.process
                            : value.department
                      }}
                    </router-link>
                  </td>
                  <td>{{ value.sections !== '(puste)' ? value.sections : '(puste)' }}</td>
                  <td>{{ value.salary }}zł / {{ value.per_hour }}zł/god.</td>
                  <td>{{ value.final_salary }}zł / {{ value.final_per_hour }}zł/god.</td>
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
      return this.workersInfo.filter((item, i, arr) => arr[i].final_salary !== 0 && arr[i].final_per_hour !== 0);
    },
    sortedList() {
      switch (this.sortParam) {
        case 'name':
          let name = this.newWorkers.sort((d1, d2) => d1.name.toLowerCase() > d2.name.toLowerCase() ? 1 : -1);
          return this.toggle ? name : name.reverse()
        case 'process':
          let process = this.newWorkers.sort((d1, d2) => d1.process.toLowerCase() > d2.process.toLowerCase() ? 1 : -1);
          return this.toggle ? process : process.reverse()
        case 'department':
          let department = this.newWorkers.sort((d1, d2) => d1.department.toLowerCase() > d2.department.toLowerCase() ? 1 : -1);
          return this.toggle ? department : department.reverse()
        case 'sections':
          let sections = this.newWorkers.sort((d1, d2) => d1.sections.toLowerCase() > d2.sections.toLowerCase() ? 1 : -1);
          return this.toggle ? sections : sections.reverse()
        case 'salary':
          let salary = this.newWorkers.sort((d1, d2) => d1.salary > d2.salary ? 1 : -1);
          return this.toggle ? salary : salary.reverse()
        case 'final_salary':
          let final_salary = this.newWorkers.sort((d1, d2) => d1.final_salary > d2.final_salary ? 1 : -1);
          return this.toggle ? final_salary : final_salary.reverse()
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
$turquoise: #26a69a;
$black: rgba(48, 69, 92, 1);
$white: rgba(254, 255, 250, 1);
$blue: #57758c94;
.img_attachment {

}

h6 {
  text-transform: uppercase;
  font-weight: 400;
  font-size: 14px;
  margin-top: 10px;
  color: #9b9b9b;
}

</style>

