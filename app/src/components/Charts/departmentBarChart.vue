<template>
  <div class="row">
    <div class="col s12 m12 l12">
      <div class="button_wrapper">
        <select class="browser-default z-depth-1" ref="select" v-model="current" v-if="sections.length > 1">
          <option value="all">Wszystkie komórki</option>
          <option v-for="(c, index) of sections"
                  :key="index"
                  :value="c"
          >{{ c }}
          </option>
        </select>

        <a class="waves-effect waves-light btn-small orange lighten-2"
           @click="departmentData('surname')"><i
            class="material-icons left ">person</i>Filtrować po nazwisku</a>
        <a class="waves-effect waves-light btn-small orange lighten-2"
           @click="departmentData('salary')"><i
            class="material-icons left">monetization_on</i>Filtrować po sumie</a>
      </div>
    </div>
    <div class="col s12 m12 l12">
      <div class="wrapper">
        <canvas ref="canvas" style="height:100% !important;"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import {Bar} from 'vue-chartjs'

export default {
  name: "departmentBarChart",
  extends: Bar,
  data: () => ({
    departmentWorkers: [],
    select: null,
    current: 'all'
  }),
  async mounted() {
    this.departmentWorkers = await this.$store.dispatch('departmentName', this.$route.params.id.toUpperCase())
    this.chartDepartment(this.departmentWorkers)
  },
  computed: {
    sections() {
      return Object.keys(Object.values(this.departmentWorkers).reduce((acc, n) => ((acc[n.process] = acc[n.process] || []).push(n), acc), {}))
    },
    selected(){

    }
  },
  methods: {
    departmentData(data) {
      if (data === 'surname') {
        const newSurname = this.departmentWorkers.sort((d1, d2) => d1.name.toLowerCase() > d2.name.toLowerCase() ? 1 : -1);
        this.chartDepartment(newSurname);
      } else if (data === 'salary') {
        const newSalary = this.departmentWorkers.sort((d1, d2) => {
          return (d1.salary - d2.salary)
        });
        this.chartDepartment(newSalary);
      } else {
        this.chartDepartment(this.departmentWorkers)
      }
    },
    chartDepartment(departmentWorkers) {
      let data;
      let newWorkerInDepartment = departmentWorkers.filter((item, i, arr) => (arr[i].final_salary !== 0))
      if (newWorkerInDepartment.length) {
        data = {
          labels: departmentWorkers.map((c) => c.name),
          datasets: [
            {
              data: departmentWorkers.map((item, i, arr) => {
                return arr[i].salary
              }),
              label: 'Aktualne wynagrodzenie',
              backgroundColor: 'rgba(255, 104, 115, 0.8)',
              order: 1
            },
            {
              data: departmentWorkers.map((item, i, arr) => {
                return arr[i].salary_worker
              }),
              label: 'Propozycja pracownika',
              backgroundColor: 'rgba(255, 183, 77, 0.8)',
              hidden: true,
              fill: false,
              order: 2
            },
            {
              data: departmentWorkers.map((item, i, arr) => {
                return arr[i].final_salary
              }),
              label: 'Uzgodnione z pracownikiem',
              backgroundColor: 'rgba(38, 166, 154, 0.8)',
              hidden: true,
              fill: false,
              order: 3
            }
          ]
        };
      } else {
        data = {
          labels: departmentWorkers.map((c) => c.name),
          datasets: [
            {
              data: departmentWorkers.map((item, i, arr) => {
                return arr[i].salary
              }),
              label: 'Aktualne wynagrodzenie',
              backgroundColor: 'rgba(255, 104, 115, 0.8)',
              order: 1
            }]
        }
      }

      const options = {responsive: true, maintainAspectRatio: false, legend: {display: true}};
      this.renderChart(data, options)
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  padding-bottom: 30px;
  height: -webkit-calc(100vh - 265px);
  height: calc(100vh - 265px);
  position: relative;
}

.button_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    width: 280px;
    max-width: 280px;
    margin: 15px;
    text-align: left;
    font-size: 14px;
  }
  select{
    height: 30px;
    max-width: 350px;
    text-transform: uppercase;
    color: grey;
    font-size: 14px;
    padding: 4px;
    margin: 15px;
  }
}
</style>