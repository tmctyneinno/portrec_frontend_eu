import { $instance, $instanceForm } from '../instances'

export default {
    readNotification(id: string) {
        return $instance.get(`notification/read/${id}`)
    },


}