<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
  import EmptyLayout from '@/layouts/EmptyLayout'
  import MainLayout from '@/layouts/MainLayout'

  export default {
    name: 'App',
    computed: {
      layout() {
        return (this.$route.meta.layout || 'empty') + '-layout'
      }
    },
    components: {
      EmptyLayout,
      MainLayout
    }
  }
</script>

<style lang="scss">
  @import '~materialize-css/dist/css/materialize.min.css';
  @import 'assets/styles/index.css';
  $turquoise:  #26a69a;
  $black: rgba(48, 69, 92, 1);
  $white: rgba(254, 255, 250, 1);
  $blue: #57758c94;
  $red: rgba(255, 104, 115, 1);
  .app-content {
    height: 100vh;
    .app-page {
      height: 100%;
    }
  }
  .table-wrapper {
    overflow: auto;
    height: -webkit-calc(100vh - 315px);
    height: calc(100vh - 315px);
    table {
      table-layout: fixed;
      th.active{
        background-color: $white;
        border: 1px solid $blue ;
        color: $blue;
      }
      th{
        background-color: $blue;
        color: $white;
        text-align: center;
      }
      .highlight>tbody>tr:hover {
        background-color: $blue;
      }
    }
  }

</style>
