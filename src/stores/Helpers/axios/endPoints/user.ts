import { $instance } from '../instances'

export default {
    userRegister(data: any) {
        return $instance.post(`user/signup`, JSON.stringify(data))
    },

    userLogin(data: any) {
        return $instance.post(`user/login`, JSON.stringify(data))
    },

    userProfile() {
        return $instance.get(`/user/profile`)
    },

    userUpdateProfile(data: any) {
        return $instance.put(`user/profile`, JSON.stringify(data))
    },

    userProfilePicture(form: FormData) {
        return $instance.post(`/user/profile/picture`, form)
    },

    userCoverLetterText(data: any) {
        return $instance.post(`/user/cover-letter`, JSON.stringify(data))
    },

    userCoverLetterTextUpdate(data: any, id: any) {
        return $instance.put(`/user/cover-letter/${id}`, JSON.stringify(data))
    },

    userCoverLetterFile(form: FormData) {
        return $instance.post(`/user/cover-letter/upload`, form)
    },

    userCoverLetterDelete(id: any) {
        return $instance.delete(`/user/cover-letter/${id}`)
    },
}