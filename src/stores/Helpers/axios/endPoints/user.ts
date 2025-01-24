import { $instance, $instanceForm } from '../instances'

export default {
    userRegister(data: any) {
        return $instance.post(`user/signup`, JSON.stringify(data))
    },

    userLogin(data: any) {
        return $instance.post(`user/login`, JSON.stringify(data))
    },

    userLoginWithGoogle(data: any) {
        return $instance.post(`user/login-google`, JSON.stringify(data))
    },

    userProfile() {
        return $instance.get(`/user/profile`)
    },

    userUpdateProfile(data: any) {
        return $instance.post(`user/profile/update`, JSON.stringify(data))
    },

    userProfilePicture(form: FormData, id?: any) {
        const str: string = id ? `/user/profile/picture/${id}` : `/user/profile/picture`
        return $instanceForm.post(`${str}`, form)
    },

    userExperience(data: any, id?: any) {
        return id ? $instance.put(`/user/experience/${id}`, JSON.stringify(data))
            : $instance.post(`/user/experience`, JSON.stringify(data))
    },

    userExperienceDelete(id: any) {
        return $instance.delete(`/user/experience/${id}`)
    },

    userEducation(data: any, id?: any) {
        return id ? $instance.put(`/user/education/${id}`, JSON.stringify(data))
            : $instance.post(`/user/education`, JSON.stringify(data))
    },

    userEducationDelete(id: any) {
        return $instance.delete(`/user/education/${id}`)
    },

    userCoverLetterText(data: any, id?: any) {
        return id ? $instance.put(`/user/cover-letter/${id}`, JSON.stringify(data))
            : $instance.post(`/user/cover-letter`, JSON.stringify(data))
    },

    userCoverLetterFile(form: FormData) {
        return $instanceForm.post(`/user/cover-letter/upload`, form)
    },

    userCoverLetterDelete(id: any) {
        return $instance.delete(`/user/cover-letter/${id}`)
    },

    userSkillAdd(obj: Object) {
        return $instance.post(`/user/skill`, obj)
    },

    useSkillDelete(id: any) {
        return $instance.delete(`/user/skill/${id}`)
    },

    userPassword(data: any) {
        return $instance.put(`/user/password`, JSON.stringify(data))
    },

    userMessageSend(data: any) {
        return $instance.put(`/messages`, JSON.stringify(data))
    },

    userApplicationList(obj: any) {
        return $instanceForm.post(`job/user/applications`, obj)
    },

    userNotifications() {
        return $instance.get(`notifications/user`)
    },

    userDashboardInfo() {
        return $instance.get(`user/dashboard/info`)
    },

    meetingInfomation(id: string | number) {
        return $instance.get(`get/meeting/info/${id}`)
    },

    meetingAccept(obj: FormData) {
        return $instanceForm.post(`user/accept/interview`, obj)
    },

    userGetInterviews() {
        return $instance.get(`user/get/interviews`)
    },

    userInitiatePayment(obj: FormData) {
        return $instanceForm.post(`user/initiate/subscription/payment`, obj)
    },

    userVerifyPayment(queryString: string) {
        return $instance.get(`user/verify/payment${queryString}`)
    },

    userAddPortfolio(obj: FormData) {
        return $instanceForm.post(`user/add/portfolio`, obj)
    },

    userUpdatePortfolio(id: string, obj: FormData) {
        return $instance.post(`user/portfolio/update/${id}`, obj)
    },

    userDeletePortfolio(id: string) {
        return $instance.post(`user/portfolio/delete/${id}`)
    },

    userDeletePortfolioImage(id: string) {
        return $instance.post(`user/portfolio/delete/image/${id}`)
    },

    userAddPortfolioImage(obj: FormData) {
        return $instanceForm.post(`user/portfolio/add/image`, obj)
    },

    userForgotPasswordOTP(obj: FormData) {
        return $instanceForm.post(`user/send/otp`, obj)
    },

    userForgotPasswordVerifyOTP(obj: FormData) {
        return $instanceForm.post(`user/verify/otp`, obj)
    },

    userResetPassword(obj: FormData) {
        return $instanceForm.post(`user/reset/password`, obj)
    },
}