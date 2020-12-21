<template>
  <div class="app-page">
    <div>
      <div class="page-title">
        <h3 class="flow-text">Karta pracownika</h3>
      </div>
      <div class="row img_attachment">
        <Loader v-if="loader"/>
        <div v-show="!loader" class="col s12 m12">
          <div class="profile-header z-depth-1"
               :class="{'newWorker_profile-header': worker.final_salary || worker.salary_HR, decision: worker.decision.toUpperCase() === 'NIE'} ">
            <div class="profile-img">
              <img src="../assets/images/profile.jpg" width="200" alt="Profile Image">
            </div>
            <div class="profile-nav-info">
              <h3 class="user-name">{{ worker.name }}</h3>
              <div class="address">
                <p class="worker_process"><router-link :to="`/${selectProcess.toLowerCase()}` + `/` +`${departmentName.toLowerCase()}`">ZESPÓŁ: {{ worker.department }} </router-link></p>
                <p class="worker_position" v-if="worker.position && worker.position !== 'data not found'">STANOWISKO: {{ worker.position }}</p>
              </div>
            </div>
          </div>
          <div ref="firstTable" class="table-wrapper z-depth-1">
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
                <td>{{ worker.decision.toUpperCase() }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div ref="secondTable" class="table-wrapper secondTable z-depth-1"
               v-if="worker.final_salary || worker.salary_HR || worker.decision.toUpperCase() === 'NIE'">
            <table>
              <thead>
              <tr>
                <th colspan="5">Opinia o pracowniku i rezultaty jego działań</th>
              </tr>
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
  methods: {
    // myEventHandler() {
    //   this.theight  =  (this.$refs.secondTable.clientHeight - this.$refs.firstTable.clientHeight)
    // }
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
$turquoise: #26a69a;
$backgroundDarkRed: #B10303;
$darkPurple: #0d47a1;
.profile-header.decision{
  background-color: $darkPurple;
}
.profile-header {
  background-color: $turquoise;
  background-image: url("../assets/images/technical.png");
  background-repeat: no-repeat;
  background-size: 50%;
  background-position-y: center;
  background-position-x: right;
  width: 100%;
  display: flex;
  height: 170px;
  position: relative;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
  border-radius: 2px;

  .profile-img {
    float: left;
    width: 273px;
    height: 200px;

    img {
      border-radius: 50%;
      height: 175px;
      width: 175px;
      border: 5px solid #fff;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
      position: absolute;
      left: 50px;
      top: 15px;
      z-index: 5;
      background: #fff;
    }
  }
}

.newWorker_profile-header {
  background-color: $backgroundDarkRed;
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
  padding-top: 55px;
}

.profile-nav-info h3 {
  font-variant: small-caps;
  font-size: 2rem;
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

//@media (max-width: 1100px) {
//  .profile-side {
//    width: 250px;
//    padding: 90px 15px 20px;
//  }
//
//  .profile-img img {
//    height: 200px;
//    width: 200px;
//    left: 50px;
//    top: 50px;
//  }
//}
//
//@media (max-width: 900px) {
//  .profile-header {
//    display: flex;
//    height: 100%;
//    flex-direction: column;
//    text-align: center;
//    padding-bottom: 20px;
//  }
//
//  .profile-img {
//    float: left;
//    width: 100%;
//    height: 200px;
//  }
//
//  .profile-img img {
//    position: relative;
//    height: 200px;
//    width: 200px;
//    left: 0;
//  }
//
//  .profile-nav-info {
//    text-align: center;
//  }
//
//  .profile-option {
//    right: 20px;
//    top: 75%;
//    transform: translateY(50%);
//  }
//
//
//  .profile-side {
//    width: 100%;
//    text-align: center;
//    padding: 20px;
//    margin: 5px 0;
//  }
//
//  .profile-nav-info .address {
//    justify-content: center;
//  }
//
//  .user-rating {
//    justify-content: center;
//  }
//}
//
//@media (max-width: 400px) {
//  .profile-header h3 {
//  }
//
//  .profile-option {
//    width: 30px;
//    height: 30px;
//    position: absolute;
//    right: 15px;
//    top: 83%;
//  }
//
//  .profile-option .notification .alert-message {
//    top: -3px;
//    right: -4px;
//    padding: 4px;
//    height: 15px;
//    width: 15px;
//    font-size: 0.7rem;
//  }
//
//  .profile-nav-info h3 {
//    font-size: 1.9rem;
//  }
//
//  .profile-nav-info .address p,
//  .profile-nav-info .address span {
//    font-size: 0.7rem;
//  }
//}
.table-wrapper {
  margin-top: 2px;
  height: 100%;

  table th {
    background-color: #26a69a;
    font-size: .8rem;

    &:before, &:after {
      content: none;
    }
  }
}

.secondTable {
  margin-top: 10px;
  height: -webkit-calc(100vh - 537px);
  height: calc(100vh - 537px);
}

//.button_wrapper {
//  overflow: hidden;
//  position: relative;
//  width: 258px;
//  margin-left: auto;

//  .button {
//    background-color: #4db6ac;
//    position: absolute;
//    right: 0;
//    top: 0;
//    width: 100px;
//    height: 100px;
//    display: block;
//    padding: 10px 30px;
//    box-sizing: border-box;
//    border-radius: 50%;
//    //float: left;
//    //border-bottom-left-radius: 12px;
//    //-webkit-border-bottom-left-radius: 12px;
//    cursor: pointer;
//    //-webkit-filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, .7));
//    //filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, .7));
//    //z-index: 1;
//
//    a {
//      color: #fff;
//      font-size: 14px;
//      text-transform: uppercase;
//      text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
//    }
//
//    &:before {
//      content: "";
//      width: 24px;
//      height: 24px;
//      position: absolute;
//      border-radius: 50%;
//      pointer-events: none;
//      right: 241px;
//      top: -4px;
//      border-top: 4px solid #4db6ac;
//      border-right: 4px solid transparent;
//      border-left: 4px solid transparent;
//      border-bottom: 4px solid transparent;
//      -webkit-transform: rotate(45deg);
//      -moz-transform: rotate(45deg);
//      -o-transform: rotate(45deg);
//      transform: rotate(45deg);
//    }
//  }
//
//  .button, .button:before {
//    -webkit-transition: 0s;
//    transition: 0s;
//  }
//
//  .button:hover {
//    background-color: #00897b;
//
//    a {
//      color: #fff;
//      text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
//    }
//  }
//
//  .button:hover:before {
//    border-top: 4px solid #00897b;
//  }
//}
//
//.button_wrapper {
//  .button.return {
//    background-color: #f44336;
//
//    &:before {
//      border-top: 4px solid #f44336;
//    }
//  }
//}

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
    height: -webkit-calc(100vh - 442px);
    height: calc(100vh - 442px);
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
    height: -webkit-calc(100vh - 442px);
    height: calc(100vh - 442px);
  }
}
</style>
