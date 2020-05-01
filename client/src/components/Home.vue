<template>
  <div>
    <div class="md-layout md-alignment-center headline-wrapper">
      <h1 class="md-layout-item md-headline">Today's Quote:</h1>
    </div>

    <div class="md-layout md-alignment-center">
      <md-card class="md-layout-item
                      md-xsmall-size-100
                      md-medium-size-66
                      md-large-size-50
                      quote-card">
        <md-card-content class="md-layout md-alignment-center quote">
          <p class="md-layout-item md-size-100 md-title quote-content">
            "{{ dailyQuote.content }}"
          </p>
          <div class="md-layout md-alignment-center-right">
            <p class="md-layout-item md-size-33 md-subheading quote-author">
              - {{ dailyQuote.name }}
            </p>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
  import { ApiService } from '../services'

  export default {
    created() {
      this.getDailyQuote().then(quote => (this.dailyQuote = quote.data));
    },
    data: () => ({
      dailyQuote: {
        name: null,
        content: null
      }
    }),
    methods: {
      async getDailyQuote() {
        try {
          return await ApiService.get('/quote/last-set')
        } catch(e) {
          return e
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .headline-wrapper {
    margin-bottom: 1rem;
  }

  .quote-card {
    padding: 1rem 2rem;
  }

  .quote-author {
    text-align: right;
  }

  .quote-content {
    font-style: italic;
  }
</style>
