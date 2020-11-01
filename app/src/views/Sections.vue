<template>
  <div>
    <p>Zespol: {{value[0]}} </p>
    <ul>
      <li v-for="(section) in $options.filters.sectionsFilter(value)" :key="section">
        {{ section }}
      </li>
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
  props: ['value']
}
</script>

<style scoped>

</style>