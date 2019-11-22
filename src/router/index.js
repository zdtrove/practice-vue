import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage.vue';

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
        component: () => import('../views/SignupPage.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginPage.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;