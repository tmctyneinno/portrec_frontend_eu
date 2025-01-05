import LandingPage from '../views/General/LandingPage/LandingPage.vue'
import { useProfileStore } from '@/stores/profileStore';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const initGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const profileStore = useProfileStore();
    if (profileStore.isLoggedIn) {
        const path = profileStore.isNewLogin == 1
            ? `/${profileStore.getUserType}/get-started`
            : `/${profileStore.getUserType}/dashboard`;

        if (profileStore.isNewLogin == 1) profileStore.isNewLogin = 0;

        next({ path });
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
        component: () => import(/* webpackChunkName: "general" */  '../views/General/About.vue')
    },
    {
        path: '/search-talent/:industry_id?',
        name: 'Search Talent',
        component: () => import(/* webpackChunkName: "talent" */  '../views/General/SearchTalent.vue')
    },
    {
        path: '/for-talent',
        name: 'For Talent',
        component: () => import(/* webpackChunkName: "talent" */  '../views/General/ForTalent.vue')
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import( /* webpackChunkName: "general" */  '../views/General/Contact.vue')
    },
    {
        path: '/find-jobs',
        name: 'Find Jobs',
        component: () => import(/* webpackChunkName: "general" */  '../views/General/FindJobs.vue')
    },
    {
        path: '/job-description/:id',
        name: 'Job Description',
        component: () => import(/* webpackChunkName: "general" */  '../views/General/JobDescription/JobDescription.vue')
    },

    {
        path: '/login',
        name: 'Login - User',
        component: () => import(/* webpackChunkName: "auth" */  '../views/General/Login.vue'),
        beforeEnter: initGuard
    },
    {
        path: '/login/recruiter',
        name: 'Login - Recruiter',
        component: () => import(/* webpackChunkName: "auth" */  '../views/General/LoginRecruiter.vue'),
        beforeEnter: initGuard
    },
    {
        path: '/reset_password',
        name: 'Reset Password',
        component: () => import(/* webpackChunkName: "auth" */  '../views/General/Reset_password.vue'),
        beforeEnter: initGuard
    },
    {
        path: '/signup',
        name: 'Sign Up - User',
        component: () => import(/* webpackChunkName: "auth" */  '../views/General/Signup.vue'),
        beforeEnter: initGuard
    },
    {
        path: '/signup/recruiter',
        name: 'Sign Up - Recruiter',
        component: () => import(/* webpackChunkName: "auth" */ '../views/General/SignupRecruiter.vue'),
        beforeEnter: initGuard
    },
    {
        path: '/meeting/invite',
        alias: ['/meeting/accept', '/candidate/accept/view'],
        name: 'Meeting Invite',
        component: () => import(/* webpackChunkName: "general" */  '../views/MeetingInvite.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import(/* webpackChunkName: "error" */  '../views/PageNotFound.vue')
    },
]