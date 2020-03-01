import EmailForm from './components/EmailForm.vue'
import Quote from './components/Quote.vue'

export default [{
  path: '/home',
  component: Quote
}, {
  path: '/suggestions',
  component: EmailForm
}, {
  path: '*',
  redirect: '/home'
}]
