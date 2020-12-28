<template>
  <div class="h100">
    <Loader v-if='loader'></Loader>
<<<<<<< HEAD
    <div v-else class="app-main-layout grey lighten-5">
=======
    <div v-else class="app-main-layout">
>>>>>>> ff05918949bb5abd358bd4204577f00ad4ab4ddf
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
    isOpen: false,
    loader: true,
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loader = false
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
    error(fbError) {
      this.$error(information[fbError.code] || 'Coś poszło nie tak')
    }
  }
};
</script>
<style lang="scss">
$lightFirstRed: #ffebee;
$lightSecondRed: #ffcdd2;
$red: rgba(255, 104, 115, 1);
$darkenGrey: grey;
.img_attachment {
  margin-bottom: 0 !important;
  position: relative;
  background-color: rgba(255, 255, 255, 1);
<<<<<<< HEAD
  background-image: url("../assets/images/fabrik.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  background-attachment: fixed;
  padding: 20px 10px;
  height: -webkit-calc(100vh - 175px);
  height: calc(100vh - 175px);
  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);

=======
  padding: 15px 5px;
  height: 100%;
  //height: -webkit-calc(100vh - 163px);
  //height: calc(100vh - 64px - 3rem);
>>>>>>> ff05918949bb5abd358bd4204577f00ad4ab4ddf
  ul.tabs {
    margin-bottom: 10px;
    border-bottom: 1px solid $red;

    .tab a {
      color: $darkenGrey;
      background-color: $lightFirstRed;
    }


    .tab a.active, .tab a:hover, .tab a:focus, .tab a:focus.active {
      color: $darkenGrey;
      background-color: $lightSecondRed;
    }
  }

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    ul.tabs {
      height: 40px;

      .tab {
        line-height: 40px;
        height: 40px;

        a {
          font-size: 12px;
        }
      }
    }
  }

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
    ul.tabs {
      height: 40px;

      .tab {
        line-height: 40px;
        height: 40px;

        a {
          font-size: 12px;
        }
      }
    }
  }
}


div.profile, div#preview {
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


@media(max-width: 1023px) {
  .app-main-layout {
    .app-content {
      padding-left: 0;
      transition: padding-left .3s;
    }

    .app-sidenav.open {
      transform: translateX(-105%);
    }
  }
}
</style>
