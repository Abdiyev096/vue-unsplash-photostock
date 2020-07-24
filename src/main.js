import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import Loader from './components/Loader.vue'
import router from './router'
import store from './store'
import messagePlugin from './utils/message.plugin'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.component('Loader', Loader)

firebase.initializeApp({
    apiKey: "AIzaSyArAYVyaAQXHLSOOidkfkxmDbTNeZ9LRok",
    authDomain: "unsplash-photostock.firebaseapp.com",
    databaseURL: "https://unsplash-photostock.firebaseio.com",
    projectId: "unsplash-photostock",
    storageBucket: "unsplash-photostock.appspot.com",
    messagingSenderId: "710807355659",
    appId: "1:710807355659:web:d3cb9b2854b507f31c220e",
    measurementId: "G-CYBHP3TTTY"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})