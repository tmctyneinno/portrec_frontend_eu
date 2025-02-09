import { $instance, $instanceForm } from '../instances'

export default {
    createMessage(data: any) {
        return $instanceForm.post(`/messages`, data)
    },

    getConversation(conversation_id: string | number) {
        return $instance.get(`/messages/${conversation_id}`)
    },

    getAllConversations() {
        return $instance.get(`/messages/index?type=conversations&1`)
    },

    getConversationMessages(conversation_id: string | number) {
        return $instance.get(`/messages?type=messages&conversation_id=${conversation_id}&per_page`)
    },

    unreadMessagesCount() {
        return $instance.get(`/messages/count`)
    },

    markConversationAsRead(conversation_id: string | number) {
        return $instance.put(`/messages/${conversation_id}/mark-read`)
    },

    deleteConversationOrMessage(conversationIdOrMessageId: string | number, type: 'conversation' | 'message') {
        return $instance.delete(`/messages/${conversationIdOrMessageId}?type=${type}`)
    },
}