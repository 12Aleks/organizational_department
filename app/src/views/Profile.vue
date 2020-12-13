<template>
    <div class="app-page">
      <div class="page-title">
        <h3 class="flow-text">Twoje konto</h3>
      </div>
      <div class="row img_attachment">
        <Loader v-if='loading'></Loader>
        <user-profile  :userInfo="userInfo"/>
        <updateUserProfile :userInfo="userInfo" />
      </div>
    </div>
</template>

<script>

import userProfile from "../components/profile/userProfile";
import updateUserProfile from "../components/profile/updateUserProfile";

export default {
  name: "Profile",
  metaInfo(){
    return{
      title: this.$titleApp('Konto')
    }
  },
  data: () => ({
    name: '',
    loading: false,
  }),
  components: {
    userProfile,
    updateUserProfile
  },
  computed: {
    userInfo() {
      return this.$store.getters.info
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
