// @ts-nocheck

import { useProfileStore } from '@/stores/profileStore';

const accountGuard = (to, from, next) => {
    const profileStore = useProfileStore();
    if (!profileStore.userType) {
        next({ path: `/login` });
    }
    else {
        // redirect based on userType !!!!!
        next()
    }
}

export default [
    {
        path: '/user',
        component: () => import('../views/Account/User/Layout.vue'),
        children: [
            { path: 'dashboard', name: 'user-Dashboard', meta: { name: 'Dashboard', auth: 'user' }, alias: '/user', component: () => import('../views/Account/User/Dashboard.vue') },
            { path: 'settings', name: 'user-Settings', meta: { name: 'Settings', auth: 'user' }, component: () => import('../views/Account/User/Settings/Settings.vue') },
            { path: 'message', name: 'user-Messages', meta: { name: 'Messages', auth: 'user' }, component: () => import('../views/Account/User/Messages.vue') },
            { path: 'applied-jobs', name: 'user-Applied_Jobs', meta: { name: 'Applied Jobs', auth: 'user' }, component: () => import('../views/Account/User/AppliedJobs.vue') },
            { path: 'find-jobs', name: 'user-Find_Jobs', meta: { name: 'Find Jobs', auth: 'user' }, component: () => import('../views/Account/User/FindJobs.vue') },
            { path: 'job-description/:id', name: 'user-Job_Description', meta: { name: 'Job Description', auth: 'user' }, component: () => import('../views/Account/User/JobDescription.vue') },
            { path: 'browse-companies', name: 'user-Browse_Companies', meta: { name: 'Browse Companies', auth: 'user' }, component: () => import('../views/Account/User/Companies/Companies.vue') },
            { path: 'profile', name: 'user-Profile', meta: { name: 'My Profile', auth: 'user' }, component: () => import('../views/Account/User/Profile/Profile.vue') },
            { path: 'help-center', name: 'user-Help_Center', meta: { name: 'Help Center', auth: 'user' }, component: () => import('../views/Account/User/HelpCenter.vue') },
        ],
        beforeEnter: accountGuard
    },

    {
        path: '/admin',
        component: () => import('../views/Account/Admin/Layout.vue'),
        children: [
            { path: 'dashboard', name: 'admin-Dashboard', meta: { name: 'Dashboard', auth: 'admin' }, alias: '/admin', component: () => import('../views/Account/Admin/Dashboard.vue') },
            { path: 'messages', name: 'admin-Messages', meta: { name: 'Messages', auth: 'admin' }, component: () => import('../views/Account/Admin/Messages.vue') },
            { path: 'company', name: 'admin-Company_Profile', meta: { name: 'Company Profile', auth: 'admin' }, component: () => import('../views/Account/Admin/CompanyProfile.vue') },
            { path: 'applicants', name: 'admin-All_Applicants', meta: { name: 'Applicants', auth: 'admin' }, component: () => import('../views/Account/Admin/Applicants.vue') },
            { path: 'job-listing', name: 'admin-Job_Listing', meta: { name: 'Job Listing', auth: 'admin' }, component: () => import('../views/Account/Admin/JobListing.vue') },
            { path: 'schedules', name: 'admin-Schedule', meta: { name: 'Schedule', auth: 'admin' }, component: () => import('../views/Account/Admin/Schedule.vue') },
            { path: 'settings', name: 'admin-Settings', meta: { name: 'Settings', auth: 'admin' }, component: () => import('../views/Account/Admin/Settings.vue') },
            { path: 'help-center', name: 'admin-Help_Center', meta: { name: 'Help Center', auth: 'admin' }, component: () => import('../views/Account/Admin/HelpCenter.vue') },
        ],
        beforeEnter: accountGuard
    },
]