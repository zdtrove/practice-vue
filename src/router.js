import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home';
import Tasks from './components/Tasks';
import User from './components/User';
import NotFound from './components/NotFound';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/', 
            component: Home
        },
        {
            path: '/tasks',
            component: Tasks
        },
        {
            path: '/user/:id',
            component: User
        },
        {
            path: '*',
            component: NotFound
        }
    ],
    mode: 'history'
});