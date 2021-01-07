<template>
  <div class="row">
    <div class="col s12 m12 l12">
      <div class="button_wrapper">
        <select class="browser-default z-depth-1" ref="select" v-model="current" v-if="process.length > 1  ">
          <option value="all">Wszystkie komorki</option>
          <option v-for="(c, index) of process"
                  :key="index"
                  :value="c"
                  :class="{newWorkerClass:  (newWorkerInSections.length > 0? newWorkerInSections.includes(c) : false)}"
          >{{ c }}
          </option>
        </select>
        <a class="btn-small btn-surname"
           @click="departmentData('surname')"><i
            class="material-icons left ">person</i>Filtrować po nazwisku</a>
        <a class="btn-small btn-final_salary"
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
import gradient from '../../mixins/gradient.mixin'
import {Bar} from 'vue-chartjs'
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels';
export default {
  name: "departmentBarChart",
  extends: Bar,
  props: ['newWorkerInSections', 'departmentInfo'],
  mixins: [gradient],
  data: () => ({
    select: null,
    current: 'all',
    selectedElement: null,
  }),
  computed: {
    process() {
      return Object.keys(Object.values(this.departmentInfo).reduce((acc, n) => ((acc[n.sections] = acc[n.sections] || []).push(n), acc), {})).map(key => key === '(puste)'? 'INNE' : key).sort((d1, d2) => d1.toUpperCase() > d2.toUpperCase() ? 1 : -1)
    }
  },
  watch: {
    departmentInfo() {
      this.chartDepartment(this.departmentInfo)
    },
    current(selected) {
      let renameSelected = selected === 'INNE'? '(puste)' : selected;
      const result = Object.values(this.departmentInfo).reduce((acc, n) => ((acc[n.sections] = acc[n.sections] || []).push(n), acc), {})
      if (renameSelected !== 'all') {
        let selectedSection = Object.keys(result).filter(key => key === renameSelected ).reduce((obj, key) => {
          obj[key] = result[key];
          return obj;
        }, {});
        this.selectedElement = selectedSection[renameSelected];
      } else {
        this.selectedElement = this.departmentInfo
      }
      this.chartDepartment(this.selectedElement)
    }
  },
  methods: {
    departmentData(data) {
      let originalState = this.selectedElement !== null ? this.selectedElement : this.departmentInfo
      if (data === 'surname') {
        const newSurname = originalState.sort((d1, d2) => d1.name.toLowerCase() > d2.name.toLowerCase() ? 1 : -1);
        this.chartDepartment(newSurname);
      } else if (data === 'salary') {
        const newSalary = originalState.sort((d1, d2) => {
          return (d1.salary - d2.salary)
        });
        this.chartDepartment(newSalary);
      } else {
        this.chartDepartment(this.departmentInfo)
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
              backgroundColor: this.gradient_first,
              hoverBackgroundColor: this.gradient_first,
              hoverBorderWidth: 1,
              hoverBorderColor: 'rgba(69,90,100,1)',
              order: 1
            },
            {
              data: departmentWorkers.map((item, i, arr) => {
                return arr[i].final_salary
              }),
              label: 'Uzgodnione z pracownikiem',
              backgroundColor: this.gradient_second,
              hoverBackgroundColor: this.gradient_second,
              hoverBorderWidth: 1,
              hoverBorderColor: 'rgba(136,164,178,1)',
              hidden: true,
              order: 2
            },
            {
              data: departmentWorkers.map((item, i, arr) => {
                return arr[i].salary_worker
              }),
              label: 'Propozycja pracownika',
              backgroundColor: this.gradient_third,
              hoverBackgroundColor: this.gradient_third,
              hoverBorderWidth: 1,
              hoverBorderColor: 'rgba(86,86,71,1)',
              hidden: true,
              order: 3
            },
            {
              data: departmentWorkers.map((item, i, arr) => {
                return arr[i].salary_department
              }),
              label: 'Propozycja zespołu pracownika',
              backgroundColor: this.gradient_fourth,
              hoverBackgroundColor: this.gradient_fourth,
              hoverBorderWidth: 1,
              hoverBorderColor: 'rgba(109,118,81,1)',
              hidden: true,
              order: 4
            },
            {
              data: departmentWorkers.map((item, i, arr) => {
                return arr[i].salary_HR
              }),
              label: 'Propozycja zespołu personalnego',
              backgroundColor: this.gradient_fifth ,
              hoverBackgroundColor: this.gradient_fifth,
              hoverBorderWidth: 1,
              hoverBorderColor: 'rgba(158,134,107,1)',
              hidden: true,
              order: 5,
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
              backgroundColor: this.gradient_first,
              hoverBackgroundColor: this.gradient_first,
              hoverBorderWidth: 1,
              hoverBorderColor: 'rgba(69,90,100,1)',
              order: 1
            }]
        }
      }
      let lengthArr = departmentWorkers.map((c) => c.name).length
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {display: true},
        plugins: {
          datalabels: {
            formatter: function(value) {
              return value > 0 ? value + " zł": null;
            },
            color: "#fff",
            extAlign: "center",
            font: function(context) {
              if(lengthArr <= 20){
                let width = context.chart.width;
                let size = Math.round(width / 100 - 2);
                return {
                  size: size,
                  weight: 600,
                };
              }else{
                return {
                  size: 0
                }
              }
            },
            rotation: -90,
            anchor: 'center',
            align: 'center',
            // display: 'auto',
          },
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            }
          }],
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
  height: -webkit-calc(100vh - 250px);
  height: calc(100vh - 250px);
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

  select {
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
