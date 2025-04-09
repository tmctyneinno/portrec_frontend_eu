import { $instance, $instanceForm } from '../instances'

export default {
    readNotification(id: string) {
        return $instance.get(`notification/read/${id}`)
    },

    searchTalent(industry_id: string) {
        return $instance.get(`get/industry/careers/${industry_id}`)
    },

    getSubscriptions() {
        return $instance.get(`get/subscriptions`)
    },

    subscribeEmailForNewsletter(obj: { email: string }) {
        return $instance.post(`newletters/save/email`, obj)
    },


    sendContactMessage(obj: { email: string }) {
        return $instance.post(`contact_message/send/message`, obj)
    },

    summits() {
        return $instance.get(`summits`)
    },

    summitsDetails(id: any) {
        return $instance.get(`summit/${id}`,)
    },

}