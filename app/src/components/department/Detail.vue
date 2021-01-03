<template>
  <div class="department-wrapper" :class="{sections_class: current !== 'all'}">
    <table class="responsive-table">
      <thead>
      <tr class="subtitle">
        <th colspan="4">
          <div class="title-wrapper">
            <h3 class="flow-text valign-wrapper border">
              <i class="material-icons left">people_outline</i>
              ZESPÓŁ - {{ departmentName }} <span v-if="current !== 'all'">/ KOMÓRKA - {{ current }}</span>
            </h3>
            <a class="btn-floating grey lighten-5 button-right z-depth-1" @click="isHiddenTable">
              <i v-if="!isHidden" class="material-icons">expand_more</i>
              <i v-else class="material-icons">expand_less</i>
            </a>
          </div>
        </th>
      </tr>
      </thead>
      <tbody v-show="isHidden">
      <tr>
        <td colspan="2"><h6 class="center border">Liczba osób w <span v-if="current === 'all'">zespołe</span><span
            v-else>komórce</span>: {{ departmentInfo.length }}</h6></td>
        <td colspan="2"><h6 class="center border">Suma wynagrodzeń <span v-if="current === 'all'">zespołu</span><span
            v-else>komórki</span>: {{ all }} zł.</h6></td>
      </tr>
      <tr>
        <td>
          <div>
            <h6 class="valign-wrapper border">
              <i class="material-icons left">trending_up</i>
              <span v-if="current === 'all'"> Najwyższe wynagrodzenie w zespołe</span>
              <span v-else> Najwyższe wynagrodzenie w komórce</span>:</h6>
            <ul class="info-wrapper">
              <li>Całkowity Koszt Pracodawcy (CKP): {{ max }} zł.</li>
              <li>Za godzinę (CKP): {{ maxHour }} zł.</li>
            </ul>
          </div>
        </td>
        <td colspan="2">
          <div>
            <h6 class="valign-wrapper border"><i class="material-icons left">vertical_align_center</i>
              <span v-if="current === 'all'">Przeciętne wynagrodzenie w zespołe</span>
              <span v-else>Przeciętne wynagrodzenie w komórce</span>:</h6>
            <ul class="info-wrapper">
              <li>Całkowity Koszt Pracodawcy (CKP): {{ average }} zł.</li>
              <li>Za godzinę (CKP): {{ averageHour }} zł.</li>
            </ul>
          </div>
        </td>
        <td>
          <div>
            <h6 class="valign-wrapper border"><i class="material-icons left">trending_down</i>
              <span v-if="current === 'all'">Najniższe wynagrodzenie w zespołe</span>
              <span v-else>Najniższe wynagrodzenie w komórce</span>:</h6>
            <ul class="info-wrapper">
              <li> Całkowity Koszt Pracodawcy (CKP): {{ min }} zł.</li>
              <li> Za godzinę (CKP): {{ minHour }} zł.</li>
            </ul>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import {styleTable} from "@/main";

export default {
  name: "detail",
  props: ['departmentInfo', 'departmentName', 'current'],
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
    all() {
      return this.departmentInfo.map(el => (el.salary)).reduce((arr, el) => (arr + el), 0).toFixed(2)
    }
  }
}
</script>

<style scoped lang="scss">
.department-wrapper {
  max-width: 100%;
  display: block;

  table {
    margin-bottom: 10px;

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
              color: $turquoise;
            }

            @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
              height: 28px;
              width: 28px;
              i {
                font-size: 1.4rem !important;
                line-height: 28px;
                padding-right: 0;
              }
            }
            @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
              height: 28px;
              width: 28px;
              i {
                font-size: 1.4rem !important;
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
            max-width: 380px;
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

      h3.border, h3.border span {
        font-size: 1.2rem;
        font-weight: 600;
        justify-content: center;
        color: $white;
        margin: 5px;

        i {
          font-size: 1.7rem;
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

    h6.border, h6.border span {
      color: $turquoise;
      font-size: 1rem;
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
        font-size: .9rem;
        margin-top: 7px;

      }
    }
  }

  .info-wrapper {
    display: block;
    margin: 15px 5px 15px 25px;

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

.department-wrapper.sections_class {
  table {
    thead {
      tr {
        th {
          background-color: $backgroundTurquoise;

          .button-right {
            i {
              color: $backgroundTurquoise;
            }
          }
        }
      }
    }

    h3.border, h6.border {
      text-transform: uppercase;
      font-weight: 600;

      i {
        border: 1px solid $backgroundTurquoise;
        background-color: $backgroundTurquoise;
      }
    }

    h6.border, h6.border span {
      color: $backgroundTurquoise;
    }
  }
}
</style>
