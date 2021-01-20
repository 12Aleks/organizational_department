<template>
  <div>
    <section v-if="load" class="second">
      <h6>Jak dodać plik XLSX do aplikacji?</h6>
      <ol>
        <li>Przygotuj plik lub zakładkę w pliku Excel w potrzebnym formacie <a :href="`${publicPath}file/przyklad.xlsx`"  download>(przyklad potrzebnego pliku)</a></li>
        <li>Upewnij się, że plik nie przekracza rozmiaru 5MB</li>
        <li>Przeciągnij i upuść przygotowany plik, lub kliknij pole i wybierz go aby przekonwertować go i dodać na serwer</li>
        <li>Po dodaniu pliku wybierz z rozwijanej listy potrzebną zakładkę</li>
      </ol>
    </section>
    <section class="first">
      <div>
        <div v-if="load && !collection" class="importButton">
          <div id="app">
            <div v-if="!file">
              <div class="dropZone">
                <div class="dropZone-info" @drag="onChange">
                  <span class="fa fa-cloud-upload dropZone-title"></span>
                  <span class="dropZone-title">Przeciągnij i upuść dokument programu Microsoft Excel (XLSX), aby przekonwertować go i dodać na serwer</span><br>
                  <span class="dropZone-title">lub kliknij pole i wybierz potrzebny plik.</span>
                  <div class="dropZone-upload-limit-info">
                    <div>obsługa rozszerzeń: xlsx</div>
                    <div>maksymalny rozmiar pliku: 5 MB</div>
                  </div>
                </div>
                <input type="file" @change="onChange">
              </div>
            </div>
            <div v-else class="dropZone-uploaded">
              <div class="dropZone-uploaded-info">
                <span class="dropZone-title">Uploaded</span>
                <span class="btn btn-file">Dodaj plik
                   <input type="file" @change="onChange">
                   <i class="material-icons right">cloud_upload</i>
                </span>
              </div>
            </div>
          </div>

        </div>
        <xlsx-read :file="file">
          <template #default="{loading}">
            <Loader v-if="loading && !load"/>
            <xlsx-sheets v-show="!loading && !load">
              <template #default="{sheets}" ref="details">
                <div class="submit-wrapper">
                  <div class="input-field select-wrapper">
                    <select v-model="selectedSheet" class="browser-default">
                      <option v-for="sheet in sheets" :key="sheet" :value="sheet">
                        {{ sheet }}
                      </option>
                    </select>
                    <label v-if="selectedSheet === null">Wybierz potrzebną tabelę</label>
                  </div>
                  <button class=" btn tableSend" type="submit"
                          @click="receiveData">Dodaj potrzebną zakładkę tabeli
                    <i class="material-icons right">send</i>
                  </button>
                </div>
              </template>
            </xlsx-sheets>
            <div class="table-wrapper-conversion" v-show="!loading && !load">
              <h4>Wybierz z rozwijanej listy potrzebną zakładkę</h4>
              <xlsx-table :sheet="selectedSheet"/>
            </div>
            <xlsx-json :sheet="selectedSheet" v-if="!loading && !load" @parsed="jsonData">
            </xlsx-json>
          </template>
        </xlsx-read>
      </div>
    </section>
  </div>
</template>

<script>
import {XlsxRead, XlsxSheets, XlsxTable, XlsxJson} from "vue-xlsx/dist/vue-xlsx.es.js"
import Sections from "@/views/Sections";

