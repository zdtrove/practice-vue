import Vuex from 'vuex';
import Vue from 'vue';
import tasks from './modules/tasks';
import language from './modules/language';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules: {
        tasks,
        language
    }
});