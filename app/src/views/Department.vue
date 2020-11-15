<template>
  <div>
    <div class="app-page">
      <div>
        <div class="row img_attachment">
          <div class="col s12 m12">
            <ul class="tabs" ref="tabs">
              <li class="tab col s3"><a class="active" href="#tabFirst">Informacja o zespole</a></li>
              <li class="tab col s3"><a href="#tabSecond">Wykres słupkowy</a></li>
            </ul>
          </div>
          <Loader v-if="loader"/>
          <div v-show="!loader" id="tabFirst" class="col s12">
             <detail :departmentInfo='departmentInfo' :departmentName="departmentName"/>
             <process :process="process" />
          </div>
          <div id="tabSecond" class="col s12">
             <department-charts  :departmentName='departmentName'/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import M from 'materialize-css'
import departmentCharts from "@/components/Charts/departmentCharts";
import detail from "@/components/department/Detail";
import process from "@/components/department/Process"

export default {
  name: "Department",
  data: () => ({
    loader: true,
    departmentName: null,
    instance: null,
    departmentInfo: []
  }),
  components: {
    detail, process, departmentCharts
  },
  async mounted() {
    this.instance = M.Tabs.init(this.$refs.tabs);
    this.departmentName = this.$route.params.id.toUpperCase();
    this.departmentInfo = await this.$store.dispatch('departmentName', this.departmentName)
    this.loader = false
  },
  computed: {
    process() {
      return this.departmentInfo.reduce((acc, n) => ((acc[n.process] = acc[n.process] || []).push(n), acc), {});
    }
  },
  destroyed() {
    if (this.instance && this.instance.destroy) {
      this.instance.destroy()
    }
  }
}
</script>

<style scoped lang="scss">

.img_attachment {
  height: calc(100vh - 122px);
  height: -webkit-calc(100vh - 122px);
  background: #ffffff;
}

</style>
