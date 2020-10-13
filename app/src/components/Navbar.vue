<template>
  <nav class="navbar grey lighten-2">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{time | dateFilter('date time')}}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a class="dropdown-trigger black-text profile-wrapper"
                  href="#"
                  data-target="dropdown"
                  ref="dropdown"
          >
            <div class="profile" :style='{ backgroundImage: `url("${userPhoto}")` }'></div> {{userInfo.name}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Konto
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Wyjść
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>


<script>
  import M from "materialize-css";

export default {
  data: () => ({
    dropdown: null,
    time : new Date(),
    interval: null,
    backgroundImage: '@/assets/images/profile.jpg'
  }),
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true
    });
    this.interval = setInterval(() => {
      this.time = new Date();
    }, 1000);
  },
  computed:{
    userInfo() {
      return this.$store.getters.info
    },
    userPhoto() {
      if (!Object.keys(this.$store.getters.updatePhoto).length) {
        return this.backgroundImage
      } else {
        return this.$store.getters.updatePhoto
      }
    }
  },
  methods:{
   async logout(){
       await this.$store.dispatch('logout')
       this.$router.push('/login?message=logout')
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
    if(this.dropdown && this.dropdown.distroy){
      this.dropdown.distroy
    }
  }
}
</script>

<style scoped lang="scss">
    .profile-wrapper{
      display: flex;
      display: -moz-flex;
      display: -webkit-flex;
      display: -o-flex;
      align-items: center;
      div.profile{
        max-width: 40px;
        max-height: 40px;
        margin-right: 10px;
        position: relative;
        display: inline-flex;
        display: -webkit-inline-flex;
        align-items: center;
        justify-content: center;
        width: 50vh;
        height: 50vh;
        border-radius: 50%;
        overflow: hidden;
        background: center center no-repeat;
        background-size: cover;
      }
    }


</style>
