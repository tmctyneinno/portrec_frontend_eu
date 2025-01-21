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


type UserTypesInterface = 'user' | 'recruiter'
type fileNamesInterface = 'ResetPassword' | 'OtpResetPassword'
const userTypes: UserTypesInterface[] = ['user', 'recruiter'];
const capitalizeText = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const getPasswordComponent = (userType: UserTypesInterface, fileName: fileNamesInterface) => () =>
    import(`../views/Passwords/${capitalizeText(userType)}${fileName}.vue`);

const routes = userTypes.flatMap(userType => [
    {
        path: `/password/${userType}/reset`,
        name: `${capitalizeText(userType)} Reset Password`,
        component: getPasswordComponent(userType, 'ResetPassword'),
        beforeEnter: initGuard
    },
    {
        path: `/password/forgot/${userType}/otp`,
        name: `${capitalizeText(userType)} OTP Reset Password`,
        component: getPasswordComponent(userType, 'OtpResetPassword'),
        beforeEnter: initGuard
    }
]);


export default routes;


// export default [


//     // User

//     {
//         path: '/password/user/reset',
//         name: 'User Reset Password',
//         component: () => import(/* webpackChunkName: "password" */  '../views/Passwords/UserResetPassword.vue'),
//         beforeEnter: initGuard
//     },


//     {
//         path: '/password/forgot/user/otp',
//         name: 'User OTP Reset Password',
//         component: () => import(/* webpackChunkName: "password" */ '../views/Passwords/UserOtpResetPassword.vue'),
//         beforeEnter: initGuard
//     },



//     // Recuiter

//     {
//         path: '/password/recruiter/reset',
//         name: 'User Reset Password',
//         component: () => import(/* webpackChunkName: "password" */  '../views/Passwords/RecruiterResetPassword.vue'),
//         beforeEnter: initGuard
//     },


//     {
//         path: '/password/forgot/recruiter/otp',
//         name: 'User OTP Reset Password',
//         component: () => import(/* webpackChunkName: "password" */ '../views/Passwords/RecruiterOtpResetPassword.vue'),
//         beforeEnter: initGuard
//     },
// ]