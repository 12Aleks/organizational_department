<template>
  <div class="col s12 m8 l9 box-wrappers">
    <div class="table-wrapper">
      <table class="highlight">
        <thead>
        <tr>
          <th >Nawisko i Imię</th>
          <th >Process</th>
          <th >Komórka</th>
          <th >Aktualne wynagrodzenie <br /> ([CKP]/za godzinę)</th>
          <th >Uzgodnione z Pracownikiem <br />([CKP]/za godzinę)
          </th>
        </tr>
        </thead>
        <tbody id="table" v-for="(value, name, index) in process" :key="index" >
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        </tbody>
      </table>
      <p>{{ process }}</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Process",
        props: ['process'],
        data: () => ({

        }),
        computed:{

        }
    }
</script>

<style scoped>

</style>
