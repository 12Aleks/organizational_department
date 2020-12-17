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
      </div>
      <div class="wrapper">
        <canvas ref="canvas" style="height:100% !important;"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import {Doughnut} from 'vue-chartjs'
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels';
export default {
  name: "departmentDoughnutChart",
  extends: Doughnut,
  data: () => ({
    select: null,
    current: 'all',
    selectedElement: null,
  }),
  props: [ 'departmentInfo', 'newWorkerInSections'],
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
  computed: {
    process() {
      return Object.keys(Object.values(this.departmentInfo).reduce((acc, n) => ((acc[n.sections] = acc[n.sections] || []).push(n), acc), {})).map(key => key === '(puste)'? 'INNE' : key).sort((d1, d2) => d1.toUpperCase() > d2.toUpperCase() ? 1 : -1)
    }
  },
  methods: {
    chartDepartment(departmentWorkers) {
      function dynamicColors() {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return "rgba(" + r + "," + g + "," + b + ", 0.6)";
      }

      function poolColors(a) {
        let pool = [];
        for (let i = 0; i < a; i++) {
          pool.push(dynamicColors());
        }
        return pool;
      }

      const data = {
        labels: departmentWorkers.map((c) => c.name),
        datasets: [
          {
            data: departmentWorkers.map((item, i, arr) => {
              return arr[i].salary
            }),
            backgroundColor: poolColors(departmentWorkers.length),
          }
        ]
      };
      let lengthArr = departmentWorkers.map((c) => c.name).length
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {display: true, position: 'left'},
        plugins: {
          datalabels: {
            formatter: function(value) {
              return value + " zł";
            },
            color: "black",
            extAlign: "center",
            font: function(context) {
              if(lengthArr <= 25){
                let width = context.chart.width;
                let size = Math.round(width / 100);
                return {
                  size: size,
                  weight: 400
                };
              }else{
                return {
                  size: 0
                }
              }
            },
            anchor: 'center',
            align: 'center',
          }
        },
      };
      this.renderChart(data, options)
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  padding-bottom: 30px;
  margin-top: 10px;
  height: -webkit-calc(100vh - 222px);
  height: calc(100vh - 222px);
  position: relative;
  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    height: -webkit-calc(100vh - 210px);
    height: calc(100vh - 210px);
  }

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
    height: -webkit-calc(100vh - 210px);
    height: calc(100vh - 210px);
  }
}

.button_wrapper {
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
    margin: 5px 0 5px 0;
  }
}
</style>
