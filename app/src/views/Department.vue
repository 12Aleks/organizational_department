<template>
  <div>
    <div class="app-page">
      <div>
        <div class="row img_attachment">
          <Loader v-if="loader"/>

          <detail :departmentInfo='departmentInfo' :departmentName="departmentName"/>
          <process :process="process"></process>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import detail from "@/components/department/Detail";
import process from "@/components/department/Process"

export default {
  name: "Department",
  data: () => ({
    loader: true,
    departmentName: null,
    departmentInfo: []
  }),
  components: {detail, process},
  async mounted() {
    this.departmentName = this.$route.params.id.toUpperCase();
    this.departmentInfo = await this.$store.dispatch('departmentName',this.departmentName)
    this.loader = false
  },
  computed: {
    process() {
      const all = this.departmentInfo.reduce((acc, n) => ((acc[n.process] = acc[n.process] || []).push(n), acc), {});
      return all
    }
  },
}
</script>

<style scoped lang="scss">

.img_attachment {
  height: calc(100vh - 122px);
  height: -webkit-calc(100vh - 122px);
  background: #ffffff;

}

</style>
