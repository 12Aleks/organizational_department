<template>
  <div class="row">
    <div class="col s12 m12 l12">
      <div class="button_wrapper">
        <a class="waves-effect waves-light btn-small orange lighten-2"
           @click="salaryWorkers('surname')"><i
            class="material-icons left ">person</i>Filtrować po nazwisku</a>
        <a class="waves-effect waves-light btn-small orange lighten-2"
           @click="salaryWorkers('salary')"><i
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
name: "workerChart",
  extends: Bar,
  data: () =>({
    workersInfo: []
  }),
  async mounted() {
    this.workersInfo = await this.$store.dispatch('receiveData');
    this.setup(this.newWorkers)
  },
  computed: {
    newWorkers() {
      return this.workersInfo.filter((item, i, arr) => arr[i].final_salary !== 0 && arr[i].final_per_hour !== 0);
    },
  },
  methods: {
    salaryWorkers(data) {
      if (data === 'surname') {
        const newSurname = this.newWorkers.sort((d1, d2) => d1.name.toLowerCase() > d2.name.toLowerCase() ? 1 : -1);
        this.setup(newSurname);
      } else if (data === 'salary') {
        const newSalary = this.newWorkers.sort((d1, d2) => {
          return (d1.final_salary - d2.final_salary)
        });
        this.setup(newSalary);
      } else {
        this.setup(this.newWorkers)
      }
    },
    setup(newWorkers) {
      let data = {
        labels: newWorkers.map((c) => c.name),
        datasets: [
          {
            data: newWorkers.map((item, i, arr) => {
              return arr[i].final_salary
            }),
            label: 'Uzgodnione z pracownikiem',
            backgroundColor: 'rgba(38, 166, 154, 0.8)',
            order: 1
          },
          {
            data: newWorkers.map((item, i, arr) => {
              return arr[i].salary
            }),
            label: 'Aktualne wynagrodzenie',
            backgroundColor: 'rgba(255, 104, 115, 0.8)',
            hidden: true,
            order: 2
          },
          {
            data: newWorkers.map((item, i, arr) => {
              return arr[i].salary_worker
            }),
            label: 'Propozycja pracownika',
            backgroundColor: 'rgba(255, 183, 77, 0.8)',
            hidden: true,
            order: 3
          },
          {
            data: newWorkers.map((item, i, arr) => {
              return arr[i].salary_department
            }),
            label: 'Propozycja zespółu pracownika',
            backgroundColor: 'rgba(41, 182, 246, 0.8)',
            hidden: true,
            order: 4
          }
        ]
      };
      const options  = {responsive: true, maintainAspectRatio: false, legend: {display: true}};
      this.renderChart(data, options)
    }
  }
}
</script>

<style scoped lang="scss">
.button_wrapper {
  display: flex;
  justify-content: center;
a {
  width: 280px;
  max-width: 280px;
  margin: 15px;
  text-align: left;
  font-size: 14px;
}
}
</style>