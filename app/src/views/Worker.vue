<template>
  <div>
    <div class="page-title">
      <h3 class="flow-text">Karta pracownika</h3>
    </div>
    <div class="row img_attachment">
      <Loader v-if="loader"/>
      <div v-show="!loader" class="col s12 m3 l3 xl2 first_wrapper">
        <div class="profile-header">
          <div class="profile-img">
            <div class="photo">
              <img src="../assets/images/worker_default.jpeg"  alt="Profile Image" v-show="photo === null" class="personPhoto">
              <img :src="photo"  alt="Profile Image" v-show="photo !== null" class="personPhoto">
            </div>
          </div>
          <div class="profile-nav-info">
            <h3 class="user-name">{{ worker.name }}</h3>
            <div class="address">
              <p class="worker_process">
                <router-link
                    :to="`/${selectProcess.toLowerCase()}` + `/` +  `${departmentName.toLowerCase()}`">
                  {{ worker.department }}
                </router-link> <span v-if="worker.sections && worker.sections !== '(puste)'">- {{worker.sections}}</span>
              </p>
              <div class="profile-header "
                   :class="{'newWorker_profile-header': worker.final_salary || worker.salary_HR, decision: worker.decision.toUpperCase() === 'NIE', doubt: !worker.final_salary && worker.decision.toUpperCase() !== 'NIE' && worker.decision !== 'data not found'} "></div>
              <p class="worker_position" v-if="worker.position && worker.position !== 'data not found'">
                Stanowisko: {{ worker.position }}</p>
            </div>
            <a class="btn-small button-link z-depth-0" :href="`${worker.link}`">Tabela oceny</a>
            <router-link class="btn-small button-link-department z-depth-0" :to="`/${worker.process.toLowerCase()}/${worker.sections === '(puste)' && worker.department === '(puste)' ? worker.process.toLowerCase() :
                          worker.department.toLowerCase()}`">Powrót do zespołu</router-link>
          </div>
        </div>
        <form class="form" @submit.prevent="onUpload">
          <div class="input-field">
                    <span class="btn btn-small btn-file z-depth-0">
                           Wybierz zdjęcie<input type="file" @change="onFileChanged">
                    </span>
          </div>
          <button class="btn btn-small z-depth-0" type="submit" :disabled="photoSrc == null">Zaktualizuj dane</button>
        </form>
      </div>
      <div v-show="!loader" class="col s12 m9 l9 xl10 second_wrapper">
        <div ref="firstTable" class="table-wrapper firstTable">
          <table>
            <thead>
            <tr>
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
              <th v-if="worker.final_salary || worker.salary_HR || worker.decision.toUpperCase() === 'NIE'">
                Kontynuacja zatrudnienia TAK/NIE
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <!--              <td><router-link :to="`/departments`">{{ worker.process }}</router-link></td>-->
              <!--              <td>{{ worker.sections }}</td>-->
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
              <td v-if="worker.final_salary || worker.salary_HR || worker.decision.toUpperCase() === 'NIE'">
                {{ worker.decision.toUpperCase() }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div ref="secondTable" class="table-wrapper secondTable"
             v-if="worker.final_salary || worker.salary_HR || worker.decision.toUpperCase() === 'NIE'">
          <table>
            <thead>
            <tr>
              <th>Projekty/rezutaty działań Pracownika (konkretnie przykłady)</th>
              <th>DKZ w trakcie / do podjęcia Pracownika</th>
              <th>Uzasadnienie propozycji Zespołu Personalnego</th>
              <th>Komentarz do fotografi czasu pracy)</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ worker.worker_project_opinion }}</td>
              <td>{{ worker.worker_dkz_opinion }}</td>
              <td>{{ worker.worker_hr_offer }}</td>
              <td>{{ worker.worker_comments }}</td>
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
      theight: null,
      photo: null,
      photoSrc: null,
      abbreviatedData: '',
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

    this.photo = await this.$store.dispatch('receiveWorkerData', {
      workerName: this.workerName,
      departmentName: this.departmentName,
      selectProcess: this.selectProcess
    } )
    this.loader = false
  },
  methods: {
    onFileChanged(event) {
      this.photoSrc = event.target.files[0]
    },
    async onUpload() {
      try {
        this.photo = null;
        this.abbreviatedData = this.workerName.slice(0,4).toLowerCase() + '_' + this.departmentName.slice(0,3).toLowerCase() + '_' + this.selectProcess.slice(0,3).toLowerCase();
        const updateData = {
          photo: this.photoSrc,
          abbreviatedData: this.abbreviatedData
        };
        this.photo = await this.$store.dispatch('workerPhoto', updateData);
        this.photoSrc = null;
        this.$message('Success');
      } catch (e) {
      }
    }
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
.img_attachment {
  @include flex();
  @include flex-direction(row);
  -webkit-align-content: stretch;
  align-content: stretch;
}

.first_wrapper {
  background-color: $blue_grey_darken-2;
  position: relative;
  padding-bottom: 15px;
  @include flex();
  @include flex-direction(column);
  @include justify-content(space-between);
  span.btn-small {
    width: 100%;
    background-color: $grey;
    transition: all .7s;
    letter-spacing: 1px;

    &:hover {
      transition: all .7s;
      background-color: $terma-color;
    }
  }

  .profile-header {
    position: relative;
    .profile-img {
      width: 100%;
      height: 200px;
      position: relative;
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
        height: 150px;
      }
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi){
        height: 150px;
      }

      img.personPhoto{
        width: 100%;
        height: auto;
        margin: 0 auto;
        display: block;
      }
      .photo {
        border-radius: 50%;
        height: 150px;
        width: 150px;
        border: 2px solid #fff;
        overflow: hidden;
        background-color: #fefefe;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        z-index: 5;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
        @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
          height: 100px;
          width: 100px;
        }

        @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
          height: 100px;
          width: 100px;
        }
      }
    }
    .button-link{
      margin: 15px 0 7px;
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
        margin: 7px 0 3px;
      }
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi){
        margin: 7px 0 3px;
      }
    }
    .button-link-department{
      margin: 8px 0 15px;
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
        margin: 3px 0 7px;
      }
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi){
        margin: 3px 0 7px;
      }
    }
    .button-link, .button-link-department {
      background-color: $white;
      transition: all .7s;
      letter-spacing: 1px;
      color: $grey;
      &:hover {
        transition: all .7s;
        color: $white;
        background-color: $terma-color;
      }
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
        font-size: 12px;
      }
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi){
        font-size: 12px;
      }
    }

    .profile-nav-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      h3.user-name {
        color: #fff;
        font-variant: small-caps;
        font-size: 1rem;
        letter-spacing: 1px;
        text-align: center;
        font-family: sans-serif;
        font-weight: bold;
        margin: 10px 0;
      }
      p.worker_process, p.worker_position {
        font-size: 14px;
        letter-spacing: 1px;
        text-align: center;
        a {
          color: $white;
        }
        @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
          font-size: 12px;
          margin: 10px 0;
        }
        @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi){
          font-size: 12px;
          margin: 10px 0;
        }
      }

      .address {
        color: #f9f6f6;
      }
    }
  }

  form{
    .btn-file {
      position: relative;
      overflow: hidden;
    }

    button {
      width: 100%;
      background-color: $grey;
      transition: all .7s;
      letter-spacing: 1px;

      &:hover {
        transition: all .7s;
        background-color: $terma-color;
      }
    }
    .input-field{
      margin: 1rem 0;
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
        margin: 7px 0 6px;
      }
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi){
        margin: 7px 0 6px;
      }

    }
    .btn-file input[type=file] {
      position: absolute;
      top: 0;
      right: 0;
      min-width: 100%;
      min-height: 100%;
      font-size: 100px;
      text-align: right;
      filter: alpha(opacity=0);
      opacity: 0;
      outline: none;
      background: white;
      cursor: inherit;
      display: block;
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
        font-size: 12px;
      }
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi){
        font-size: 12px;
      }
    }
  }

}

.second_wrapper {
  height: auto;
  overflow: auto;

  .table-wrapper {
    margin-top: 2px;

    table th {
      width: auto;
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
        padding: 15px 5px;
      }
      @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi){
        padding: 15px 5px;
      }
        &:after, &:before{
          content: none;
        }
        &:hover {
          background-color: $blue_grey_darken-3;
          transition: background-color .5s;
      }
    }
  }

  .firstTable {
    height: auto;
  }

  .secondTable {
    overflow: initial;
    height: calc(100vh - 335px);
    height: -webkit-calc(100vh - 335px);
    @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
      height: calc(100vh - 284px);
      height: -webkit-calc(100vh - 284px)
    }
    @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi){
      height: calc(100vh - 284px);
      height: -webkit-calc(100vh - 284px);
    }

    table {
      tbody {
        tr {
          td {
            padding: 8px;
            vertical-align: top;
            text-align: left;
            line-height: 1.1rem;
            @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
              line-height: .9rem;
            }
            @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi){
              line-height: .9rem;
            }
          }
        }
      }
    }
  }
}
</style>
