<template>
    <div>
        <section>
            <span class="btn btn-file">
                  Dodaj plik<input type="file" @change="onChange">
           <i class="material-icons right">cloud_upload</i>
           </span>

            <xlsx-read :file="file" >
                <Loader v-if="loading" />
                <xlsx-sheets v-else>
                    <template #default="{sheets}" >
                        <div class="input-field select-wrapper" >
                            <select v-model="selectedSheet" class="browser-default z-depth-1">
                                <option v-for="sheet in sheets" :key="sheet" :value="sheet">
                                    {{ sheet }}
                                </option>
                            </select>
                            <label v-if="selectedSheet === null">Wybierz potrzebną tabelę</label>
                        </div>
                    </template>
                </xlsx-sheets>
                <div v-else class="table-wrapper">
                    <xlsx-table :sheet="selectedSheet"/>
                </div>
                <xlsx-json @parsed="jsonData">
                </xlsx-json>
            </xlsx-read>

        </section>
    </div>
</template>

<script>
    import {XlsxRead, XlsxJson, XlsxSheets, XlsxTable} from "vue-xlsx/dist/vue-xlsx.es.js"

    export default {
        name: "xlsxConvercion",
        data() {
            return{
                file: null,
                collection: null,
                loading: null,
                selectedSheet: null,
            }
        },

        components: {
            XlsxRead, XlsxJson, XlsxTable, XlsxSheets
        },
        methods: {
            onChange(event) {
                this.file = event.target.files ? event.target.files[0] : null;
            },
            jsonData(collectionData) {
                this.loading = true;
                this.collection = collectionData;
                this.loading = false;
                console.log(this.collection)
            }
        }
    }
</script>

<style scoped lang="scss">
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
        height:-webkit-calc(100vh - 470px);
        height:calc(100vh - 470px);
        border: 1px solid #90a4ae;
    }

    .btn-file {
        position: relative;
        overflow: hidden;
    }

    button.btn.waves-effect.waves-light {
        margin-top: 15px;
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
    }
</style>