<template>
  <div>
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3>Zespoły</h3>
        </div>
        <div class="row img_attachment">
          <Loader v-if="loader"/>
          <div v-else class="col s12 m12 l12">
            <div class="tabordion">
              <section v-for="(value, name, index) in process" :key="value.index" :id="name">
                <input type="radio" name="sections" :id="`${name}-${index}`" :checked="index === 0">
                <label :for="`${name}-${index}`"
                       class="z-depth-1">
                       <i class="material-icons right"
                          v-if=" worker.includes(name)"
                          ref="tool"
                          v-tooltipe="`Nowy pracownik - proces ${name}`"
                       >fiber_new</i>{{
                    name
                  }}</label>
                <article class="z-depth-1">
                  <h5>Proces: {{ name }}</h5>
                  <ul class="collapsible" ref="accord">
                    <li v-for="(department, index) in $options.filters.departmentsFilter(value)" :key="index">
                      <Sections :value="department" :name="name" :proc="proc" :newWorkersInProcess="newWorkersInProcess"/>
                    </li>
                  </ul>
                </article>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sections from "@/views/Sections";

export default {
  name: "Departments",
  metaInfo() {
    return {
      title: this.$titleApp('Zespoły')
    }
  },
  data: () => ({
    loader: true,
    proc: [],
    instances: null,
    options: 'New worker'
  }),
  async mounted() {
    this.proc = await this.$store.dispatch('receiveData');
    this.loader = false;
  },
  components: {
    Sections
  },
  computed: {
    worker(){
      return Object.keys(this.newWorkersInProcess)
    },
    newWorkersInProcess() {
      return this.proc.filter((item, i, arr) => arr[i].final_salary !== 0 && arr[i].final_per_hour !== 0).reduce((acc, n) => ((acc[n.process] = acc[n.process] || []).push(n.department), acc), {})
      },
    process() {
      return this.proc.reduce((acc, n) => ((acc[n.process] = acc[n.process] || []).push(n), acc), {});
    }
  }
}
</script>

<style scoped lang="scss">
$turquoise: #26a69a;
$black: rgba(48, 69, 92, 1);
$white: rgba(254, 255, 250, 1);
$blue: rgb(81, 110, 133);
$red: rgba(255, 104, 115, 1);
.img_attachment {
  background-image: url("../assets/images/terma_0.png");
  position: relative;
}

.tabordion {
  position: relative;
  width: 100%;
  color: $black;
  margin: 0;

  section {
    display: block;
    width: 100%;
    left: 0;

    h5 {
      padding-bottom: .6rem;
      border-bottom: solid 1px rgba(51, 51, 51, .12);
      margin-bottom: 1.5rem;
    }

    input[name="sections"] {
      left: -9999px;
      position: absolute;
      top: -9999px;

      &:checked + label {
        background: $white;
        color: $turquoise;
      }

      &:checked ~ article {
        display: block;
      }
    }

    label {
      background: $turquoise;
      border-bottom: 1px solid $blue;
      font-size: .85rem;
      font-weight: 400;
      color: $white;
      cursor: pointer;
      display: block;
      padding: 1em 0.83em;
      position: relative;
      width: 100%;
      z-index: 100;
    }

    article {
      display: none;
      left: 0;
      width: 100%;
      padding: 2em;
      position: relative;
      top: 0;
      background: white;
      font-weight: 300;
      line-height: 1.7;
      max-height: -webkit-calc(100vh - 216px);
      max-height: calc(100vh - 216px);
      overflow: auto;

      p {
        margin-bottom: 1em;
      }

      &:after {
        background-color: transparent;
        bottom: 0;
        content: "";
        display: block;
        left: -229px;
        position: absolute;
        top: 0;
        width: 220px;
        z-index: 1;
      }
    }
  }
}


@media all and (min-width: 768px) {
  .tabordion {
    width: 100%;
    color: $black;
    section {
      h5 {
        @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
          font-size: 1.2rem;
        }
        @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi){
          font-size: 1.2rem;
        }
        margin-bottom: 1.2rem;
      }

      label {
        background: $turquoise;
        border-left: 1px solid $blue;
        padding: 0.6em 2.5%;
        font-size: 0.9rem;
        width: 20%;
        @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
          width: 24%;
          padding: 0.35em 2.5%;
          font-size: .85rem;
          i {
            font-size: 1.2rem;
          }
        }
        @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi){
          width: 24%;
          padding: 0.35em 2.5%;
          font-size: .85rem;
          i {
            font-size: 1.2rem;
          }
        }
      }

      article {
        position: absolute;
        width: 77.5%;
        left: 22.5%;
        @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
          width: 74%;
          left: 26%;
          padding: 1rem 1.5rem;
        }
        @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi){
          width: 74%;
          left: 26%;
          padding: 1rem 1.5rem;
        }
      }
    }
  }
}

</style>
