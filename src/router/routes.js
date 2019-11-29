import HomePage from '../views/pages/home';

export default [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('../views/pages/signup')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/pages/login')
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/pages/profile'),
        meta: { 
            requiresAuth: true
        }
    },
    { 
        path: '*', 
        component: () => import('../views/pages/notfound')
    }
];