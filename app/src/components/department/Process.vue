<template>
  <div class="col s12 m12 l12 box-wrappers">
    <div class="table-wrapper">
      <table class="highlight">
        <thead>
        <tr>
          <th>Nawisko i Imię</th>
          <th>Process</th>
          <th>Komórka</th>
          <th>Aktualne wynagrodzenie <br/> ([CKP]/za godzinę)</th>
          <th>Propozycja pracownika<br/>([CKP]/za godzinę)</th>
          <th>Propozycja zespolu pracownika<br/>([CKP]/za godzinę)</th>
          <th>Uzgodnione z Pracownikiem <br/>([CKP]/za godzinę)</th>
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
export default {
  name: "Process",
  props: ['process'],
  data: () => ({}),
  computed: {}
}
</script>

<style scoped lang="scss">
$red: rgba(255, 104, 115, .7);
.subtitle {
  background-color: #4184491c;
}
.table-wrapper{
  height: -webkit-calc(100vh - 355px);
  height: calc(100vh - 355px);
  .newWorker{
    background-color: $red;
  }
}
</style>
