import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router';
import './assets/style.css'
import axios from 'axios'

Vue.use(VueRouter);

axios.defaults.baseURL = "http://localhost:8000/api/v1"
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
