<template>
  <div>
    <div>ID: {{ id }}</div>
    <router-link to="/home">Return to Home</router-link>
  </div>
</template>

<script>
  export default {
    created() {
      this.id = this.$route.query.id
    },
    data: () => ({
      id: null
    })
  }
</script>

<style lang="scss" scoped>
  
</style>
