<template>
    <div>
        <div class="page-title">
            <h3>Счет</h3>
            <Loader v-if='loading'></Loader>
            <button class="btn waves-effect waves-light btn-small">
                <i class="material-icons">refresh</i>
            </button>
        </div>
        <div class="row img_attachment">
            <div class="col s12 m12">
                <div class="page-subtitle">
                    <h4>Dodaj tabele Exele z danymi pracownikow</h4>
                </div>
                <div>
                    <b>Import Excel File:</b>
                    <div>
                        <input type="file" class="fileSelect" @change='fileChange($event)' />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data: () => ({
            loading: false
        }),
        methods:{
            fileChange (e) {
                    const fileDom = e.target || e.srcElement;
                    const excelIO = new Excel.IO();

                    excelIO.open(fileDom.files[0], (_data_) => {
                        const newSalesData = extractSheetData(data);
                         console.log(newSalesData);
                    });

            }
        }
    }
</script>

<style scoped>
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
