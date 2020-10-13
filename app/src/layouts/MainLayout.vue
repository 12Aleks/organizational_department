<template>
  <div>
    <div class="app-main-layout" >
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
