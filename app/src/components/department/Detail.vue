<template>
  <div class="col s12 m4 l3 ">
    <div class="box-wrapper">
      <h6 class="valign-wrapper border"><i class="material-icons left">people_outline</i>Liczba osób w
        zespole: {{ departmentInfo.length }}
      </h6>
      <h6 class="valign-wrapper border"><i class="material-icons left">trending_up</i>Najwyższe wynagrodzenie w
        zespole:</h6>
      <ul class="info-wrapper">
        <li>Wynagrodzenie całkowite (CKP): {{ max }} zł.</li>
        <li>Za godzinę (CKP): {{ maxHour }} zł.</li>
      </ul>
      <h6 class="valign-wrapper border"><i class="material-icons left">vertical_align_center</i>Przeciętne wynagrodzenie w
        zespole:</h6>
      <ul class="info-wrapper">
        <li>Wynagrodzenie całkowite (CKP): {{ average }} zł.</li>
        <li>Za godzinę (CKP): {{ averageHour }} zł.</li>
      </ul>

      <h6 class="valign-wrapper border"><i class="material-icons left">trending_down</i>Najniższe wynagrodzenie w
        zespole:</h6>
      <ul class="info-wrapper">
        <li> Wynagrodzenie całkowite (CKP): {{ min }} zł.</li>
        <li> Za godzinę (CKP): {{ minHour }} zł.</li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  name: "detail",
  props: ['departmentInfo', 'departmentName'],
  computed: {
    max() {
      return Math.max.apply(null, this.departmentInfo.map(el => (el.salary)))
    },
    maxHour() {
      return Math.max.apply(null, this.departmentInfo.map(el => (el.per_hour)))
    },
    averageHour() {
      return (this.departmentInfo.map(el => (el.per_hour)).reduce((arr, el) => (arr + el), 0) / this.departmentInfo.length).toFixed(2);
    },
    average() {
      return ((this.departmentInfo.map(el => (el.salary)).reduce((arr, el) => (arr + el), 0)) / this.departmentInfo.length).toFixed(2)
    },
    min() {
      return Math.min.apply(null, this.departmentInfo.map(el => (el.salary)))
    },
    minHour() {
      return Math.min.apply(null, this.departmentInfo.map(el => (el.per_hour)))
    },
  }
}
</script>

<style scoped lang="scss">
$turquoise: #26a69a;
$lightTurquoise: rgba(38, 166, 154, .4);
$black: rgba(48, 69, 92, 1);
$white: rgba(254, 255, 250, 1);
$blue: rgb(81, 110, 133);

.box-wrapper {
  max-width: 380px;
  display: block;
  h6.border {
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 600;
    color: $turquoise;
    i {
      border: 1px solid $turquoise;
      font-size: 1rem;
      padding: 3px;
      color: $white;
      background: $turquoise;
      border-radius: 50%;
    }
  }

  .info-wrapper {
    max-width: 290px;
    width: 100%;
    display: block;
    margin: 15px 0 15px 25px;

    li {
      list-style-type: circle;
      margin-bottom: 5px;
      color: $black;
      text-transform: uppercase;
      font-size: 13px;
    }

  }
}


</style>