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
  padding: 2rem;
  .img_attachment {
    height: calc(100vh - 145px);
    height: -webkit-calc(100vh - 145px);
  }
}
</style>
