<template>
  <ul class="collapsible" ref="accord">
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

