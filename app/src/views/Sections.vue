<template>
  <div>
    <ul>
      <li v-for="(d, index) in $options.filters.sectionsFilter(department)" :key="index">{{ d }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Sections",
  data(){
    return{
       sections: null
    }
  },
  props: ['department']
}
</script>

<style scoped>

</style>