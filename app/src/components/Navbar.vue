<template>
  <nav class="navbar white">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')" class="hide-button">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <router-link to="/" class="logo_link"><img src="../assets/images/logo_terma.png" alt="logo"></router-link>
<!--        <span class="black-text">{{time | dateFilter('date time')}}</span>-->
      </div>

      <ul class="right hide-on-large-and-down">
        <router-link
            v-for="link in links"
            :key="link.url"
            tag="li"
            active-class="active"
            :to="link.url"
            :exact="link.exact"
        >
          <a href="#" class="pointer">{{link.title}}</a>
        </router-link>
        <li>
          <a class="dropdown-trigger black-text profile-wrapper"
             href="#"
             data-target="dropdown"
             ref="dropdown"
          >
            <div class="profile" :style='{ backgroundImage: `url("${userInfo.photo}")` }'></div>
            {{userInfo.name}}
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
    time: new Date(),
    interval: null,
    links: [
      {title: 'Nowi pracownicy', url: '/', exact: true},
      {title: 'Zespoły', url: '/departments'},
      {title: 'Zespoł Personalny', url: '/recruitment'},
      {title: 'Lista pracowników', url: '/lists'},
      {title: 'Import danych', url: '/import'}
    ]
  }),
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true
    });
    this.interval = setInterval(() => {
      this.time = new Date();
    }, 1000);
  },
  computed: {
    userInfo() {
      return this.$store.getters.info
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>

<style scoped lang="scss">
.logo_link{
  height: 42px;
}
.hide-button{
  display: inherit;
  @media only screen and (min-width: 1099.98px) {
    display: none !important;
  }
}
.hide-on-large-and-down {
  display: inherit;
  @media only screen and (max-width: 1099.98px) {
    display: none !important;
  }
  li{
    a{
      color: #525252;
    }
  }
  li.active{
    background-color: rgba(0,0,0,0.3);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    a{
      color: #ffffff;
    }

  }
}

.profile-wrapper {
  display: flex;
  display: -moz-flex;
  display: -webkit-flex;
  display: -o-flex;
  align-items: center;

  div.profile {
    max-width: 40px;
    max-height: 40px;
    margin-right: 10px;
    border: 1px solid #c8c7c7;
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
