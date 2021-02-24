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
         height: 100%;
         @include flex();
         @include justify-content(center);
         @include align-items(center);
         .button {
             font-weight: 300;
             color: #fff;
             font-size: 1.2em;
             text-decoration: none;
             border: 1px solid #efefef;
             padding: 0.5em;
             border-radius: 3px;
             margin: 0 auto;
             max-width: 205px;
             display: block;
             position: relative;
             transition: all 0.3s linear;
             &:hover {
                 background-color: $grey_darken_2;
                 border: 1px solid  $grey_darken_2;
                 transition: all 0.3s linear;
                 color: #fff;
             }
         }
         p, h1{
             text-align: center;
             font-weight: 100;
             color: $grey_darken_3;
             text-shadow: 0 0 1px #d1d0d2;
         }
         p {
             font-size: 2em;
             @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
                 font-size: 1.2em;
             }
             @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
                 font-size: 1.2em;
             }
         }

         h1 {
             font-size: 15em;
             line-height: 100%;
             margin-top: 0;
             @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
                 font-size: 10em;
             }
             @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
                 font-size: 10em;
             }
         }

     }
</style>