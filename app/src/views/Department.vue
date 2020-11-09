<template>
  <div>
    <div class="app-page">
      <div>
        <div class="row img_attachment">
          <Loader v-if="loader"/>
          <div v-else class="col s12 m12 l12">
            <h3 class="flow-text center">ZESPÓŁ: {{ departmentName }}</h3>
          </div>
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
$red: rgba(255, 104, 115, 1);
.img_attachment {
  height: calc(100vh - 122px);
  height: -webkit-calc(100vh - 122px);
  background: #ffffff;
  h3 {
    color: $red;
    margin-bottom: 25px;
  }
  div.title-wrapper {
    max-width: 215px;
    display: block;
    margin: 0 auto;
  }
}

</style>
