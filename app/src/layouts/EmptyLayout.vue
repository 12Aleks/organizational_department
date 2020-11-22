
<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>

<script>
  import information from "../message/information";
  export default {
    computed: {
      error() {
        return this.$store.getters.error
      }
    },
    watch: {
        error(fbError){
          this.$error(information[fbError.code] || 'Coś poszło nie tak' )
        }
    }
  }
</script>
