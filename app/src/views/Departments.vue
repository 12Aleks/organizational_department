<template>
  <div>
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3>Zespoły</h3>
        </div>
        <div class="row img_attachment">
          <div class="col s12 m12 l12">
            <div class="tabordion">
              <section v-for="(value, name, index) in process" :key="value.index" :id="name">
                <input type="radio" name="sections" :id="`${name}-${index}`" checked>
                <label :for="`${name}-${index}`" class="grey lighten-2 z-depth-1">{{ name }}</label>
                <article class="z-depth-1">
                  <h5>Proces: {{ name }}</h5>
                  <ul class="collapsible" ref="accord">
                    <li v-for="(department, index) in $options.filters.departmentsFilter(value)" :key="index">
                      <Sections :value="department"/>
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
import M from "materialize-css";
import Sections from "@/views/Sections";

export default {
  name: "Departments",
  data: () => ({
    loader: false,
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.receiveData).length) {
      await this.$store.dispatch('receiveData');
    }
  },
  components: {
    Sections
  },
  computed: {
    workersInfo() {
      this.loader = true;
      return this.$store.getters.receiveData;
    },
    process() {
      const process = this.workersInfo.reduce((acc, n) => ((acc[n.process] = acc[n.process] || []).push(n), acc), {});
      this.loader = false;
      return process;
    }
  }
}
</script>

<style scoped lang="scss">
$lightgrey: rgba(220, 231, 235, 0.5);
$black: rgba(48, 69, 92, 1);
$white: rgba(254, 255, 250, 1);
$blue: #26a69a;
$red: rgba(255, 104, 115, 1);
.img_attachment {
  background-image: url("../assets/images/terma_0.png");
  position: relative;
}

.tabordion {
  position: relative;
  width: 80%;
  color: $black;
  margin: 0;

  section {
    display: block;
    width: 100%;
    left: 0;

    h5 {
      padding-bottom: .6rem;
      border-bottom: solid 1px rgba(51, 51, 51, .12);
    }

    input[name="sections"] {
      left: -9999px;
      position: absolute;
      top: -9999px;

      &:checked + label {
        background: $white;
        color: $black;
      }

      &:checked ~ article {
        display: block;
      }
    }

    label {
      background: $lightgrey;
      border-bottom: 1px solid $blue;
      font-size: 0.9em;
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
      height: -webkit-calc(100vh - 245px);
      height: calc(100vh - 245px);
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
      label {
        background: $lightgrey;
        border-left: 1px solid $blue;
        padding: 0.6em 2.5%;
        width: 20%;
      }

      article {
        position: absolute;
        width: 77.5%;
        left: 22.5%
      }
    }
  }
}

</style>
