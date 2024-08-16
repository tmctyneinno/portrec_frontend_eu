// @ts-nocheck
import LandingPage from '../views/General/LandingPage/LandingPage.vue'
import { useProfileStore } from '@/stores/profileStore';

const initGuard = (to, from, next) => {
    const profileStore = useProfileStore();
    if (profileStore.isLoggedIn) {
        next({ path: `/${profileStore.getUserType}/dashboard` });
    }
    else {
        next()
    }
}

export default [
    {
        path: '/',
        name: 'Home',
        component: LandingPage
    },
    {
        path: '/about-us',
        name: 'About Us',
        component: () => import('../views/General/About.vue')
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('../views/General/Contact.vue')
    },
    {
        path: '/find-jobs',
        name: 'Find Jobs',
        component: () => import('../views/General/FindJobs.vue')
    },
    {
        path: '/job-description/:id',
        name: 'Job Description',
        component: () => import('../views/General/JobDescription/JobDescription.vue')
    },

    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/General/Login.vue'),
        beforeEnter: initGuard
    },
    {
        path: '/reset_password',
        name: 'Reset Password',
        component: () => import('../views/General/Reset_password.vue'),
        beforeEnter: initGuard
    },
    {
        path: '/signup',
        name: 'Sign Up',
        component: () => import('../views/General/Signup.vue'),
        beforeEnter: initGuard
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('../views/PageNotFound.vue')
    },
]