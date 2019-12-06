import HomePage from '../views/pages/home';

export default [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/account/signup',
        name: 'signup',
        component: () => import('../views/pages/account/signup')
    },
    {
        path: '/account/login',
        name: 'login',
        component: () => import('../views/pages/account/login')
    },
    {
        path: '/account/create-new-password',
        name: 'newpass',
        component: () => import('../views/pages/account/newpass')
    },
    {
        path: '/account/active-account',
        name: 'active',
        component: () => import('../views/pages/account/active')
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