<template>
  <div>
    <div class="app-main-layout grey lighten-4" >
      <navbar @click="isOpen = !isOpen"></navbar>
      <sidebar :value="isOpen"></sidebar>

      <main class="app-content" :class="{full : !isOpen}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn">
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/Navbar";
  import Sidebar from "@/components/Sidebar";
  import information from "../message/information";


  export default {
    name: "MainLayout",
    data: () => ({
      isOpen: true,
      loading: true
    }),
    async mounted() {
      if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo')
      }
    },
    components: {
      Navbar,
      Sidebar
    },
    computed: {
      error() {
        return this.$store.getters.error
      }
    },
    watch: {
      error(fbError){
        this.$error(information[fbError.code] || 'Coś poszło nie tak' )
        console.log(fbError)
      }
    }
  };
</script>
<style lang="scss">
  .img_attachment{
    background-color: rgba(255,255,255, 1);
    background-image: url("../assets/images/fabrik.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
    background-attachment: fixed;
    padding: 20px 15px;
    height:-webkit-calc(100vh - 205px);
    height:calc(100vh - 205px);
  }
  div.profile, div#preview{
    max-width: 150px;
    max-height: 150px;
    margin-right: 10px;
    position: relative;
    display: inline-flex;
    display: -webkit-inline-flex;
    align-items: center;
    justify-content: center;
    width: 50vh;
    height: 50vh;
    overflow: hidden;
    background: center center no-repeat;
    background-size: cover;
  }
  @media(max-width: 1023px){
    .app-main-layout{
      .app-content{
        padding-left: 0;
        transition: padding-left .3s;
      }
      .app-sidenav.open {
        transform: translateX(-105%);
      }
    }
  }
</style>
