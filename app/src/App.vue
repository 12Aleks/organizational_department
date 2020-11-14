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
$lightTurquoise: rgba(38, 166, 154, .4);
$black: rgba(48, 69, 92, 1);
$white: rgba(254, 255, 250, 1);
$blue: rgba(120, 151, 163, 0.98);
$light-blue:rgba(120, 151, 163, 0.5);
$red: rgba(255, 104, 115, 1);
.app-content {
  height: 100vh;
  .app-page {
    height: 100%;
  }
}
.table-wrapper {
  overflow: auto;
  height: -webkit-calc(100vh - 290px);
  height: calc(100vh - 290px);
  -webkit-box-shadow: inset 0 0 4px 0 $light-blue;
  box-shadow: inset 0 0 4px 0 $light-blue;
  table {
    table-layout: fixed;
    position: relative;
    th.active{
      background-color: $white;
      color: $turquoise;
      -webkit-box-shadow: inset 0 0 4px 0 $light-blue;
      box-shadow: inset 0 0 4px 0 $light-blue;
    }
    th.subtitle {
      background-color: #8f8a8a;
      td{
        font-weight: 600;
        color:$turquoise;
      }
    }
    th{
      background-color: $turquoise;
      text-transform: uppercase;
      cursor: pointer;
      color: $white;
      text-align: center;
      font-size: 1rem;
      font-weight: 400;
      position: sticky;
      top: 0;
      -webkit-box-shadow:  0 1px 4px 0 $light-blue;
      box-shadow:  0 1px 4px 0 $light-blue;
      @media screen
      and (min-device-width: 1200px)
      and (max-device-width: 1600px)
      and (-webkit-min-device-pixel-ratio: 1) {
        font-size: .78rem;
        padding: 7px;
      }
    }
    td{
      font-size: .95rem;
      @media screen
      and (min-device-width: 1200px)
      and (max-device-width: 1600px)
      and (-webkit-min-device-pixel-ratio: 1) {
        font-size: .85rem;
        padding: 7px;
      }
    }
    th, td {
      border: 1px solid $lightTurquoise;
      border-collapse: collapse;
      text-align: center;
    }
    .highlight>tbody>tr:hover {
      background-color: $blue;
    }
  }

}

</style>
