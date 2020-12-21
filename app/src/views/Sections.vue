<template>
  <ul class="collapsible z-depth-1" ref="accord">
    <li>
      <div class="collapsible-header grey lighten-3">
        <div @click.stop="departmentPath">
          <i class="large material-icons left">people_outline</i>
          <h6>Zespół: {{ value[0] }}</h6>
          <i class="material-icons right" v-if="newWorkerInDepartment"  v-tooltipe="`Nowy pracownik - zespół ${value[0]}`">fiber_new</i>
        </div>
        <i class="tiny material-icons" v-if="$options.filters.sectionsFilter(value).length > 0">play_circle_outline</i>
      </div>
      <div class="collapsible-body" :class="{passive: $options.filters.sectionsFilter(value).length <= 0 }">
        <ul>
          <li v-for="section in $options.filters.sectionsFilter(value)" :key="section">
        <span> {{
            section === '(puste)' || section === undefined ? ($options.filters.sectionsFilter(value).length >= 0 ? value[0] : null) : `Komórka: ${section}`
          }}
        </span>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import M from "materialize-css";

export default {
  name: "Sections",
  data() {
    return {
      sections: null,
      dis: null,
      instance: null
    }
  },
  props: ['value', 'name', 'proc', 'newWorkersInProcess'],
  async mounted() {
    this.instance = await M.Collapsible.init(this.$refs.accord);
  },
  computed: {
    newWorkerInDepartment() {
      let departments = Object.keys(this.newWorkersInProcess).filter(key => key === this.name).reduce((obj, key) => ( obj[key] = this.newWorkersInProcess[key], obj[key] ), {});
      return departments.length > 0? departments.includes(this.value[0]): false
      }
  },
  methods: {
    async departmentPath() {
      this.$router.push('/'+ this.name.toLowerCase() +'/' + this.value[0].toLowerCase())
    }
  },
  beforeDestroy() {
    if (this.instance && this.instance.destroy) {
      this.instance.destroy()
    }
  }
}
</script>

<style scoped lang="scss">
.collapsible {
  margin-top: 0;
  margin-bottom: 0;

  .active .collapsible-header {
    i.tiny {
      transform: rotate(-90deg);
      -webkit-transform: rotate(-90deg);
      -moz-transform: rotate(-90deg);
      -o-transform: rotate(-90deg);;
    }
  }

  .collapsible-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      width: 80%;
      display: inline-flex;
      align-items: center;

      h6 {
        margin: .5rem 0;
        font-size: 1rem;
        @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
          font-size: .95rem;
        }
      }
    }

    padding: 0.3rem 1rem;

    i.tiny {
      font-size: 1.4rem !important;
      transform: rotate(90deg);
      -webkit-transform: rotate(90deg);
      -moz-transform: rotate(90deg);
      -o-transform: rotate(90deg);;
    }
  }

  .collapsible-body {
    padding: 1rem 2rem;

    li {
      span {
        font-size: .9rem;
        @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
          font-size: .85rem;
        }
      }
    }

  }

  .collapsible-body.passive {
    border-bottom: 0 !important;
    padding: 0 !important;
  }
}
</style>
