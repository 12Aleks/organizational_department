<template>
  <div>
    <div class="page-title">
      <h3>Zespoły</h3>
    </div>
    <div class="row img_attachment">
      <Loader v-if="loader"/>
      <div v-else class="col s12 m12 l12 ">
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
      return this.proc.filter((item, i, arr) => arr[i].final_salary !== 0 && arr[i].final_per_hour !== 0 || arr[i].salary_worker !== 0 && arr[i].per_hour_worker !== 0  ).reduce((acc, n) => ((acc[n.process] = acc[n.process] || []).push(n.department), acc), {})
    },
    process() {
      return this.proc.reduce((acc, n) => ((acc[n.process] = acc[n.process] || []).push(n), acc), {});
    }
  }
}
</script>

<style scoped lang="scss">
.img_attachment {
  background-image: url("../assets/images/terma_0.png");
  position: relative;
}

</style>
