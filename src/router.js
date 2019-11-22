import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from './views/HomePage';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('./views/SignupPage')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./views/LoginPage')
    }
]

export default new VueRouter({
    mode: 'history',
    routes
});