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
  // Flexbox display
  @mixin flex($properties) {
    @if $properties == 'flex' {
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
    } @else if $properties == 'inline-flex' {
      display: -ms-inline-flexbox;
      display: -webkit-inline-flex;
      display: inline-flex;
    }
  }
  @mixin flex_justify($properties) {
    @if $properties == 'flex-start' {
      -webkit-justify-content: flex-start;
      -ms-flex-pack: start;
      justify-content: flex-start;
    } @else if $properties == 'flex-end' {
      -webkit-justify-content: flex-end;
      -ms-flex-pack: end;
      justify-content: flex-end;
    } @else if $properties == 'center' {
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
    } @else if $properties == 'space-between' {
      -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
      justify-content: space-between;
    } @else if $properties == 'space-around' {
      -webkit-justify-content: space-around;
      -ms-flex-pack: distribute;
      justify-content: space-around;
    }
  }

  @mixin flex_align_items($properties) {
    @if $properties == 'flex-start' {
      -webkit-align-items: flex-start;
      -ms-flex-align: start;
      align-items: flex-start;
    } @else if $properties == 'flex-end' {
      -webkit-align-items: flex-end;
      -ms-flex-align: end;
      align-items: flex-end;
    } @else if $properties == 'center' {
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
    } @else if $properties == 'baseline' {
      -webkit-align-items: baseline;
      -ms-flex-align: baseline;
      align-items: baseline;
    } @else if $properties == 'stretch' {
      -webkit-align-items: stretch;
      -ms-flex-align: stretch;
      align-items: stretch;
    }
  }

  @mixin flex_wrap($properties) {
    @if $properties == 'nowrap' {
      -webkit-flex-wrap: nowrap;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
    } @else if $properties == 'wrap' {
      -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
    } @else if $properties == 'wrap-reverse' {
      -webkit-flex-wrap: wrap-reverse;
      -ms-flex-wrap: wrap-reverse;
      flex-wrap: wrap-reverse;
    }
  }

  @mixin flex_direction($properties) {
    -webkit-flex-direction: $properties;
    -ms-flex-direction: $properties;
    flex-direction: $properties;
  }
  .app-content {
    height: 100vh;
    .app-page {
      height: 100%;
    }
  }

</style>
