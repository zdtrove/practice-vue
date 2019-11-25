import Vue from 'vue';
import App from './App';
import router from './router';
// import vuetify from './plugins/vuetify';
import store from './store';
// import { i18n } from './plugins/i18n';
import { i18n, vuetify } from './plugins';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    vuetify,
    render: h => h(App)
}).$mount('#app')