<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">

    <router-link
        v-for="link in links"
        :key="link.url"
        tag="li"
        active-class="active"
        :to="link.url"
        :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ['value'],
  data: () => ({
    links: [
      {title: 'Kontynuacja zatrudnienia', url: '/', exact: true},
      {title: 'Zespoły', url: '/departments'},
      {title: 'Zespoł Personalny', url: '/recruitment'},
      {title: 'Lista pracowników', url: '/lists'},
      {title: 'Import danych', url: '/import'}
    ]
  })
}
</script>