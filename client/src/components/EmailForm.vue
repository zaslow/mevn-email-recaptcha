<template>
  <form class="md-layout md-alignment-top-center" novalidate @submit.prevent="validateMsg">
    <md-card class="md-layout-item md-size-66 md-medium-size-75 md-small-size-100">
      <md-card-header>
        <div class="md-title">Suggestions</div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('name')">
              <label for="name">Name</label>
              <md-input
                :disabled="mailRequest.sending"
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
                :disabled="mailRequest.sending"
                id="email"
                name="email"
                type="email"
                v-model="form.emailAddress"
              />
              <span class="md-error" v-if="!$v.form.emailAddress.required">
                Email is required
              </span>
              <span class="md-error" v-else-if="!$v.form.emailAddress.email">
                Invalid email
              </span>
            </md-field>
          </div>
        </div>

        <md-field :class="getValidationClass('subject')">
          <label for="subject">Subject</label>
          <md-input
            :disabled="mailRequest.sending"
            id="subject"
            name="subject"
            v-model="form.subject"
          />
          <span class="md-error" v-if="!$v.form.subject.required">
            Subject is required
          </span>
        </md-field>

        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('content')">
              <label for="content">Content</label>
              <md-input
                :disabled="mailRequest.sending"
                id="content"
                name="content"
                v-model="form.content"
              />
              <span class="md-error" v-if="!$v.form.content.required">
                Content is required
              </span>
            </md-field>
          </div>
        </div>

        <div class="md-gutter recaptcha">          
          <VueRecaptcha
            @expired="expireRecaptcha"
            @verify="verifyRecaptcha"
            :loadRecaptchaScript="true"
            ref="recaptcha"
            sitekey="6Le1YNMUAAAAAHlCt5_hmZe9LxnSlWtAl-iUbBAP"
            v-model="form.recaptcha"
          />
          <span class="error" v-if="showRecaptchaError">
            Please verify you are not a robot.
          </span>
        </div>
      </md-card-content>

      <md-progress-bar md-mode="indeterminate" v-if="mailRequest.sending" />

      <md-card-actions md-alignment="left">
        <md-button class="md-primary" :disabled="mailRequest.sending" type="submit">
          Send suggestion
        </md-button>
      </md-card-actions>
    </md-card>

    <md-snackbar :md-active.sync="mailRequest.status == 'sent'">
      Your suggestion about {{ form.subject }} was sent successfully!
    </md-snackbar>
    <md-snackbar :md-active.sync="mailRequest.status == 'error'">
      Your suggestion about {{ form.subject }} failed to send.
    </md-snackbar>
  </form>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha';
  import { validationMixin } from 'vuelidate'
  import { email, required } from 'vuelidate/lib/validators'

  import globals from '../globals.js'
  import ApiService from '../services/ApiService.js'

  export default {
    name: 'FormValidation',
    components: { VueRecaptcha },
    mixins: [validationMixin],
    data: () => ({
      form: {
        content: null,
        emailAddress: null,
        name: null,
        subject: null,
        recaptcha: false
      },
      mailRequest: {
        sending: false,
        status: null
      },
      showRecaptchaError: false
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
        subject: {
          required
        }
      }
    },
    methods: {
      expireRecaptcha () {
        this.$refs.recaptcha.reset()
      },
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
        Object.keys(this.$v.form).forEach(field => field = null)
      },
      async sendMail () {
        this.mailRequest.sending = true

        try {
          await ApiService.post('/mail', {
            to: globals.inboxEmail,
            ...this.$v.form.$model
          })
          this.clearForm()
          this.mailRequest.sending = false
          this.mailRequest.status = 'sent'
        } catch(e) {
          this.mailRequest.sending = false
          this.mailRequest.status = 'error'
        }
      },
      validateMsg () {
        this.$v.$touch()

        if (!this.form.recaptcha) {
          this.showRecaptchaError = true
        } else if (!this.$v.$invalid) {
          this.sendMail()
        }
      },
      async verifyRecaptcha (token) {
        try {
          await ApiService.post('/recaptcha', { token })
          this.form.recaptcha = true
          this.showRecaptchaError = false
        } catch(e) {
          return e;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-card {
    padding: 0 1rem 1rem;
  }

  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  .recaptcha {
    margin-bottom: 1rem;
    margin-top: 1rem;

    .error {
      color: var(--md-theme-default-fieldvariant, #ff1744);
      float: left;
      font-size: 12px;
    }
  }
</style>
