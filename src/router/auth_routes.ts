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
        path: '/login',
        name: 'Login - User',
        component: () => import(/* webpackChunkName: "auth" */  '../views/Auth/Login.vue'),
        beforeEnter: initGuard
    },
    {
        path: '/login/recruiter',
        name: 'Login - Recruiter',
        component: () => import(/* webpackChunkName: "auth" */  '../views/Auth/LoginRecruiter.vue'),
        beforeEnter: initGuard
    },
    {
        path: '/auth/reset-password',
        name: 'Reset Password',
        component: () => import(/* webpackChunkName: "auth" */  '../views/Auth/ResetPassword.vue'),
        beforeEnter: initGuard
    },
    {
        path: '/signup',
        name: 'Sign Up - User',
        component: () => import(/* webpackChunkName: "auth" */  '../views/Auth/Signup.vue'),
        beforeEnter: initGuard
    },
    {
        path: '/signup/recruiter',
        name: 'Sign Up - Recruiter',
        component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/SignupRecruiter.vue'),
        beforeEnter: initGuard
    },

    {
        path: '/auth/reset-password/otp',
        name: 'OTP Reset Password',
        component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/OtpResetPassword.vue'),
        beforeEnter: initGuard
    },
]