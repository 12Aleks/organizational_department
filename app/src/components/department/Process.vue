<template>
  <div class="box-wrappers" :class="{sections_class: current !== 'all'}">
    <div class="table-wrapper z-depth-1" :class="{'table-height': changeTable }">
      <table class="highlight">
        <thead>
        <tr>
          <th style="width: 50px; color: #fff">&#8470</th>
          <th :class="{active: sortParam==='name', toggle: toggle}" @click="sort('name')">Nazwisko i Imię</th>
          <th :class="{active: sortParam==='process',toggle: toggle}" @click="sort('process' )">Proces</th>
          <th :class="{active: sortParam==='sections',toggle: toggle}" @click="sort('sections')">Komórka</th>
          <th :class="{active: sortParam==='salary', toggle: toggle}" @click="sort('salary')">Aktualne wynagrodzenie<br/><span>CKP / za godzinę</span>
          </th>
          <th :class="{active: sortParam==='salary_worker', toggle: toggle}" @click="sort('salary_worker')">Propozycja
            pracownika<br/><span>CKP / za godzinę</span>
          </th>
          <th :class="{active: sortParam==='salary_department', toggle: toggle}" @click="sort('salary_department')">Propozycja
            zespołu pracownika<br/><span>CKP / za godzinę</span>
          </th>
          <th :class="{active: sortParam==='salary_HR', toggle: toggle}" @click="sort('salary_HR')">Propozycja zespołu personalnego<br/><span>CKP / za godzinę</span></th>
          <th :class="{active: sortParam==='final_salary', toggle: toggle}" @click="sort('final_salary')">Uzgodnione z pracownikiem
            <br/><span>CKP / za godzinę</span>
          </th>
        </tr>
        </thead>
        <tbody id="table" v-for="(v, i) in sortedList" :key="i" :class="{newWorker: v.final_salary}">
        <tr>
          <td style="width: 50px">{{ i + 1 }}</td>

          <td><router-link :to="`/${v.process.toLowerCase()}/${v.sections === '(puste)' && v.department === '(puste)' ? v.process.toLowerCase() :
          v.department.toLowerCase()}/${v.name.toLowerCase()}`">{{ v.name }}</router-link></td>
          <td><router-link :to="`/departments`">{{ v.process }}</router-link></td>
          <td>{{ v.sections }}</td>
          <td>{{ v.salary }}zł / {{ v.per_hour }}zł/h</td>
          <td>{{ v.salary_worker }}zł / {{ v.per_hour_worker }}zł/h</td>
          <td>{{ v.salary_department }}zł / {{ v.per_hour_department }}zł/h</td>
          <td>{{ v.salary_HR }}zł / {{ v.per_hour_HR }}zł/h</td>
          <td>{{ v.final_salary }}zł / {{ v.final_per_hour }}zł/h</td>
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
  props: ['process', 'current'],
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
        case 'salary_HR':
          let salary_HR = this.process.sort((d1, d2) => d1.salary_HR > d2.salary_HR ? 1 : -1);
          return this.toggle ? salary_HR : salary_HR.reverse()
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
$sectionsClass: #297f75;
.subtitle {
  background-color: #4184491c;
}
.quantitySections{
  .table-wrapper {
    height: -webkit-calc(100vh - 438px);
    height: calc(100vh - 438px);
    @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
      height: -webkit-calc(100vh - 404px);
      height: calc(100vh - 404px);
    }
    @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
      height: -webkit-calc(100vh - 404px);
      height: calc(100vh - 404px);
    }
  }
  .table-wrapper.table-height {
    height: -webkit-calc(100vh - 274px);
    height: calc(100vh - 274px);
    @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
      height: -webkit-calc(100vh - 252px);
      height: calc(100vh - 252px);
    }
    @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
      height: -webkit-calc(100vh - 252px);
      height: calc(100vh - 252px);
    }
  }
}

.table-wrapper {
  height: -webkit-calc(100vh - 488px);
  height: calc(100vh - 488px);
  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    height: -webkit-calc(100vh - 454px);
    height: calc(100vh - 454px);
  }
  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
    height: -webkit-calc(100vh - 454px);
    height: calc(100vh - 454px);
  }
}

.table-wrapper.table-height {
  height: -webkit-calc(100vh - 324px);
  height: calc(100vh - 324px);
  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    height: -webkit-calc(100vh - 302px);
    height: calc(100vh - 302px);
  }
  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
    height: -webkit-calc(100vh - 302px);
    height: calc(100vh - 302px);
  }
}
.sections_class{
  .table-wrapper{
     table th {
       background-color: $sectionsClass;
     }
  }
}

</style>
