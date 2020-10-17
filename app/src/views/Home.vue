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
                <form>
                <div class="input-field" >
                    <span class="btn btn-file">
                           Dodaj tabele Exele<input type="file" @change="onFileChanged">
                    </span>
                </div>
                <button class="btn waves-effect waves-light " type="submit">
                    Wyślij dodane dane
                    <i class="material-icons right">send</i>
                </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data: () => ({
            loading: false
        })
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
