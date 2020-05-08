<template>
  <div id="app">
    <md-tabs
      class="app-menu md-transparent"
      md-alignment="centered"
      md-sync-route
      v-if="showNav">

      <md-tab md-label="Home" to="/home"></md-tab>
      <md-tab md-label="Suggestions" to="/suggestions"></md-tab>
      <md-tab md-label="About" to="/about"></md-tab>
    </md-tabs>
  
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created() {
      this.setNavVisibility(this.$route)
    },
    data: () => ({
      showNav: null
    }),
    methods: {
      setNavVisibility(route) {
        this.showNav = !route.meta.hideNav
      }
    },
    watch: {
      $route(to) {
        this.setNavVisibility(to)
      }
    }
  }
</script>

<style lang="scss">
  #app {
    color: #2c3e50;
    font-variant: small-caps;
    margin: 48px 8px;
    text-align: center;
  }

  .app-menu {
    margin-bottom: 2rem;

    .md-tab {
      font-size: 1.5rem;
      font-variant: small-caps;
      text-transform: none !important;
    }
  }
</style>
