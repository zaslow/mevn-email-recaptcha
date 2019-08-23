<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateMsg">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Suggestions</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('name')">
                <label for="name">Name</label>
                <md-input
                  :disabled="mailResponse.sending"
                  id="name"
                  name="name"
                  v-model="form.name"
                />
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('emailAddress')">
                <label for="email">Email</label>
                <md-input
                  autocomplete="email"
                  :disabled="mailResponse.sending"
                  id="email"
                  name="email"
                  type="email"
                  v-model="form.emailAddress"
                />
                <span class="md-error" v-if="!$v.form.emailAddress.required">
                  Email is required
                </span>
                <span class="md-error" v-else-if="!$v.form.emailAddress.email">Invalid email</span>
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('subject')">
            <label for="subject">Subject</label>
            <md-input
              :disabled="mailResponse.sending"
              id="subject"
              name="subject"
              v-model="form.subject"
            />
            <span class="md-error" v-if="!$v.form.subject.required">Subject is required</span>
          </md-field>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('content')">
                <label for="content">Content</label>
                <md-input
                  :disabled="mailResponse.sending"
                  id="content"
                  name="content"
                  v-model="form.content"
                />
                <span class="md-error" v-if="!$v.form.content.required">Content is required</span>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="mailResponse.sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="mailResponse.sending">
            Send suggestion
          </md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="mailResponse.status == 'sent'">
        Your suggestion about {{ form.subject }} was sent successfully!
      </md-snackbar>
      <md-snackbar :md-active.sync="mailResponse.status == 'error'">
        Your suggestion about {{ form.subject }} failed to send.
      </md-snackbar>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { email, required } from 'vuelidate/lib/validators'

  import globals from '../globals.js'

  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
      form: {
        content: null,
        emailAddress: null,
        name: null,
        subject: null
      },
      mailResponse: {
        sending: false,
        status: null
      }
    }),
    validations: {
      form: {
        content: {
          required
        },
        emailAddress: {
          email,
          required
        },
        name: {
        },
        subject: {
          required
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        /* eslint-disable-next-line no-unused-vars */
        Object.keys(this.$v.form).forEach((field) => field = null);
      },
      async sendMail () {
        let mailRequest = { to: globals.inboxEmail }
        this.mailResponse.sending = true
        Object.keys(this.$v.form).forEach((field) => {
          mailRequest[field] = this.$v.form[field].$model
        })

        try {
          await this.$http.post(globals.apiEndpointBase + '/mail', mailRequest)
          this.clearForm()
          this.mailResponse.sending = false
          this.mailResponse.status = 'sent'
        } catch(e) {
          this.mailResponse.sending = false
          this.mailResponse.status = 'error'
        }
      },
      validateMsg () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.sendMail()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>
