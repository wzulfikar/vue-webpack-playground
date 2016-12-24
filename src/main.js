import Vue from 'vue'
import App from './App.vue'
import Hello from './components/Hello.vue'
// import Home from './components/Home.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// We want to apply VueResource and VueRouter
// to our Vue instance
Vue.use(VueResource)
Vue.use(VueRouter)

// Pointing routes to the components they should use
const routes = [
  {path: '/hello', component: Hello},
  {path: '/', component: App},

  // Any invalid route will redirect to home
  {path: '*', component: '/'}
]

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  router
}).$mount('#app')
