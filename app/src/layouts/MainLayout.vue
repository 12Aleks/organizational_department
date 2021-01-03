<template>
  <div>
    <Loader v-if='loader'></Loader>
    <div v-else class="app-main-layout grey lighten-5">
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
.img_attachment {
  background-image: url("../assets/images/fabrik.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  background-attachment: fixed;
}
</style>
