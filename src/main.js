import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import bootstrapVue from './plugins/bootstrap-vue';
import vueSmoothScroll from './plugins/vue-smooth-scroll';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.config.productionTip = false

new Vue({
  vuetify,
  icons: {iconfont: 'fa'},
  bootstrapVue,
  vueSmoothScroll,
  render: h => h(App)
}).$mount('#app')
