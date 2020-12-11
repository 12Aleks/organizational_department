<template>
  <div class="box-wrappers">
    <div class="table-wrapper" :class="{'table-height': changeTable }">
      <table class="highlight">
        <thead>
        <tr>
          <th style="width: 50px; background-color: #26a69a; color: #fff">&#8470</th>
          <th :class="{active: sortParam==='name', toggle: toggle}" @click="sort('name')">Nawisko i Imię</th>
          <th :class="{active: sortParam==='process',toggle: toggle}" @click="sort('process' )">Process</th>
          <th :class="{active: sortParam==='sections',toggle: toggle}" @click="sort('sections')">Komórka</th>
          <th :class="{active: sortParam==='salary', toggle: toggle}" @click="sort('salary')">Aktualne wynagrodzenie<br/><span>CKP / za godzinę</span>
          </th>
          <th :class="{active: sortParam==='salary_worker', toggle: toggle}" @click="sort('salary_worker')">Propozycja
            pracownika<br/><span>CKP / za godzinę</span>
          </th>
          <th :class="{active: sortParam==='salary_department', toggle: toggle}" @click="sort('salary_department')">Propozycja
            zespolu pracownika<br/><span>CKP / za godzinę</span>
          </th>
          <th :class="{active: sortParam==='final_salary', toggle: toggle}" @click="sort('final_salary')">Uzgodnione z Pracownikiem
            <br/><span>CKP / za godzinę</span>
          </th>
        </tr>
        </thead>
        <tbody id="table" v-for="(v, i) in sortedList" :key="i" :class="{newWorker: v.final_salary}">
        <tr>
          <td style="width: 50px">{{ i + 1 }}</td>
          <td>{{ v.name }}</td>
          <td>{{ v.process }}</td>
          <td>{{ v.sections }}</td>
          <td>{{ v.salary }}zł / {{ v.per_hour }}zł/god.</td>
          <td>{{ v.salary_worker }}zł / {{ v.per_hour_worker }}zł/god.</td>
          <td>{{ v.salary_department }}zł / {{ v.per_hour_department }}zł/god.</td>
          <td>{{ v.final_salary }}zł / {{ v.final_per_hour }}zł/god.</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {styleTable} from "@/main";

export default {
  name: "Process",
  props: ['process'],
  data: () => ({
    sortParam: '',
    toggle: false,
    changeTable: false,
  }),
  created() {
    styleTable.$on('changeTable', () => {
      return this.changeTable = !this.changeTable
    })
  },
  methods: {
    sort(value) {
      this.sortParam = value;
      this.toggle = !this.toggle
    }
  },
  computed: {
    sortedList() {
      switch (this.sortParam) {
        case 'name':
          let name = this.process.sort((d1, d2) => d1.name.toLowerCase() > d2.name.toLowerCase() ? 1 : -1);
          return this.toggle ? name : name.reverse()
        case 'process':
          let process = this.process.sort((d1, d2) => d1.process.toLowerCase() > d2.process.toLowerCase() ? 1 : -1);
          return this.toggle ? process : process.reverse()
        case 'sections':
          let sections = this.process.sort((d1, d2) => d1.sections.toLowerCase() > d2.sections.toLowerCase() ? 1 : -1);
          return this.toggle ? sections : sections.reverse()
        case 'salary':
          let salary = this.process.sort((d1, d2) => d1.salary > d2.salary ? 1 : -1);
          return this.toggle ? salary : salary.reverse()
        case 'salary_worker':
          let salary_worker = this.process.sort((d1, d2) => d1.salary_worker > d2.salary_worker ? 1 : -1);
          return this.toggle ? salary_worker : salary_worker.reverse()
        case 'salary_department':
          let salary_department = this.process.sort((d1, d2) => d1.salary_department > d2.salary_department ? 1 : -1);
          return this.toggle ? salary_department : salary_department.reverse()
        case 'final_salary':
          let final_salary = this.process.sort((d1, d2) => d1.final_salary > d2.final_salary ? 1 : -1);
          return this.toggle ? final_salary : final_salary.reverse()
        default:
          return this.process;
      }
    }
  }
}
</script>

<style scoped lang="scss">
$red: rgba(255, 104, 115, .7);
.subtitle {
  background-color: #4184491c;
}

.table-wrapper {
  height: -webkit-calc(100vh - 443px);
  height: calc(100vh - 443px);
  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    height: -webkit-calc(100vh - 411px);
    height: calc(100vh - 411px);
  }
  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
    height: -webkit-calc(100vh - 411px);
    height: calc(100vh - 411px);
  }

  .newWorker {
    background-color: $red;
  }
}

.table-wrapper.table-height {
  height: -webkit-calc(100vh - 279px);
  height: calc(100vh - 279px);
  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    height: -webkit-calc(100vh - 259px);
    height: calc(100vh - 259px);
  }
  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
    height: -webkit-calc(100vh - 259px);
    height: calc(100vh - 259px);
  }

}
</style>
