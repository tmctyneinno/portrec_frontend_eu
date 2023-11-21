import { $instance, $instanceForm } from '../instances'

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
}