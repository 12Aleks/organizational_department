<template>
  <div class="box-wrappers">
    <div class="table-wrapper" :class="{'table-height': changeTable }">
      <table class="highlight">
        <thead>
        <tr>
          <th style="width: 50px; background-color: #26a69a; color: #fff" >&#8470</th>
          <th :class="{active: sortParam === 'name'}" @click="sortParam='name'" v-tooltipe="`Kliknij i sortuj według imienia i nazwiska`">Nawisko i Imię</th>
          <th :class="{active: sortParam==='process'}" @click="sortParam='process'" v-tooltipe="`Kliknij i sortuj według nazwy procesu`">Process</th>
          <th :class="{active: sortParam==='sections'}" @click="sortParam='sections'" v-tooltipe="`Kliknij i sortuj według nazwy komórki`">Komórka</th>
          <th :class="{active: sortParam==='salary'}" @click="sortParam='salary'" v-tooltipe="`Kliknij i sortuj według sumy wynagrodzenia`">Aktualne wynagrodzenie <br/> ([CKP]/za
            godzinę)
          </th>
          <th :class="{active: sortParam==='salary_worker'}" @click="sortParam='salary_worker'" v-tooltipe="`Kliknij i sortuj według sumy - propozycji pracownika`">Propozycja
            pracownika<br/>([CKP]/za godzinę)
          </th>
          <th :class="{active: sortParam==='salary_department'}" @click="sortParam='salary_department'" v-tooltipe="`Kliknij i sortuj według sumy - propozycji zespolu pracownika`">Propozycja
            zespolu pracownika<br/>([CKP]/za godzinę)
          </th>
          <th :class="{active: sortParam==='final_salary'}" @click="sortParam='final_salary'" v-tooltipe="`Kliknij i sortuj według sumy uzgodnionej z pracownikiem`">Uzgodnione z Pracownikiem
            <br/>([CKP]/za godzinę)
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
    changeTable: false,
  }),
  created() {
    styleTable.$on('changeTable', () => {
      return this.changeTable = !this.changeTable
    })
  },
  computed: {
    sortedList() {
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