export default {
  name: "xlsxConvercion",
  data() {
    return {
      file: null,
      publicPath: process.env.BASE_URL,
      collection: null,
      load: true,
      loading: false,
      selectedSheet: null,
      infoForUser: 'Kliknij przycisk "Dodaj plik", wybierz żądany plik w formacie xlsx i dodaj go do aplikacji'
    }
  },
  components: {
    Sections,
    XlsxRead, XlsxJson, XlsxTable, XlsxSheets
  },
  methods: {

    onChange(event) {
      this.load = false;
      this.loading = true;
      const file = event.target.files ? event.target.files[0] : null;
      if(file.size > 5000000){
        this.$message('Rozmiar pliku wjecej niz 5MB')
      }else{
        this.file = file
      }
      this.infoForUser = 'Wybierz potrzebną zakładkę w oknie wyboru i kliknij przycisk "Dodaj potrzebną zakładkę tabeli"';
    },
    jsonData(collectionData) {
      this.collection = collectionData;
      this.loading = false;
    },
    async receiveData() {
      try {
        const list = [];
        const keys = [];
        const result = (Object.values(this.collection).map(el => Object.keys(el).length)).reduce((result, number) => number % 2 === 0 && number > result ? number : result);
        for (let i = 0; i <= result; i++) {
          await keys.push(`__EMPTY_${i}`)
        }
        const newArr = Object.values(this.collection).map(n => Object.fromEntries(Object.values(n).map((m, i) => [keys[i], m])));
        const res = Object.values(newArr).filter(el => Object.keys(el).length > 8 && el['__EMPTY_0'] !== '(puste)' && typeof el['__EMPTY_3'] === 'string' && typeof el['__EMPTY_4'] === 'number');
        await  Object.keys(res).map((key) => {
          list.push({
            name: res[key]['__EMPTY_3'],
            department: res[key]['__EMPTY_1'] === undefined || res[key]['__EMPTY_1'] === '(puste)' || !res[key]['__EMPTY_1'].trim() ? res[key]['__EMPTY_0'] : res[key]['__EMPTY_1'],
            process: res[key]['__EMPTY_0'],
            sections: res[key]['__EMPTY_2'] === undefined || res[key]['__EMPTY_2'] === '(puste)' || !res[key]['__EMPTY_2'].trim() ? '(puste)' : res[key]['__EMPTY_2'],
            salary: res[key]['__EMPTY_4'] === undefined ? 'data not found' : Math.trunc(res[key]['__EMPTY_4']* 100)/100,
            per_hour: res[key]['__EMPTY_5'] === undefined ? 'data not found' : Math.trunc(res[key]['__EMPTY_5']* 100)/100,
            salary_worker: res[key]['__EMPTY_6'] === undefined ? 'data not found' : Math.trunc(res[key]['__EMPTY_6']* 100)/100,
            per_hour_worker: res[key]['__EMPTY_7'] === undefined ? 'data not found' : Math.trunc(res[key]['__EMPTY_7']* 100)/100,
            salary_department: res[key]['__EMPTY_8'] === undefined ? 'data not found' : Math.trunc(res[key]['__EMPTY_8']* 100)/100,
            per_hour_department: res[key]['__EMPTY_9'] === undefined ? 'data not found' : Math.trunc(res[key]['__EMPTY_9']* 100)/100,
            salary_HR: res[key]['__EMPTY_10'] === undefined ? 'data not found' : Math.trunc(res[key]['__EMPTY_10']* 100)/100,
            per_hour_HR: res[key]['__EMPTY_11'] === undefined ? 'data not found' : Math.trunc(res[key]['__EMPTY_11']* 100)/100,
            final_salary: res[key]['__EMPTY_12'] === undefined ? 'data not found' : Math.trunc(res[key]['__EMPTY_12']* 100)/100,
            final_per_hour: res[key]['__EMPTY_13'] === undefined ? 'data not found' : Math.trunc(res[key]['__EMPTY_13']* 100)/100,
            link: res[key]['__EMPTY_14'] === undefined || res[key]['__EMPTY_14'] === '(puste)' || !res[key]['__EMPTY_14'].trim() ? 'data not found': res[key]['__EMPTY_14'],
            worker_project_opinion: res[key]['__EMPTY_15'] === undefined || res[key]['__EMPTY_15'] === '(puste)' || !res[key]['__EMPTY_15'].trim()? 'data not found': res[key]['__EMPTY_15'],
            worker_dkz_opinion: res[key]['__EMPTY_16'] === undefined || res[key]['__EMPTY_16'] === '(puste)' || !res[key]['__EMPTY_16'].trim()? 'data not found': res[key]['__EMPTY_16'],
            worker_hr_offer: res[key]['__EMPTY_17'] === undefined || res[key]['__EMPTY_17'] === '(puste)' || !res[key]['__EMPTY_17'].trim()? 'data not found': res[key]['__EMPTY_17'],
            worker_comments:  res[key]['__EMPTY_18'] === undefined || res[key]['__EMPTY_18'] === '(puste)' || !res[key]['__EMPTY_18'].trim()? 'data not found': res[key]['__EMPTY_18'],
            position: res[key]['__EMPTY_19'] === undefined || res[key]['__EMPTY_19'] === '(puste)' || !res[key]['__EMPTY_19'].trim()? 'data not found': res[key]['__EMPTY_19'],
            decision: res[key]['__EMPTY_20'] === undefined || res[key]['__EMPTY_20'] === '(puste)' || !res[key]['__EMPTY_20'].trim()? 'data not found': res[key]['__EMPTY_20']
          });
        });
        const workers = await Object.values(list).filter((k) => k.name !== undefined && k.name !== '(puste)' && k.name != 0);
        await this.$store.dispatch('dataUsers', workers);
        this.$router.push(`/lists`)
      } catch (e) {
      }
    }
  }
}
</script>

