import HomePage from '../views/HomePage';

export default [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('../views/SignupPage')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginPage')
    },
    {
        path: '/tasks',
        name: 'tasks',
        component: () => import('../views/TaskPage')
    }
];