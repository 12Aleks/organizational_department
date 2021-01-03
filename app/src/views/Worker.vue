<template>
    <div>
      <div class="page-title">
        <h3 class="flow-text">Karta pracownika</h3>
      </div>
      <div class="row img_attachment">
        <Loader v-if="loader"/>
        <div v-show="!loader" class="col s12 m9 l9 second_wrapper">
          <div class="profile-header z-depth-1">
            <div class="profile-img">
              <img src="../assets/images/profile.jpg" width="200" alt="Profile Image">
            </div>
            <div class="profile-nav-info">
              <h3 class="user-name">{{ worker.name }}</h3>
              <div class="address">
                <p class="worker_process"><router-link :to="`/${selectProcess.toLowerCase()}` + `/` + <div class="profile-header z-depth-1"
                  :class="{'newWorker_profile-header': worker.final_salary || worker.salary_HR, decision: worker.decision.toUpperCase() === 'NIE', doubt: !worker.final_salary && worker.decision.toUpperCase() !== 'NIE' && worker.decision !== 'data not found'} ">`${departmentName.toLowerCase()}`">ZESPÓŁ: {{ worker.department }} </router-link></p>
                <p class="worker_position" v-if="worker.position && worker.position !== 'data not found'">STANOWISKO: {{ worker.position }}</p>
              </div>
            </div>
          </div>
          <div ref="firstTable" class="table-wrapper firstTable z-depth-1">
            <table>
              <thead>
              <tr>
                <th>Proces</th>
                <th>Komórka</th>
                <th>Aktualne wynagrodzenie <br><span>CKP / za godzinę</span></th>
                <th v-if="worker.final_salary || worker.salary_HR">Propozycja
                  pracownika<br/><span>CKP / za godzinę</span>
                </th>
                <th v-if="worker.final_salary || worker.salary_HR">Propozycja zespołu
                  pracownika<br/><span>CKP / za godzinę</span></th>
                <th v-if="worker.final_salary || worker.salary_HR">Propozycja zespołu
                  personalnego<br/><span>CKP / za godzinę</span></th>
                <th v-if="worker.final_salary || worker.salary_HR">Uzgodnione z Pracownikiem
                  <br><span>CKP / za godzinę</span>
                </th>
                <th v-if="worker.final_salary || worker.salary_HR || worker.decision.toUpperCase() === 'NIE'" >
                  Kontynuacja zatrudnienia TAK/NIE
                </th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><router-link :to="`/departments`">{{ worker.process }}</router-link></td>
                <td>{{ worker.sections }}</td>
                <td>{{ worker.salary }}zł / {{ worker.per_hour }}zł/h</td>
                <td v-if="worker.final_salary || worker.salary_HR">{{ worker.salary_worker }}zł / {{
                    worker.per_hour_worker
                  }}zł/h
                </td>
                <td v-if="worker.final_salary || worker.salary_HR">{{ worker.salary_department }}zł / {{
                    worker.per_hour_department
                  }}zł/h
                </td>
                <td v-if="worker.final_salary || worker.salary_HR">{{ worker.salary_HR }}zł / {{
                    worker.per_hour_HR
                  }}zł/h
                </td>
                <td v-if="worker.final_salary || worker.salary_HR">{{ worker.final_salary }}zł / {{
                    worker.final_per_hour
                  }}zł/h
                </td>
                <td v-if="worker.final_salary || worker.salary_HR || worker.decision.toUpperCase() === 'NIE'">{{ worker.decision.toUpperCase() }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div ref="secondTable" class="table-wrapper secondTable z-depth-1"
               v-if="worker.final_salary || worker.salary_HR || worker.decision.toUpperCase() === 'NIE'">
            <table>
              <thead>
              <tr>
                <th>Projekty/rezutaty działań Pracownika (konkretnie przykłady)</th>
                <th>DKZ w trakcie / do podjęcia Pracownika</th>
                <th>Uzasadnienie propozycji Zespołu Personalnego</th>
                <th>Komentarz do fotografi czasu pracy)</th>
                <th>Link do tabeli oceny</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{{ worker.worker_project_opinion }}</td>
                <td>{{ worker.worker_dkz_opinion }}</td>
                <td>{{ worker.worker_hr_offer }}</td>
                <td>{{ worker.worker_comments }}</td>
                <td><a :href="`${worker.link}`">LINK</a></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "Worker",
  data() {
    return {
      loader: true,
      departmentName: null,
      selectProcess: null,
      workerName: null,
      departmentInfo: [],
      selectedElement: [],
      isMounted: false,
      theight: null
    }
  },
  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  async mounted() {
    this.departmentName = this.$route.params.id.toUpperCase();
    this.selectProcess = this.$route.params.process.toUpperCase();
    this.workerName = this.$route.params.name.toUpperCase();
    this.departmentInfo = this.selectedElement = await this.$store.dispatch('selectedProcessAndDepartment', {
      departmentName: this.departmentName,
      selectProcessName: this.selectProcess
    });
    this.loader = false
  },
  computed: {
    worker() {
      return this.departmentInfo.filter((item, i, arr) => arr[i].name === this.workerName)[0]
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
}
</script>

<style scoped lang="scss">

$backgroundDarkRed: #B10303;
$darkPurple: #1976d2;
$orange: #ffb74d ;
.profile-header.decision{
  background-color: $backgroundDarkRed;
}
.profile-header.doubt{
  background-color: $orange;
}

.img_attachment{
  display:flex;
  display: -webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  -webkit-align-content: stretch;
  align-content: stretch;
}
.first_wrapper{

}
.second_wrapper{
  margin-top: 10px;
  height: -webkit-calc(100vh - 552px);
  height: calc(100vh - 552px);
}
.profile-header {
  background-color: $turquoise;
  position: relative;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
  border-radius: 2px;

  .profile-img {
    float: left;
    width: 220px;
    height: 152px;

    img {
      border-radius: 50%;
      height: 120px;
      width: 120px;
      border: 2px solid #fff;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
      position: absolute;
      left: 50px;
      top: 16px;
      z-index: 5;
      background: #fff;
    }
  }
}

.newWorker_profile-header {
  background-color: $darkPurple;
}


h3.user-name {
  margin: 0;
  color: #fff;
}

.profile-nav-info {
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 45px;
}

.profile-nav-info h3 {
  font-variant: small-caps;
  font-size: 1.8rem;
  font-family: sans-serif;
  font-weight: bold;
}

p.worker_process {
  margin-bottom: 3px;
  a{
    color: #ffffff;
  }
}

p.worker_position {
  margin-top: 3px;
}

.profile-nav-info .address {
  //display: flex;
  font-weight: bold;
  color: #f9f6f6;
  font-style: italic;
}

.profile-nav-info .address p {
  margin-right: 5px;
}

.table-wrapper {
  margin-top: 2px;

  table th {
    background-color: #26a69a;
    font-size: .8rem;

    &:before, &:after {
      content: none;
    }
  }
}
.firstTable{
  height: auto;
}
.secondTable {
  margin-top: 10px;
  flex-grow: 1;
  height: auto;
}
@media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
  .profile-header {
    height: 115px;
    .profile-img {
      float: left;
      width: 205px;
      height: 115px;

      img {
        height: 110px;
        width: 110px;
        border: 2px solid #fff;
        left: 50px;
        top: 25px;
      }
    }
    h3.user-name {
      font-size: 1.5rem;
      color: #fff;
    }
    .profile-nav-info {
      padding-top: 27px;
    }
  }
  .secondTable[data-v-06627738] {
    height: -webkit-calc(100vh - 465px);
    height: calc(100vh - 465px);
  }
}
@media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
  .profile-header {
    height: 115px;
    .profile-img {
      float: left;
      width: 205px;
      height: 115px;

      img {
        height: 110px;
        width: 110px;
        border: 2px solid #fff;
        left: 50px;
        top: 25px;
      }
    }
    h3.user-name {
      font-size: 1.5rem;
      color: #fff;
    }
    .profile-nav-info {
      padding-top: 27px;
    }
  }
  .secondTable[data-v-06627738] {
    height: -webkit-calc(100vh - 465px);
    height: calc(100vh - 465px);
  }
}
</style>
