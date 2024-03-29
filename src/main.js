// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'

// components
import App from './App'
import Hello from './components/Hello'
import Home from './components/Home'
import TimeEntries from './components/TimeEntries'
import LogTime from './components/LogTime'

// global variable via mixin
const sharedState = new Vue({
  methods: {
    focus (name) {
      document.getElementsByName(name)[0].focus()
    },
    autofocusOnVeeFields (veeFields) {
      var firstInputName = this.getFirstVeeErrorName(veeFields)
      this.focus(firstInputName)
    },
    getFirstVeeErrorName (fields) {
      var props = Object.keys(fields.fields).reverse()
      var name
      props.forEach(function (propName) {
        if (!fields.fields[propName].valid) {
          name = propName
          return false
        }
      })
      return name
    }
  }
})

// Distribute to components using global mixin
Vue.mixin({
  data: function () {
    return {
      sharedState: sharedState
    }
  }
})

// - If using a module system (e.g. via vue-cli), import Vue and VueRouter and then call Vue.use(VueRouter).
// Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VeeValidate)

// - Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/hello', component: Hello },
  { path: '/home', component: Home },
  {
    path: '/time-entries',
    component: TimeEntries,
    children: [
      { path: 'log-time', component: LogTime }
    ]
  },
  { path: '*', redirect: '/home' }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for routes: routes
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
})
