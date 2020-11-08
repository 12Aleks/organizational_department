<template>
  <div>
    <div class="app-page">
      <div>
        <div class="row img_attachment">
          <Loader v-if="loader"/>
          <div v-else class="col s12 m12 l12">
            <div>
              <h3 class="flow-text center">ZESPÓŁ : {{ departmentName }}</h3>
            </div>
          </div>
          <div class="col s12 m8">
            <p>{{ question }}</p>
          </div>
          <div class="col s12 m4">
            <p>Liczba osób w zespole: {{question.length}}</p>

            <p>Najwyższe wynagrodzenie w zespole (CKP): </p>
            <p>Za godzine (CKP):</p>

            <p>Najniższe wynagrodzenie w zespole (CKP):</p>
            <p>Za godzine (CKP):</p>

            <p>Przeciętne wynagrodzenie w zespole (CKP):</p>
            <p>Za godzine (CKP):</p>
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
    departmentName: null,
    question: []
  }),
  async mounted() {
    const departmentName = this.$route.params.id;
    this.question = await this.$store.dispatch('departmentName', departmentName)
    this.departmentName = departmentName.toUpperCase();
    this.loader = false
  },
  computed: {
    process() {
      return this.$store.getters.department
    }
  },
}
</script>

<style scoped lang="scss">
.img_attachment {
  height: calc(100vh - 122px);
  height: -webkit-calc(100vh - 122px);

  div.title-wrapper {
    max-width: 215px;
    display: block;
    margin: 0 auto;
  }
}

</style>
