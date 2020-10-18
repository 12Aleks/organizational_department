<template>
    <div>
        <section>
            <span class="btn btn-file">
                  Dodaj plik<input type="file" @change="onChange">
           <i class="material-icons right">cloud_upload</i>
           </span>
            <xlsx-read :file="file">
                <xlsx-json @parsed="parsed" >
                </xlsx-json>
            </xlsx-read>
        </section>
    </div>
</template>

<script>
    import { XlsxRead, XlsxJson } from "vue-xlsx/dist/vue-xlsx.es.js"
    export default {
        name: "xlsxConvercion",
        data: () => ({
            file: null,
           collection: null
        }),
        components:{
            XlsxRead, XlsxJson
        },
        methods:{
            onChange(event) {
                this.file = event.target.files ? event.target.files[0] : null;
            },
            parsed(collectionData){
                this.collection = collectionData
                console.log(this.collection)
            }
        }
    }
</script>

<style scoped lang="scss">
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