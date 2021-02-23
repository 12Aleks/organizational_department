<template>
    <div class="row notFound">
        <div class="col s12 m12">
            <h1>404</h1>
            <p>Ups… Coś poszło nie tak.</p>
            <router-link class="button" to="/"><i class="icon-home"></i> Wróć do strony głównej.</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NotFound"
    }
</script>

<style scoped lang="scss">
     .notFound{
         position: relative;
     }
    .button {
        font-weight: 300;
        color: #fff;
        font-size: 1.2em;
        text-decoration: none;
        border: 1px solid #efefef;
        padding: .5em;
        border-radius: 3px;
        float: left;
        margin: 0 auto;
        display: block;
        position: relative;
        transition: all .3s linear;
    }

    .button:hover {
        background-color: #007aff;
        color: #fff;
    }

    p {
        font-size: 2em;
        text-align: center;
        font-weight: 100;
    }

    h1 {
        text-align: center;
        font-size: 15em;
        font-weight: 100;
    }
</style>