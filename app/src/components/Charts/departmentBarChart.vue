<template>
  <div class="row">
    <div class="col s12 m12 l12">
      <div class="button_wrapper">
        <a class="waves-effect waves-light btn-small orange lighten-2"
           ><i
            class="material-icons left ">person</i>Filtrować po nazwisku</a>
        <a class="waves-effect waves-light btn-small orange lighten-2"
          ><i
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
    departmentWorkers: []
  }),
  async mounted() {
    this.departmentWorkers = await this.$store.dispatch('departmentName', this.$route.params.id.toUpperCase())
    this.chartDepartment(this.departmentWorkers)
  },
  methods: {
   chartDepartment(departmentWorkers) {
      console.log(departmentWorkers)
      const data = {
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
              return arr[i].salary_worker
            }),
            label: 'Uzgodnione z pracownikiem',
            backgroundColor: 'rgba(38, 166, 154, 0.8)',
            hidden: true,
            fill: false,
            order: 3
          },

        ]
      };

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

  a {
    width: 280px;
    max-width: 280px;
    margin: 15px;
    text-align: left;
    font-size: 14px;
  }
}
</style>