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
              <li class="tab col s3"><a class="active" href="#test1">Lista nowzch pracownikow</a></li>
              <li class="tab col s3"><a href="#test2">Diagramy</a></li>
            </ul>
          </div>
          <Loader v-if="loader" />
          <div v-show="!loader" id="test1" class="col s12">
            <div class="table-wrapper">
              <table class="highlight">
                <thead>
                <tr>
                  <th :class="{active: sortParam === 'name'}" @click="sortParam='name'">Nawisko i Imię</th>
                  <th :class="{active: sortParam==='department'}" @click="sortParam='department'">ZESPÓŁ</th>
                  <th :class="{active: sortParam==='sections'}" @click="sortParam='sections'">KOMÓRKA</th>
                  <th :class="{active: sortParam==='salary'}" @click="sortParam='salary'">Aktualne wynagrodzenie [CKP]/ wynagrodzenie za godzinę</th>
                  <th :class="{active: sortParam==='final_salary'}" @click="sortParam='final_salary'">Propozycja Zespołu Personalnego w uzgodnieniu z Pracownikiem [CKP]/
                    wynagrodzenie za godzinę
                  </th>
                </tr>
                </thead>
                <tbody id="table" v-for="(value, name, index) in sortedList" :key="index">
                <tr>
                  <td class="{active}">{{value.name }}</td>
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
            <div class="wrapper">
              <canvas ref="canvas" style="height:100% !important;"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Bar } from 'vue-chartjs'
import M from 'materialize-css'

export default {
  name: "newWorkerList",
  extends: Bar,
  data: () => ({
    sortParam: '',
    instance: null,
    loader: true
  }),
  async mounted() {
    this.instance = M.Tabs.init(this.$refs.tabs);
    if (!Object.keys(this.$store.getters.receiveData).length) {
      await this.$store.dispatch('receiveData');
    }
    this.loader = false;
    this.setup(this.newWorkers)

  },
  computed: {
    workersInfo() {
      return this.$store.getters.receiveData;
    },
    newWorkers() {
      const result = this.workersInfo.filter((item, i, arr) => arr[i].final_salary !== 0 && arr[i].final_per_hour !== 0);
      return result;
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
      function dynamicColors() {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return "rgba(" + r + "," + g + "," + b + ", 0.6)";
      }
      function poolColors(a) {
        let pool = [];
        for( let i = 0; i < a; i++) {
          pool.push(dynamicColors());
        }
        return pool;
      }
      this.renderChart({
        labels: newWorkers.map((c) => c.name),
        datasets: [{
          data: newWorkers.map((item, i, arr) => {
            return arr[i].final_salary
          }),
          label: 'Wynagrodzenie',
          backgroundColor: poolColors(newWorkers.length),
          // pointBackgroundColor: '#e54d63',
        }]
      }, {responsive: true, maintainAspectRatio: false})
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
$turquoise:  #26a69a;
$black: rgba(48, 69, 92, 1);
$white: rgba(254, 255, 250, 1);
$blue: #57758c94;
$red: rgba(255, 104, 115, 1);
.img_attachment {
  height: -webkit-calc(100vh - 205px);
  height: calc(100vh - 205px);
  .wrapper{
    padding-bottom: 30px;
    height: -webkit-calc(100vh - 320px);
    height: calc(100vh - 320px);
  }
  .tabs {
    margin-bottom: 10px;
    border-bottom: 1px solid $red;

    .tab a, .tab a:hover, .tab a.active {
      color: #bbbbbb;
    }

    .tab a.active {
      color: #9b9b9b;
    }
  }

  .table-wrapper {
    overflow: auto;
    height: -webkit-calc(100vh - 315px);
    height: calc(100vh - 315px);

    table {
      table-layout: fixed;
      th{
        background-color: $blue;
        color: $white;
        text-align: center;
      }
      .highlight>tbody>tr:hover {
        background-color: $blue;
      }
    }
  }
}

</style>

