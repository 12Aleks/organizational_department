<template>
  <div>
    <div class="app-page">
      <div>
        <div class="row img_attachment">
          <Loader v-if="loader"/>
          <div v-else class="col s12 m12 l12">
          </div>
          <detail :departmentInfo='departmentInfo' :departmentName="departmentName"/>
          <div class="col s12 m12 box-wrappers">
            <p>{{ process }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import detail from "@/components/department/detail";

export default {
  name: "Department",
  data: () => ({
    loader: true,
    departmentName: null,
    departmentInfo: []
  }),
  components: {detail},
  async mounted() {
    this.departmentName = this.$route.params.id.toUpperCase();
    this.departmentInfo = await this.$store.dispatch('departmentName',this.departmentName)
    this.loader = false
  },
  computed: {
    process() {
      const all = this.departmentInfo.reduce((acc, n) => ((acc[n.process] = acc[n.process] || []).push(n), acc), {});
      return Object.keys(all)
    }
  },
}
</script>

<style scoped lang="scss">
.img_attachment {
  height: calc(100vh - 122px);
  height: -webkit-calc(100vh - 122px);
  background: #ffffff;
  div.title-wrapper {
    max-width: 215px;
    display: block;
    margin: 0 auto;
  }
}

</style>