<style scoped lang="scss">
$turquoise:  #26a69a;
$lightTurquoise: rgba(38, 166, 154, .4);
$black: rgba(48, 69, 92, 1);
$white: rgba(254, 255, 250, 1);
$blue: rgba(120, 151, 163, 0.98);
$light-blue:rgba(120, 151, 163, 0.5);
$red: rgba(255, 104, 115, 1);

.submit-wrapper {
  display: -ms-inline-flexbox;
  display: -webkit-inline-flex;
  display: inline-flex;
}


button.btn {
  margin-top: 15px;
  background-color: $blue_grey_darken-2;
  transition: all .7s;
  box-shadow: inherit;

  &:hover {
    transition: all .7s;
    background-color: $terma-color;
  }
}

.page-subtitle h4 {
  text-transform: uppercase;
  color: $turquoise;
  font-weight: 400;
}

.importButton {
  h4 {
    @media(min-width: 1199.98px) {
      margin-bottom: 2rem;
    }
  }
  span.btn.btn-file {
    @media(min-width: 1199.98px) {
      font-size: 18px;
      height: 46px;
      line-height: 46px;
    }
  }
}

.btn.tableSend {
  margin-left: 15px;
  height: 42px;
  @media(min-width: 1199.98px) {
    height: 45px;
  }
}

section.first, .dropZone {
  position: relative;
  height: -webkit-calc(100vh - 360px);
  height: calc(100vh - 360px);
  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    height: calc(100vh - 337px);
    height: -webkit-calc(100vh - 337px);
  }
  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi){
    height: calc(100vh - 337px);
    height: -webkit-calc(100vh - 337px);
  }
}
.dropZone {
  border: 2px dashed $light-blue;
  transition: 1s;
  &:hover {
    transition: 1s;
    border: 2px dashed #2e94c4;
    .dropZone-title {
      color: #1975A0;
    }
  }
  .dropZone-info {
    color: #A8A8A8;
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translate(0, -50%);
    text-align: center;
  }
  .dropZone-title {
    color: #787878;
  }
  input {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .dropZone-upload-limit-info {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }
}

section.second {
  position: relative;
  background-color: rgba(224,224,224,0.5);
  padding: 15px;
  margin: 0 0 15px;
  height: 100%;
  h6{
    margin-left: 27px;
    font-weight: 500;
    text-transform: uppercase;
  }
  ol{
    li{
      color: $black;
      margin-bottom: 3px;
      font-size: 1.1rem;
    }
  }
}

.input-field.select-wrapper {
  label {
    margin-left: 10px;
  }

  option:disabled {
    color: #000;
    font-weight: bold;
    padding: 5px;
  }

  .browser-default {
    max-width: 400px;
    width: 400px;
    border: 1px solid $blue_grey_darken-2;
    border-radius: 3px;
  }
}


.table-wrapper-conversion {
  overflow: auto;
  position: relative;
  height: -webkit-calc(100vh - 225px);
  height: calc(100vh - 225px);
  border: 1px solid #90a4ae;
  h4{
    position: absolute;
    color: $black;
    text-transform: uppercase;
    top: 49%;
    left: 50%;
    margin: 0 -50% 0 0;
    transform: translate(-50%, -50%);
    font-size: 1.4em;
    font-weight: 400;
    //text-shadow:
    //    0 1px 0 #ccc,
    //    0 2px 0 #c9c9c9,
    //    0 3px 0 #bbb,
    //    0 4px 0 #b9b9b9;

  }
}

.btn-file {
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  display: block;
  max-width: 175px;
}

button.btn.waves-effect.waves-light {
  margin-top: 15px;
}

.btn-file input[type=file] {
  position: absolute;
  height: 48px;
  width: 175px;
  top: 0;
  right: 0;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  background: white;
  cursor: inherit;
  display: block;
}
</style>

