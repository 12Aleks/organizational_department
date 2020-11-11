<template>
  <div>
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3 class="flow-text">Nowi pracownicy</h3>
        </div>
        <div class="row img_attachment">
          <div class="col s12 m12">
            <ul class="tabs" ref="tabs">
              <li class="tab col s3"><a class="active" href="#tabFirst">Lista nowzch pracownikow</a></li>
              <li class="tab col s3"><a href="#tabSecond">Wykres słupkowy</a></li>
            </ul>
          </div>
          <Loader v-if="loader"/>
          <div v-show="!loader" id="tabFirst" class="col s12">
            <div class="table-wrapper">
              <table class="highlight">
                <thead>
                <tr>
                  <th :class="{active: sortParam === 'name'}" @click="sortParam='name'">Nawisko i
                    Imię
                  </th>
                  <th :class="{active: sortParam==='department'}" @click="sortParam='department'">
                    Zespół
                  </th>
                  <th :class="{active: sortParam==='sections'}" @click="sortParam='sections'">
                    Komórka
                  </th>
                  <th :class="{active: sortParam==='salary'}" @click="sortParam='salary'">Aktualne
                    wynagrodzenie <br >([CKP]/za godzinę)
                  </th>
                  <th :class="{active: sortParam==='final_salary'}" @click="sortParam='final_salary'">
                    Uzgodnione z Pracownikiem <br > ([CKP]/za godzinę)
                  </th>
                </tr>
                </thead>
                <tbody id="table" v-for="(value, name, index) in sortedList" :key="index">
                <tr>
                  <td>{{ value.name }}</td>
                  <td>{{
                      value.sections === '(puste)' && value.department === '(puste)' ? value.process
                          : value.department
                    }}
                  </td>
                  <td>{{ value.sections !== '(puste)' ? value.sections : '(puste)' }}</td>
                  <td>{{ value.salary }}zł / {{ value.per_hour }}zł/god.</td>
                  <td>{{ value.final_salary }}zł / {{ value.final_per_hour }}zł/god.</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div id="tabSecond" class="col s12">
             <worker-chart></worker-chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import M from 'materialize-css'
import workerChart from "@/components/Charts/workerChart";

export default {
  name: "newWorkerList",
  data: () => ({
    sortParam: '',
    instance: null,
    loader: true,
    surnames: true,
    workersInfo: []
  }),
  async mounted() {
    this.instance = M.Tabs.init(this.$refs.tabs);
    this.workersInfo = await this.$store.dispatch('receiveData');
    this.loader = false;
  },
  components:{
    workerChart
  },
  computed: {
    newWorkers() {
      return this.workersInfo.filter((item, i, arr) => arr[i].final_salary !== 0 && arr[i].final_per_hour !== 0);
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
  destroyed() {
    if (this.instance && this.instance.destroy) {
      this.instance.destroy()
    }
  }
}
</script>

<style lang="scss">
$turquoise: #26a69a;
$black: rgba(48, 69, 92, 1);
$white: rgba(254, 255, 250, 1);
$blue: #57758c94;
$red: rgba(255, 104, 115, 1);
.img_attachment {
  .wrapper {
    padding-bottom: 30px;
    height: -webkit-calc(100vh - 320px);
    height: calc(100vh - 320px);
    position: relative;
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
}

h6 {
  text-transform: uppercase;
  font-weight: 400;
  font-size: 14px;
  margin-top: 10px;
  color: #9b9b9b;
}

</style>

