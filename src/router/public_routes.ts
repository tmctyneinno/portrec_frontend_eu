import LandingPage from '../views/General/LandingPage/_LandingPage.vue'
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
        path: '/job-description',
        name: 'Job Description',
        component: () => import('../views/General/JobDescription/_JobDescription.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/General/Login.vue')
    },
    {
        path: '/reset_password',
        name: 'Reset Password',
        component: () => import('../views/General/Reset_password.vue')
    },
    {
        path: '/signup',
        name: 'Sign Up',
        component: () => import('../views/General/Signup.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('../views/PageNotFound.vue')
    },
]