// @ts-nocheck

import { useProfileStore } from '@/stores/profileStore';

const accountGuard = (to, from, next) => {
    const profileStore = useProfileStore();
    if (!profileStore.userType) {
        next({ path: `/login` });
    }
    else {
        next()
    }
}


export default [
    {
        path: '/user',
        component: () => import('../views/Account/User/Layout.vue'),
        children: [
            { path: 'dashboard', name: 'user_Dashboard', alias: '/user', component: () => import('../views/Account/User/Dashboard.vue') },
            { path: 'settings', name: 'user_Settings', component: () => import('../views/Account/User/Settings/Settings.vue') },
            { path: 'message', name: 'user_Messages', component: () => import('../views/Account/User/Messages.vue') },
            { path: 'applied-jobs', name: 'user_Applied Jobs', component: () => import('../views/Account/User/AppliedJobs.vue') },
            { path: 'find-jobs', name: 'user_Find Jobs', component: () => import('../views/Account/User/FindJobs.vue') },
            { path: 'job-description/:id', name: 'user_Job Description', component: () => import('../views/Account/User/JobDescription.vue') },
            { path: 'browse-companies', name: 'user_Browse Companies', component: () => import('../views/Account/User/Companies.vue') },
            { path: 'profile', name: 'user_Profile', component: () => import('../views/Account/User/Profile/Profile.vue') },
            { path: 'help-center', name: 'user_Help Center', component: () => import('../views/Account/User/HelpCenter.vue') },
        ],
        beforeEnter: accountGuard
    },
]