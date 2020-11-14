<template>
  <div class="col s12 m12 l12 box-wrappers">
    <div class="table-wrapper" :class="{'table-height': changeTable }">
      <table class="highlight">
        <thead>
        <tr>
          <th :class="{active: sortParam === 'name'}" @click="sortParam='name'">Nawisko i Imię</th>
          <th :class="{active: sortParam==='process'}" @click="sortParam='process'">Process</th>
          <th :class="{active: sortParam==='sections'}" @click="sortParam='sections'">Komórka</th>
          <th :class="{active: sortParam==='salary'}" @click="sortParam='salary'">Aktualne wynagrodzenie <br/> ([CKP]/za
            godzinę)
          </th>
          <th :class="{active: sortParam==='salary_worker'}" @click="sortParam='salary_worker'">Propozycja
            pracownika<br/>([CKP]/za godzinę)
          </th>
          <th :class="{active: sortParam==='salary_department'}" @click="sortParam='salary_department'">Propozycja
            zespolu pracownika<br/>([CKP]/za godzinę)
          </th>
          <th :class="{active: sortParam==='final_salary'}" @click="sortParam='final_salary'">Uzgodnione z Pracownikiem
            <br/>([CKP]/za godzinę)
          </th>
        </tr>
        </thead>
        <tbody id="table" v-for="(value, name, index) in process" :key="index">
        <tr>
          <td colspan="7" class="center subtitle">{{ name }}</td>
        </tr>
        <tr v-for="(v, i) in value" :key="i" :class="{newWorker: v.final_salary}">
          <td>{{ v.name }}</td>
          <td>{{v.process}}</td>
          <td>{{v.sections}}</td>
          <td>{{ v.salary }}zł / {{ v.per_hour }}zł/god.</td>
          <td>{{ v.salary_worker }}zł / {{ v.per_hour_worker}}zł/god.</td>
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
    changeTable: false
  }),
  created(){
      styleTable.$on('changeTable', () => {
         return this.changeTable = !this.changeTable
      })
  },
  computed: {
    sortedList(value) {
      switch (this.sortParam) {
        case 'name':
          return this.process.sort((d1, d2) => d1.name.toLowerCase() > d2.name.toLowerCase() ? 1 : -1);
        case 'process':
          return this.process.sort((d1, d2) => d1.process.toLowerCase() > d2.process.toLowerCase() ? 1 : -1);
        case 'sections':
          return this.process.sort((d1, d2) => d1.sections.toLowerCase() > d2.sections.toLowerCase() ? 1 : -1);
        case 'salary':
          return this.process.sort((d1, d2) => d1.salary > d2.salary ? 1 : -1);
        case 'salary_worker':
          return this.process.sort((d1, d2) => d1.salary_worker > d2.salary_worker ? 1 : -1);
        case 'salary_department':
          return this.process.sort((d1, d2) => d1.salary_department > d2.salary_department ? 1 : -1);
        case 'final_salary':
          return this.process.sort((d1, d2) => d1.final_salary > d2.final_salary ? 1 : -1);
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
  height: -webkit-calc(100vh - 408px);
  height: calc(100vh - 408px);
  .newWorker{
    background-color: $red;
  }
}
.table-wrapper.table-height{
  height: -webkit-calc(100vh - 290px);
  height: calc(100vh - 290px);
}

</style>
