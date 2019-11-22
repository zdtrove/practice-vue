import Vue from 'vue';
import App from './App';
import router from './router.js';
import vuetify from './plugins/vuetify';
import store from './store';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false

new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')