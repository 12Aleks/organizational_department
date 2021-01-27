<template>
  <div class="row img_attachment">
    <div class="col s12 m12">
      <ul class="tabs" ref="tabs">
        <li class="tab col s4"><a class="active" href="#tabFirst">Informacja o zespole</a></li>
        <li class="tab col s4"><a href="#tabthird">Wykres kołowy aktualnych wynagrodzeń</a></li>
        <li class="tab col s4"><a href="#tabSecond">Wykres słupkowy (wszystkie parametry)</a></li>
      </ul>
    </div>
    <Loader v-if="loader"/>
    <div v-show="!loader" id="tabFirst" class="col s12" :class="{quantitySections: !quantity }">
      <detail :departmentInfo='selectedElement' :departmentName="departmentName" :current="current"/>
      <div class="section button_wrapper" v-if="quantity" :class="{sections_class: current !== 'all'}">
        <select class="browser-default z-depth-1" ref="select" v-model="current" >
          <option value="all">Wszystkie komorki</option>
          <option v-for="(c, index) of process"
                  :key="index"
                  :value="c"
                  :class="{newWorkerClass:  (newWorkerInSections.length > 0? newWorkerInSections.includes(c) : false)}">
            {{ c }}</option>
        </select>
      </div>
      <process :process="selectedElement" :current="current"/>
    </div>
    <div id="tabSecond" class="col s12">
      <departmentBarChart :newWorkerInSections="newWorkerInSections" :departmentInfo="departmentInfo" />
    </div>
    <div id="tabthird" class="col s12">
      <departmentDoughnutChart :departmentInfo="departmentInfo" :newWorkerInSections="newWorkerInSections" />
    </div>
  </div>
</template>
<script>
import M from 'materialize-css'
import detail from "@/components/department/Detail";
import process from "@/components/department/Process";
import departmentBarChart from "@/components/Charts/departmentBarChart";
import departmentDoughnutChart from "@/components/Charts/departmentDoughnutChart";


export default {
  name: "Department",
  data: () => ({
    loader: true,
    departmentName: null,
    instance: null,
    select: null,
    current: 'all',
    selectProcess: null,
    departmentInfo: [],
    selectedElement: []
  }),
  metaInfo() {
    return {
      title: this.$titleApp('Zespoł')
    }
  },
  components: {
    detail, process, departmentBarChart, departmentDoughnutChart
  },
  async mounted() {
    this.instance = M.Tabs.init(this.$refs.tabs);
    this.departmentName = this.$route.params.id.toUpperCase();
    this.selectProcess = this.$route.params.process.toUpperCase();
    this.departmentInfo = this.selectedElement = await this.$store.dispatch('selectedProcessAndDepartment', {departmentName: this.departmentName, selectProcessName: this.selectProcess })
    this.loader = false
  },
  watch: {
    current(selected) {
      let renameSelected = selected === 'INNE'? '(puste)' : selected;
      const result = Object.values(this.departmentInfo).reduce((acc, n) => ((acc[n.sections] = acc[n.sections] || []).push(n), acc), {})
      if (renameSelected !== 'all') {
        let selectedSection = Object.keys(result).filter(key => key === renameSelected ).reduce((obj, key) => {
          obj[key] = result[key];
          return obj;
        }, {});
        this.selectedElement = selectedSection[renameSelected];
      } else {
        this.selectedElement = this.departmentInfo
      }
    }
  },
  computed: {
    quantity(){
      return this.process.length > 1? true : 0
    },
    newWorkerInSections(){
      return Object.keys(this.departmentInfo.filter((item, i, arr) => arr[i].final_salary !== 0 && arr[i].final_per_hour !== 0 || arr[i].salary_HR !== 0 && arr[i].per_hour_HR !== 0).reduce((acc, n) => ((acc[n.sections] = acc[n.sections] || []).push(n.sections), acc), {})).map(key => key === '(puste)'? 'INNE' : key)
    },
    process() {
      return Object.keys(Object.values(this.departmentInfo).reduce((acc, n) => ((acc[n.sections] = acc[n.sections] || []).push(n), acc), {})).map(key => key === '(puste)'? 'INNE' : key).sort((d1, d2) => d1.toUpperCase() > d2.toUpperCase() ? 1 : -1)
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
  height: calc(100vh - 111px);
  height: -webkit-calc(100vh - 111px);
  background: $white;
  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    height: calc(100vh - 98px);
    height: -webkit-calc(100vh - 98px);
  }
  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi){
    height: calc(100vh - 98px);
    height: -webkit-calc(100vh - 98px);
  }
}
.section{
  height: 40px;
  background-color: $blue_grey_darken-2;
  padding: 5px 0;
  margin-bottom: 10px;
  select {
    height: 30px;
    max-width: 400px;
    text-transform: uppercase;
    color: $grey;
    font-size: 14px;
    padding: 4px;
    margin-left: 15px;
    background-color: #fff;
  }
}
.section.sections_class{
  background-color: $blue_grey_darken-2;
}
</style>
