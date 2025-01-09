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


}