<template>
  <div>
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3>{{id}}</h3>
        </div>
        <div class="row img_attachment">
          <Loader v-if="loader"/>
          <div v-else class="col s12 m12 l12">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Department",
  data: () => ({
    loader: true,
    id: null
  }),
  async mounted() {
    this.id = this.$route.params.id;
    const deparment = this.$store.dispatch('')
    this.loader = false
  }
}
</script>

<style scoped>

</style>
