<template>
  <div>
    <section>
      <information :infoForUser="infoForUser"/>
      <div>
        <div v-if="load && !collection" class="importButton">
          <div class="page-subtitle">
            <h4>Dodaj tabele Exele z danymi</h4>
          </div>
          <span class="btn btn-file ">
                      Dodaj plik<input type="file" @change="onChange">
                      <i class="material-icons right">cloud_upload</i>
                    </span>
        </div>
        <xlsx-read :file="file">
          <template #default="{loading}">
            <Loader v-if="loading && !load"/>
            <xlsx-json  v-if="!loading && !load" @parsed="jsonData">
            </xlsx-json>
          </template>
        </xlsx-read>
      </div>
    </section>
  </div>
</template>

<script>
import {XlsxRead, XlsxJson} from "vue-xlsx/dist/vue-xlsx.es.js"

export default {
  name: "xlsxConvercionRecrument",
  data() {
    return {
      file: null,
      collection: null,
      load: true,
      loading: false,
      infoForUser: 'Kliknij przycisk "Dodaj plik", wybierz żądany plik w formacie xlsx i dodaj go do aplikacji'
    }
  },
  components: {
    XlsxRead, XlsxJson
  },
  methods: {
    onChange(event) {
      this.load = false;
      this.loading = true;
      this.file = event.target.files ? event.target.files[0] : null;
      this.infoForUser = 'Wybierz potrzebną zakładkę w oknie wyboru i kliknij przycisk "Dodaj potrzebną zakładkę tabeli"';
    },
    jsonData(collectionData) {
      this.collection = collectionData;

      const col = this.collection.reduce((acc, n) => ((acc[n['Zespół']] = acc[n['Zespół']] || []).push(Object.keys(n)), acc), {})
      console.log(col)
      this.loading = false;
    },
    async receiveData() {
      try {
        const list = [];
        const keys = [];
        const result = (Object.values(this.collection).map(el => Object.keys(el).length)).reduce((result, number) => number % 2 === 0 && number > result ? number : result);
        for (let i = 0; i < result; i++) {
          await keys.push(`__EMPTY_${i}`)
        }
        const newArr = Object.values(this.collection).map(n => Object.fromEntries(Object.values(n).map((m, i) => [keys[i], m])));
        console.log(newArr)

      } catch (e) {
      }
    }
  }
}
</script>

<style scoped lang="scss">
.submit-wrapper {
  display: -ms-inline-flexbox;
  display: -webkit-inline-flex;
  display: inline-flex;
}


button.btn.waves-effect.waves-light {
  margin-top: 15px;
}

.importButton {
  h4 {
    @media(min-width: 1199.98px) {
      margin-bottom: 2rem;
    }
  }

  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);

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
    height: 44px;
  }
}

section {
  position: relative;
  height: -webkit-calc(100vh - 342px);
  height: calc(100vh - 342px);
}

.input-field.select-wrapper {
  label {
    margin-left: 10px;
  }

  option:disabled {
    color: #000;
    font-weight: bold;
  }

  .browser-default {
    max-width: 400px;
    border: 1px solid #26a69a;
    border-radius: 3px;
  }
}

.table-wrapper {
  overflow: auto;
  height: -webkit-calc(100vh - 368px);
  height: calc(100vh - 368px);
  border: 1px solid #90a4ae;
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