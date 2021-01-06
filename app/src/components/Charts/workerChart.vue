<template>
  <div class="row">
    <div class="col s12 m12 l12">
      <div class="button_wrapper">
        <a class="waves-effect waves-light btn-small orange lighten-2"
           @click="salaryWorkers('surname')"><i
            class="material-icons left ">person</i>Filtrować po nazwisku</a>
        <a class="waves-effect waves-light btn-small orange lighten-2"
           @click="salaryWorkers('final_salary')"><i
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
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels';
import gradient from "../../mixins/gradient.mixin";

export default {
  name: "workerChart",
  mixins: [gradient],
  extends: Bar,
  data: () => ({
    workersInfo: []
  }),
  async mounted() {
    this.workersInfo = await this.$store.dispatch('receiveData');
    this.setup(this.newWorkers,);
  },
  computed: {
    newWorkers() {
      return this.workersInfo.filter((item, i, arr) => arr[i].final_salary !== 0 && arr[i].final_per_hour !== 0 || arr[i].salary_worker !== 0 && arr[i].per_hour_worker !== 0);
    },
  },
  methods: {
    salaryWorkers(data) {
      if (data === 'surname') {
        const newSurname = this.newWorkers.sort((d1, d2) => d1.name.toLowerCase() > d2.name.toLowerCase() ? 1 : -1);
        this.setup(newSurname);
      } else if (data === 'final_salary') {
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
              return arr[i].salary
            }),
            label: 'Aktualne wynagrodzenie',
            backgroundColor: this.gradient_first,
            hoverBackgroundColor: this.gradient_first,
            hoverBorderWidth: 1,
            hoverBorderColor: 'rgba(183,28,28,.8)',
            order: 1
          },
          {
            data: newWorkers.map((item, i, arr) => {
              return arr[i].final_salary
            }),
            label: 'Uzgodnione z pracownikiem',
            backgroundColor: this.gradient_second,
            hoverBackgroundColor: this.gradient_second,
            hoverBorderWidth: 1,
            hoverBorderColor: 'rgba(27,94,32,.8)',
            hidden: true,
            order: 2
          },
          {
            data: newWorkers.map((item, i, arr) => {
              return arr[i].salary_worker
            }),
            label: 'Propozycja pracownika',
            backgroundColor: this.gradient_third,
            hoverBackgroundColor: this.gradient_third,
            hoverBorderWidth: 1,
            hoverBorderColor: 'rgba(245,127,23,.8)',
            hidden: true,
            order: 3
          },
          {
            data: newWorkers.map((item, i, arr) => {
              return arr[i].salary_department
            }),
            label: 'Propozycja zespołu pracownika',
            backgroundColor: this.gradient_fourth,
            hoverBackgroundColor: this.gradient_fourth,
            hoverBorderWidth: 1,
            hoverBorderColor: 'rgba(1,87,155,.8)',
            hidden: true,
            order: 4
          },
          {
            data: newWorkers.map((item, i, arr) => {
              return arr[i].salary_HR
            }),
            label: 'Propozycja zespołu personalnego',
            backgroundColor: this.gradient_fifth ,
            hoverBackgroundColor: this.gradient_fifth,
            hoverBorderWidth: 1,
            hoverBorderColor: 'rgba(84,110,122,0.7)',
            hidden: true,
            order: 5,
          }
        ]
      };
      let lengthArr = newWorkers.map((c) => c.name).length

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {display: true},
        plugins: {
          datalabels: {
            formatter: function (value) {
              return value > 0 ? value + " zł" : null;
            },
            color: "#fff",
            extAlign: "center",
            font: function (context) {
              if (lengthArr <= 20) {
                let width = context.chart.width;
                let size = Math.round(width / 100 - 2);
                return {
                  size: size,
                  weight: 500,
                };
              } else {
                return {
                  size: 0
                }
              }
            },
            rotation: -90,
            anchor: 'center',
            align: 'center',
            // display: 'auto',
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            }
          }]
        }
      };
      this.renderChart(data, options)
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  padding-bottom: 30px;
  height: -webkit-calc(100vh - 320px);
  height: calc(100vh - 320px);
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
