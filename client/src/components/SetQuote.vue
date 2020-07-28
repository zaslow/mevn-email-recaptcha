<template>
  <div>
    <p v-if="!loading">{{ result }}</p>
    <router-link to="/home">Return to Home</router-link>
  </div>
</template>

<script>
  import { ApiService } from '../services'

  export default {
    created() {
      this.setDailyQuote()
    },
    data: () => ({ loading: true }),
    methods: {
      async setDailyQuote() {
        try {
          await ApiService.put('/quote', { id: this.$route.query.id })
          this.result = `Quote (ID ${this.$route.query.id}) of the day has been updated.`
          this.loading = false
        } catch(e) {
          this.result = `Failed to update quote of the day: ${e}.`
          this.loading = false
        }        
      }
    }
  }
</script>

<style lang="scss" scoped>
  
</style>
