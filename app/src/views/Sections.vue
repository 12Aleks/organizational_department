<template>
  <ul class="collapsible" ref="accord">
    <li>
      <div class="collapsible-header"><div><i class="large material-icons right">people_outline</i><h6>Zespol:
        {{ value[0] }}</h6></div><i class="tiny material-icons" v-if="$options.filters.sectionsFilter(value).length > 0">arrow_drop_down_circle</i></div>
      <div class="collapsible-body" :class="{passive: $options.filters.sectionsFilter(value).length <= 0 }">
        <ul>
          <li v-for="section in $options.filters.sectionsFilter(value)" :key="section">
        <span> {{
            section === '(puste)' || section === undefined ? ($options.filters.sectionsFilter(value).length >= 0 ? value[0] : null) : `Komórka: ${section}`
          }}</span>
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
      dis: null
    }
  },
  props: ['value'],
  mounted() {
    this.instance = M.Collapsible.init(this.$refs.accord);
  },
  beforeDestroy() {
    if (this.instance && this.instance.destroy()) {
      this.instance.destroy()
    }
  }
}
</script>

<style scoped lang="scss">
.collapsible {
  margin-top: 0;
  margin-bottom: 0;
  .collapsible-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    div{
      width: 80%;
      display: inline-flex;
      align-items: center;
      h6{
        margin: .5rem 0;
      }
    }
    padding: 0.6rem 1rem;
    i.tiny{
      font-size: 1.5rem !important;
    }
  }
  .collapsible-body {
    padding: 1rem 2rem;
  }
  .collapsible-body.passive {
    border-bottom: 0 !important;
    padding: 0 !important;
  }
}
</style>