<template>
  <div>
    <div class="app-main-layout" >
      <navbar @click="isOpen = !isOpen"></navbar>
      <sidebar :value="isOpen"></sidebar>

      <main class="app-content">
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


  export default {
    name: "MainLayout",
    data: () => ({
      isOpen: true,
      loading: true
    }),
    components: {
      Navbar,
      Sidebar
    }
  };
</script>
