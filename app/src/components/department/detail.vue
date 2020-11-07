<template>
  <div class="col s12 m4">
    <p>Liczba osób w zespole: {{departmentSize}} </p>

    <p>Najwyższe wynagrodzenie w zespole (CKP): </p>
    <p>Za godzine (CKP):</p>

    <p>Najniższe wynagrodzenie w zespole (CKP):</p>
    <p>Za godzine (CKP):</p>

    <p>Przeciętne wynagrodzenie w zespole (CKP):</p>
    <p>Za godzine (CKP):</p>
  </div>
</template>

<script>
export default {
name: "detail",
  props: ['process'],
  mounted() {
  }
  computed:{
     departmentSize(){
       return this.$store.getters.departmentInfo
     }
  }

}
</script>

<style scoped>

</style>