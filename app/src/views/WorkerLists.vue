<template>
    <div class="app-page">
      <div>
        <div class="page-title">
          <h3 class="flow-text">Lista pracowników</h3>
        </div>
        <div class="row img_attachment">
          <Loader v-if="loader"/>
          <div v-show="!loader" class="col s12 m12">
            <input type="text" v-model="selectWorker" placeholder="Wyszukiwanie po imieniu i nazwisku">
            <div class="table-wrapper z-depth-1">
              <table class="highlight">
                <thead>
                <tr>
                  <th style="width: 50px; background-color: #26a69a; color: #fff">&#8470</th>
                  <th :class="{active: sortParam==='name' && selectWorker==='', toggle: toggle}"
                      @click="sort('name'); selectWorker = ''"
                  >Nawisko i Imię
                  </th>
                  <th :class="{active: sortParam==='process' && selectWorker==='', toggle: toggle}"
                      @click="sort('process'); selectWorker = ''"
                  >Process
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
                  <th :class="{active: sortParam==='final_salary'&& selectWorker==='', toggle: toggle}"
                      @click="sort('final_salary'); selectWorker = ''"
                  >Uzgodnione z Pracownikiem <br/><span>CKP / za godzinę</span>
                  </th>
                </tr>
                </thead>
                <tbody id="table" v-for="(value, index) in sortedList" :key="index">
                <tr>
                  <td style="width: 50px">{{ index + 1 }}</td>
                  <td>{{ value.name }}</td>
                  <td>{{ value.process }}</td>
                  <td @click="processName(value.process)">
                    <router-link :to="`/${value.process.toLowerCase()}/${value.sections === '(puste)' && value.department === '(puste)' ? value.process.toLowerCase() :
                          value.department.toLowerCase()}`">{{
                        value.sections === '(puste)' && value.department === '(puste)' ? value.process :
                            value.department
                      }}
                    </router-link>
                  </td>
                  <td>{{ value.sections !== '(puste)' ? value.sections : '(puste)' }}</td>
                  <td>{{ value.salary }}zł / {{ value.per_hour }}zł/god.</td>
                  <td>{{ value.final_salary }}zł / {{ value.final_per_hour }}zł/god.</td>
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
    const defaultWorkersInfo = await this.$store.dispatch('receiveData');
    this.defaultWorkersInfo = defaultWorkersInfo;
    this.workersInfo = defaultWorkersInfo;
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
        let name = this.workersInfo.sort((d1, d2) => d1.name.toLowerCase() > d2.name.toLowerCase() ? 1 : -1);
        return this.toggle ? name : name.reverse()
      } else if (this.sortParam === 'process' && !this.selectWorker.length) {
        let process =  this.workersInfo.sort((d1, d2) => d1.process.toLowerCase() > d2.process.toLowerCase() ? 1 : -1);
        return this.toggle ? process : process.reverse()
      } else if (this.sortParam === 'department' && !this.selectWorker.length) {
        let department = this.workersInfo.sort((d1, d2) => d1.department.toLowerCase() > d2.department.toLowerCase() ? 1 : -1);
        return this.toggle ? department  : department .reverse()
      } else if (this.sortParam === 'sections' && !this.selectWorker.length) {
        let sections = this.workersInfo.sort((d1, d2) => d1.sections.toLowerCase() > d2.sections.toLowerCase() ? 1 : -1);
        return this.toggle ? sections : sections.reverse()
      } else if (this.sortParam === 'salary' && !this.selectWorker.length) {
        let salary = this.workersInfo.sort((d1, d2) => d1.salary > d2.salary ? 1 : -1);
        return this.toggle ? salary : salary.reverse()
      } else if (this.sortParam === 'final_salary' && !this.selectWorker.length) {
        let final_salary = this.workersInfo.sort((d1, d2) => d1.final_salary > d2.final_salary ? 1 : -1);
        return this.toggle ? final_salary : final_salary.reverse()
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
.table-wrapper {
  height: -webkit-calc(100vh - 276px);
  height: calc(100vh - 276px);
}
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
table {
  table-layout: fixed;
}
</style>
