<template>
  <div class="col s12 m12 box-wrapper">
    <h3 class="flow-text center">ZESPÓŁ: {{ departmentName }}</h3>
    <h6 class="valign-wrapper border"><i class="material-icons left">people_outline</i>Liczba osób w
      zespole: {{ departmentInfo.length }}
    </h6>
    <div class="row">
      <div class="col s12 m4">
        <h6 class="valign-wrapper border"><i class="material-icons left">trending_up</i>Najwyższe wynagrodzenie w
          zespole:</h6>
        <ul class="info-wrapper">
          <li>Wynagrodzenie całkowite (CKP): {{ max }} zł.</li>
          <li>Za godzinę (CKP): {{ maxHour }} zł.</li>
        </ul>
      </div>
      <div class="col s12 m4">
        <h6 class="valign-wrapper border"><i class="material-icons left">vertical_align_center</i>Przeciętne wynagrodzenie w
          zespole:</h6>
        <ul class="info-wrapper">
          <li>Wynagrodzenie całkowite (CKP): {{ average }} zł.</li>
          <li>Za godzinę (CKP): {{ averageHour }} zł.</li>
        </ul>
      </div>
      <div class="col s12 m4">
        <h6 class="valign-wrapper border"><i class="material-icons left">trending_down</i>Najniższe wynagrodzenie w
          zespole:</h6>
        <ul class="info-wrapper">
          <li> Wynagrodzenie całkowite (CKP): {{ min }} zł.</li>
          <li> Za godzinę (CKP): {{ minHour }} zł.</li>
        </ul>
      </div>
      <div class="col s12 hr"><div></div></div>
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
$red: rgba(255, 104, 115, 1);
.box-wrapper{
  .row{
    margin-bottom: 10px;
  }
  //.hr{
  //  div{
  //    height: 1px;
  //    background-color: $lightTurquoise;
  //  }
  //}

  h3{
    color: $red;
    margin-bottom: 25px;
  }
  h6.border{
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 600;
    color: $turquoise;
    justify-content: center;
    i {
      border: 1px solid $turquoise;
      font-size: 1rem;
      padding: 3px;
      color: $white;
      background: $turquoise;
      border-radius: 50%;
    }
  }
  .info-wrapper{
    max-width: 290px;
    width: 100%;
    display: block;
    margin: 15px auto;
    li{
      list-style-type: circle;
      margin-bottom: 5px;
      color: $black;
      text-transform: uppercase;
      font-size: 13px;
    }

  }
}


</style>