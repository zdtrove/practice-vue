import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import { i18n, vuetify } from './plugins';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import Axios from 'axios';
import * as constants from './constants';

Vue.config.productionTip = false;

Axios.defaults.baseURL = constants.API_BASE_URL;

new Vue({
    router,
    store,
    i18n,
    vuetify,
    render: h => h(App)
}).$mount('#app')