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
        path: '/tasks',
        name: 'tasks',
        component: () => import('../views/pages/tasks')
    }
];