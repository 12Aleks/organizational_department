<template>
  <div class="col s12 m12 l12 ">
    <div class="department-wrapper">
      <table class="responsive-table">
        <thead>
        <tr class="subtitle">
          <th colspan="3">
            <div class="title-wrapper">
              <h3 class="flow-text valign-wrapper border">
                <i class="material-icons left">people_outline</i>
                ZESPÓŁ - {{ departmentName }}<span> (liczba osób w zespole: {{ departmentInfo.length }})</span>
              </h3>
              <a class="btn-floating red lighten-2 button-right" @click="isHiddenTable">
                <i v-if="!isHidden" class="material-icons">expand_more</i>
                <i v-else class="material-icons">expand_less</i>
              </a>
            </div>
          </th>
        </tr>
        </thead>
        <tbody v-show="isHidden">
        <tr>
          <td>
            <div>
              <h6 class="valign-wrapper border"><i class="material-icons left">trending_up</i>Najwyższe wynagrodzenie w
                zespole:</h6>
              <ul class="info-wrapper">
                <li>Wynagrodzenie całkowite (CKP): {{ max }} zł.</li>
                <li>Za godzinę (CKP): {{ maxHour }} zł.</li>
              </ul>
            </div>
          </td>
          <td>
            <div>
              <h6 class="valign-wrapper border"><i class="material-icons left">vertical_align_center</i>Przeciętne
                wynagrodzenie w
                zespole:</h6>
              <ul class="info-wrapper">
                <li>Wynagrodzenie całkowite (CKP): {{ average }} zł.</li>
                <li>Za godzinę (CKP): {{ averageHour }} zł.</li>
              </ul>
            </div>
          </td>
          <td>
            <div>
              <h6 class="valign-wrapper border"><i class="material-icons left">trending_down</i>Najniższe wynagrodzenie
                w
                zespole:</h6>
              <ul class="info-wrapper">
                <li> Wynagrodzenie całkowite (CKP): {{ min }} zł.</li>
                <li> Za godzinę (CKP): {{ minHour }} zł.</li>
              </ul>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {styleTable} from "@/main";

export default {
  name: "detail",
  props: ['departmentInfo', 'departmentName'],
  data: () => ({
    isHidden: true
  }),
  methods: {
    isHiddenTable() {
      this.isHidden = !this.isHidden;
      styleTable.$emit('changeTable')
    }
  },
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

.department-wrapper {
  max-width: 100%;
  display: block;

  table {
    margin-bottom: 15px;

    th, td {
      border: 1px solid $lightTurquoise;
      border-collapse: collapse;
      text-align: center;
      padding: 5px 5px;
    }

    thead {
      tr {
        th {
          background-color: $turquoise;

          .button-right {
            height: 34px;
            width: 34px;

            i {
              line-height: 35px;
              padding-right: 1px;
            }

            @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
              height: 28px;
              width: 28px;
              i {
                font-size: 1.6rem;
                line-height: 28px;
                padding-right: 0;
              }
            }
          }
        }
      }
    }

    tbody {
      tr {
        td {

          div {
            max-width: 350px;
            display: block;
            margin: 0 auto;
          }

        }
      }
    }

    h3.border, h6.border {
      text-transform: uppercase;
      font-weight: 600;

      i {
        border: 1px solid $turquoise;
        font-size: 1rem;
        padding: 3px;
        color: $white;
        background-color: $turquoise;
        border-radius: 50%;
      }
    }

    .title-wrapper {
      position: relative;

      a.button-right {
        position: absolute;
        right: 15px;
        top: 0;

        i {
          font-size: 1.2rem;
        }
      }

      h3.border {
        font-size: 1.2rem;
        font-weight: 600;
        justify-content: center;
        color: $white;
        margin: 5px;

        i {
          font-size: 1.7rem;
        }

        span {
          text-transform: lowercase;
          margin-left: 5px;
        }

        @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
          font-size: 1rem;
          margin: 0;
          i {
            font-size: 1.5rem;
          }
        }
      }
    }

    h6.border {
      color: $turquoise;
      font-size: 1rem;
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
        font-size: .9rem;
        margin-top: 7px;

      }
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
      text-align: left;
    }

  }
}


</style>