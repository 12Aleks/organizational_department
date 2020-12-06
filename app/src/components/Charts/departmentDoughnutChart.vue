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
// import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels';
export default {
  name: "departmentDoughnutChart",
  extends: Doughnut,
  data: () => ({
    departmentWorkers: []
  }),
  async mounted() {
    this.departmentWorkers = await this.$store.dispatch('selectedProcessAndDepartment', {
      departmentName: this.$route.params.id.toUpperCase(),
      selectProcessName: this.$route.params.process.toUpperCase()
    })
    this.chartDepartment(this.departmentWorkers)
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

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {display: true},
        // plugins: {
        //   datalabels: {
        //     formatter: function(value) {
        //       return value + " zł";
        //     }
        //   }
        // },
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
  height: -webkit-calc(100vh - 210px);
  height: calc(100vh - 210px);
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