<template>
    <div class="contet-wrapper">
        <div class="page-title">
            <h3>Import i export danych w formacie xlsx</h3>
            <Loader v-if='loading'></Loader>
            <button class="btn waves-effect waves-light btn-small">
                <i class="material-icons">refresh</i>
            </button>
        </div>
        <div class="row-wrapper">
        <div class="row img_attachment">
            <div class="col s12 m12">
                <div class="page-subtitle">
                    <h4>Dodaj tabele Exele z danymi</h4>
                </div>
                <div>
                 <xlsx-convercion></xlsx-convercion>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>

    import xlsxConvercion from "../components/conversion/xlsxConvercion";
    export default {
        name: "Home",
        data: () => ({
            loading: false
        }),
        components: {
            xlsxConvercion
        }
    }
</script>

<style scoped>
    .contet-wrapper {
        height: 100%;
        padding: 2rem;
    }
    .img_attachment{
        height:-webkit-calc(100vh - 250px);
        height:calc(100vh - 250px);
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
