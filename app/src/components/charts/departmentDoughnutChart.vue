<template>
  <div class="row">
    <div class="col s12 m12 l12">
      <div class="button_wrapper">
        <select class="browser-default" ref="select" v-model="current" v-if="process.length > 1  ">
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
        let r = Math.floor(Math.random() * 360),
            g = Math.floor(Math.random() * 100),
            b = Math.floor(Math.random() * 50);
        return "hsl(" + r + "," + g + "%," + b + "%, 0.45)";
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
        legend: {
          display: true,
          position: 'left',
        },
        plugins: {
          datalabels: {
            formatter: function(value) {
              return value + " zł";
            },
            color: "#ffffff",
            extAlign: "center",
            font: function(context) {
              if(lengthArr <= 30){
                let width = context.chart.width;
                let size = Math.round(width / (100 + lengthArr) );
                return {
                  size: size,
                  weight: 500
                };
              }else{
                return {
                  size: 0
                }
              }
            },
            display: 'auto',
            anchor: 'center',
            align: 'center',
          }
        },
      };

      // Chart.pluginService.register({
      //   beforeDraw: function(chart) {
      //     var width = chart.chart.width,
      //             height = chart.chart.height,
      //             ctx = chart.chart.ctx;
      //
      //     ctx.restore();
      //     var fontSize = (height / 200).toFixed(2);
      //     ctx.font = fontSize + "em sans-serif";
      //     ctx.textBaseline = "middle";
      //
      //     var text = "75%",
      //             textX = Math.round((width - ctx.measureText(text).width) / 1.5),
      //             textY = height / 2;
      //
      //     ctx.fillText(text, textX, textY);
      //     ctx.save();
      //   }
      // });


      this.renderChart(data, options)
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  padding-bottom: 15px;
  margin-top: 10px;
  height: -webkit-calc(100vh - 233px);
  height: calc(100vh - 233px);
  position: relative;
  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    height: -webkit-calc(100vh - 203px);
    height: calc(100vh - 203px);
  }

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
    height: -webkit-calc(100vh - 203px);
    height: calc(100vh - 203px);
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
