<template>
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3 class="flow-text">Lista pracowników</h3>
        </div>
        <div class="row img_attachment">
          <Loader v-if="loader"/>
          <div v-show="!loader" class="col s12 m12">
            <div class="search-wrapper">
              <i class="material-icons">search</i><input id="search" type="text" v-model="selectWorker" placeholder="Wyszukiwanie po imieniu i nazwisku">
            </div>
            <div class="table-wrapper z-depth-1">
              <table class="highlight">
                <thead>
                <tr>
                  <th style="width: 50px; background-color: #26a69a; color: #fff">&#8470</th>
                  <th :class="{active: sortParam==='name' && selectWorker==='', toggle: toggle}"
                      @click="sort('name'); selectWorker = ''"
                  >Nazwisko i Imię
                  </th>
                  <th :class="{active: sortParam==='process' && selectWorker==='', toggle: toggle}"
                      @click="sort('process'); selectWorker = ''"
                  >Proces
                  </th>
                  <th :class="{active: sortParam==='department' && selectWorker==='', toggle: toggle}"
                      @click="sort('department'); selectWorker = '' "
                  >Zespół
                  </th>
                  <th :class="{active: sortParam==='sections'&& selectWorker==='', toggle: toggle}"
                      @click="sort('sections'); selectWorker = ''"
                  >Komórka
                  </th>
                  <th :class="{active: sortParam==='salary'&& selectWorker === '', toggle: toggle}"
                      @click="sort('salary'); selectWorker = '' "
                  >Aktualne wynagrodzenie <br/><span>CKP / za godzinę</span>
                  </th>
                </tr>
                </thead>
                <tbody id="table" v-for="(value, index) in sortedList" :key="index" :class="{newWorker: value.final_salary}">
                <tr :class="{decision: value.decision.toUpperCase() === 'NIE'}">
                  <td style="width: 50px">{{ index + 1 }}</td>
                  <td><router-link :to="`/${value.process.toLowerCase()}/${value.sections === '(puste)' && value.department === '(puste)' ? value.process.toLowerCase() :
          value.department.toLowerCase()}/${value.name.toLowerCase()}`">{{ value.name }}</router-link></td>
                  <td><router-link :to="`/departments`">{{ value.process }}</router-link></td>
                  <td @click="processName(value.process)">
                    <router-link :to="`/${value.process.toLowerCase()}/${value.sections === '(puste)' && value.department === '(puste)' ? value.process.toLowerCase() :
                          value.department.toLowerCase()}`">{{
                        value.sections === '(puste)' && value.department === '(puste)' ? value.process :
                            value.department
                      }}
                    </router-link>
                  </td>
                  <td>{{ value.sections !== '(puste)' ? value.sections : '(puste)' }}</td>
                  <td>{{ value.salary }} zł / {{ value.per_hour }} zł/h</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: "WorkerLists",
  metaInfo(){
    return{
      title: this.$titleApp('Lista pracowników')
    }
  },
  data() {
    return {
      selectWorker: '',
      toggle: false,
      sortParam: '',
      loader: true,
      workersInfo: [],
      defaultWorkersInfo: []
    }
  },
  async mounted() {
    this.workersInfo = this.defaultWorkersInfo  = await this.$store.dispatch('receiveData');
    this.loader = false;
  },
  methods:{
    processName(value){
      this.$store.dispatch('processName', value)
    },
    sort(value) {
      this.sortParam = value;
      this.toggle = !this.toggle
    }
  },
  computed: {
    sortedList() {
      if (this.sortParam === 'name' && !this.selectWorker.length) {
        let name = this.workersInfo.sort((d1, d2) => d1.name.toLowerCase().localeCompare(d2.name.toLowerCase()));
        return this.toggle ? name : name.reverse()
      } else if (this.sortParam === 'process' && !this.selectWorker.length) {
        let process =  this.workersInfo.sort((d1, d2) => d1.process.toLowerCase().localeCompare(d2.process.toLowerCase()));
        return this.toggle ? process : process.reverse()
      } else if (this.sortParam === 'department' && !this.selectWorker.length) {
        let department = this.workersInfo.sort((d1, d2) => d1.department.toLowerCase().localeCompare(d2.department.toLowerCase()));
        return this.toggle ? department  : department .reverse()
      } else if (this.sortParam === 'sections' && !this.selectWorker.length) {
        let sections = this.workersInfo.sort((d1, d2) => d1.sections.toLowerCase().localeCompare(d2.sections.toLowerCase()))
        return this.toggle ? sections : sections.reverse()
      } else if (this.sortParam === 'salary' && !this.selectWorker.length) {
        let salary = this.workersInfo.sort((d1, d2) => d1.salary > d2.salary ? 1 : -1);
        return this.toggle ? salary : salary.reverse()
      } else if (this.selectWorker.length) {
        let selectWorker = this.selectWorker.toUpperCase();
        return this.defaultWorkersInfo.filter(function (elem) {
          if (selectWorker === ' ') return true;
          else return elem.name.indexOf(selectWorker) > -1;
        })
      } else {
        return this.workersInfo;
      }
    }
  }
}
</script>

<style scoped lang="scss">
$red: rgba(255, 104, 115, 1);
.search-wrapper{
  color: #777;
  margin-top: -1px;
  position: relative;
  -webkit-transition: margin .25s ease;
  transition: margin .25s ease;
  input[type='text']{
    margin-bottom: 15px;
    border-bottom: 1px solid $red;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    text-transform: uppercase;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    text-transform: uppercase;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    text-transform: uppercase;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    text-transform: uppercase;
  }
  ::placeholder { /* Recent browsers */
    text-transform: uppercase;
  }
  i{
    position: absolute;
    top: 15px;
    right: 10px;
    cursor: pointer;
  }
}
.table-wrapper {
  height: -webkit-calc(100vh - 276px);
  height: calc(100vh - 276px);
  table {
    table-layout: fixed;
  }
}

</style>
