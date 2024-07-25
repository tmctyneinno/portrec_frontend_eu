import { $instance, $instanceForm } from '../instances'

export default {
    recruiterRegister(data: any) {
        return $instance.post(`recruiter/signup`, JSON.stringify(data))
    },

    recruiterLogin(data: any) {
        return $instance.post(`recruiter/login`, JSON.stringify(data))
    },

    recruiterProfile() {
        return $instance.get(`recruiter/profile`)
    },

    recruiterUpdateProfile(data: any) {
        return $instance.put(`recruiter/profile`, JSON.stringify(data))
    },

    recruiterProfilePicture(form: FormData, id?: any) {
        const str: string = id ? `/recruiter/profile/picture/${id}` : `/recruiter/profile/picture`
        return $instanceForm.post(`${str}`, form)
    },

    recruiterPassword(data: any) {
        return $instance.put(`/recruiter/password`, JSON.stringify(data))
    },

    recruiterMessageSend(data: any) {
        return $instance.put(`/messages`, JSON.stringify(data))
    },
}