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
        <md-card-content class="md-layout md-alignment-space-between-center">
          <p class="md-title quote-content">"{{ quote.content }}"</p>
          <div class="md-layout md-alignment-center-right">
            <p class="md-layout-item md-size-33 md-subheading quote-author">
              - {{ quote.author }}
            </p>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      quote: {
        author: 'Larry Bird',
        content: 'A winner is someone who recognizes his God-given talents,'
          + ' works his tail off to develop them into skills,'
          + ' and uses these skills to accomplish his goals.'
      }
    })
  }
</script>

<style lang="scss" scoped>
  .headline-wrapper {
    margin-bottom: 1rem;
  }

  .quote-author {
    text-align: right;
  }

  .quote-card {
    min-height: 12rem;
  }

  .quote-content {
    font-style: italic;
  }
</style>
