<template>
  <div>
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3 class="flow-text">Lista osob</h3>
        </div>

        <div class="row img_attachment">
          <Loader v-if="loader" />
          <div v-show="!loader" class="col s12 m12">
            <div class="table-wrapper">
              <table class="highlight">
                <thead>
                <tr>
                  <th :class="{active: sortParam === 'name'}" @click="sortParam='name'">Nawisko i Imię</th>
                  <th :class="{active: sortParam==='department'}" @click="sortParam='department'">Zespół</th>
                  <th :class="{active: sortParam==='sections'}" @click="sortParam='sections'">Komórka</th>
                  <th :class="{active: sortParam==='salary'}" @click="sortParam='salary'">Aktualne wynagrodzenie <br /> ([CKP]/za godzinę)</th>
                  <th :class="{active: sortParam==='final_salary'}" @click="sortParam='final_salary'">Uzgodnione z Pracownikiem <br />([CKP]/za godzinę)
                  </th>
                </tr>
                </thead>
                <tbody id="table" v-for="(value, name, index) in sortedList" :key="index">
                <tr>
                  <td>{{ value.name }}</td>
                  <td>{{
                      value.sections === '(puste)' && value.department === '(puste)' ? value.process :
                          value.department
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "WorkerLists",
  data(){
    return {
      sortParam: '',
      loader: true,
      workersInfo: []
    }
  },
  async mounted() {
    this.workersInfo = await this.$store.dispatch('receiveData');
    this.loader = false;
  },
  computed: {
    sortedList() {
      switch (this.sortParam) {
        case 'name':
          return this.workersInfo.sort((d1, d2) => d1.name.toLowerCase() > d2.name.toLowerCase() ? 1 : -1);
        case 'department':
          return this.workersInfo.sort((d1, d2) => d1.department.toLowerCase() > d2.department.toLowerCase() ? 1 : -1);
        case 'sections':
          return this.workersInfo.sort((d1, d2) => d1.sections.toLowerCase() > d2.sections.toLowerCase() ? 1 : -1);
        case 'salary':
          return this.workersInfo.sort((d1, d2) => d1.salary > d2.salary ? 1 : -1);
        case 'final_salary':
          return this.workersInfo.sort((d1, d2) => d1.final_salary > d2.final_salary ? 1 : -1);
        default:
          return this.workersInfo;
      }
    }
  }
}
</script>

<style scoped>
.table-wrapper {
  height: -webkit-calc(100vh - 225px);
  height: calc(100vh - 225px);
}

table {
  table-layout: fixed;
}
</style>
