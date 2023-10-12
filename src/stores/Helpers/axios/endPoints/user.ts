import { $instance } from '../instances'

export default {
    userRegister(data: any) {
        return $instance.post(`user/signup`, JSON.stringify(data))
    },

    userLogin(data: any) {
        return $instance.post(`user/login`, JSON.stringify(data))
    },

    userProfile() {
        return $instance.get(`/user/profile`,)
    },
}