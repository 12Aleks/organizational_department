<template>
  <div class="contet-wrapper">
    <div class="row-wrapper">
      <div class="row img_attachment">
        <div class="col s12 m12">
            <xlsx-convercion></xlsx-convercion>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import xlsxConvercion from "../components/conversion/xlsxConvercion";

export default {
  name: "Home",
  metaInfo() {
    return {
      title: this.$titleApp('Import danych')
    }
  },
  components: {
    xlsxConvercion
  }
}
</script>

<style scoped lang="scss">
.contet-wrapper {
  height: 100%;
  .img_attachment {
    height: calc(100vh - 110px);
    height: -webkit-calc(100vh - 110px);
    @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
      height: calc(100vh - 100px);
      height: -webkit-calc(100vh - 100px);
    }
    @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi){
      height: calc(100vh - 100px);
      height: -webkit-calc(100vh - 100px);
    }
  }
}
</style>
