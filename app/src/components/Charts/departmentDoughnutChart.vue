<template>
  <div class="row">
    <div class="col s12 m12 l12">
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
  props: [ 'departmentInfo'],
  watch: {
    departmentInfo() {
      this.chartDepartment(this.departmentInfo)
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
            // font: {
            //   weight: 500,
            //   size: lengthArr <= 18? 12 : 0
            // },
            font: function(context) {
              if(lengthArr <= 18){
                let width = context.chart.width;
                let size = Math.round(width / 100);
                return {
                  size: size,
                  weight: 400
                };
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
  height: -webkit-calc(100vh - 200px);
  height: calc(100vh - 200px);
  position: relative;
  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    height: -webkit-calc(100vh - 180px);
    height: calc(100vh - 180px);
  }

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
    height: -webkit-calc(100vh - 180px);
    height: calc(100vh - 180px);
  }
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
