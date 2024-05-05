<template>
    <div class="row g-3">
        <div class="col-lg-5 line-right px-3 min-vh-100">
            <div class="row">
                <div class="col-12">
                    <div class="input-group mb-4">
                        <label class="input-group-text bg-transparent text-muted border-end-0 pe-0 rounded-0 "><i
                                class="bi bi-search"></i></label>
                        <input type="text" class="form-control border-start-0 rounded-0" placeholder="search messages"
                            aria-label="Button" aria-describedby="" />
                    </div>
                    <div class="col-12">
                        <div v-if="!convos.data.length">
                            <NoDataShow text="No messages" />
                        </div>
                        <ul v-else class="list-group list-group-flush">
                            <li @click="showMessages(convo.id)" v-for="(convo, index) in  convos.data " :key="index"
                                class="list-group-item cursor-pointer ps-0 "
                                :class="{ 'bg-light theme-color': convoMessages.currentConvoId == convo.id }">
                                <div class="row justify-content-center align-items-center">
                                    <div class="col-2 col-lg-1 pe-0">
                                        <div class="img-circle float-end"></div>
                                    </div>
                                    <div class="col-10">
                                        <div>
                                            <span class="fw-bold text-capitalize">{{ convo.recruiter?.name ?? ''
                                                }}</span>
                                            <span class="badge rounded-pill bg-secondary ms-2 xsmall"
                                                :class="{ 'bg-primary': !convo.is_user_read }">
                                                {{ convo.messages_count }}
                                            </span>

                                            <span class="fw-light xsmall float-end">
                                                {{ useFxn.timeAgo(convo.created_at) }}
                                            </span>
                                        </div>
                                        <div class="fw-lighter text-truncat">
                                            {{ convo.messages[convo.messages.length - 1].message }}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-7 px-0 mx-0">
            <componentLoadingVue class="mt-5" v-if="convoMessages.isLoading" />
            <div v-else>
                <div v-if="convoMessages.data.length" class="container">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-2 col-md-1">
                            <div class="img-circle"></div>
                        </div>
                        <div class="col-10 col-md-11 ps-1">
                            <div class="fw-bold text-capitalize">
                                {{ currentRecruiter?.name ?? '' }}
                                <span class=" float-end">
                                    <div class="btn-group">
                                        <span class="cursor-pointer" id="triggerId" data-bs-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">
                                            <i class="bi bi-three-dots-vertical"></i>
                                        </span>

                                        <div class="dropdown-menu dropdown-menu-start" aria-labelledby="triggerId">
                                            <span @click="deleteConversation"
                                                class="dropdown-item text-danger cursor-pointer small">
                                                <i class="bi bi-trash3"></i> Delete
                                                conversation</span>
                                        </div>
                                    </div>
                                </span>
                            </div>
                            <div class="fw-lighter text-truncate xsmall">
                                Recruiter at ***
                            </div>
                        </div>
                    </div>
                    <hr class="faint my-2">
                    <div class="row justify-content-center g-1 mb-3">
                        <div class="col-12 d-flex justify-content-center">
                            <div class="img-circle-large"></div>
                        </div>
                        <div class="col-12">
                            <div class="text-center fw-lighter">
                                {{ currentRecruiter?.name ?? '' }}
                            </div>
                            <div class="text-center small">Recruiter at ****</div>
                        </div>
                    </div>
                    <!-- <div class="text-center between-lines fw-lighter">Today</div> -->
                    <div class="mx-3">
                        <div class="position-relative bg-light">
                            <div class="px-3 chat-container">
                                <div v-for="msg in convoMessages.data" :key="msg.id" class="d-flex align-items-center"
                                    :class="{ 'text-right justify-content-end': msg.sender_id == profileStore.data.id }">
                                    <!-- <div class="text-left pr-1"><img
                                        src="" width="30"
                                        class="img1" /></div> -->
                                    <div>
                                        <span class="name">
                                            {{ msg.sender_id == profileStore.data.id ? 'You' : currentRecruiter.name }}
                                        </span>
                                        <p class="msg">{{ msg.message }}
                                            <span v-if="msg.sender_id == profileStore.data.id">
                                                <i @click="deleteMessage(msg.id)"
                                                    class="bi bi-x-circle-fill small cursor-pointer"></i>
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <!-- <div class="text-center"><span class="between">Call started at 10:47am</span></div> -->
                                <!-- <div class="text-center"><span class="between">Call ended at 11:03am</span></div> -->
                            </div>

                            <div class="navbar d-flex justify-content-between mt-3 bg-white">
                                <div class="col">
                                    <EmojiPicker :text="inputText" picker-type="input" @update:text="onChangeText"
                                        :native="false" />
                                </div>
                                <div class="col-md-3 col-lg-2">
                                    <button v-if="!convoMessages.isSendingMessage" @click="sendMessage"
                                        style="height: 40px !important;" class="btn btn-primary rounded-0 w-100"
                                        type="button">
                                        Send <i class="bi bi-send"></i>
                                    </button>
                                    <button v-else style="height: 40px !important;"
                                        class="btn btn-primary rounded-0 w-100" type="button" disabled>
                                        <span class="spinner-border spinner-border-sm" role="status"
                                            aria-hidden="true"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue';
import EmojiPicker from 'vue3-emoji-picker'
import api from '@/stores/Helpers/axios'
import NoDataShow from '@/components/noDataShow.vue';
import useFxn from '@/stores/Helpers/useFunctions';
import { useProfileStore } from '@/stores/profileStore';
import componentLoadingVue from '@/components/componentLoading.vue';

interface AllConvo {
    data: any[],
    links: object,
    meta: object
}

interface Messages {
    data: any[],
    currentConvoId: string | number,
    isLoading: boolean,
    isSendingMessage: boolean

}

const convos = reactive<AllConvo>({
    data: [],
    links: {},
    meta: {}
})

const convoMessages = reactive<Messages>({
    data: [],
    currentConvoId: '',
    isLoading: false,
    isSendingMessage: false
})

const profileStore = useProfileStore()

const currentRecruiter = computed(() => {
    return convos.data.find(x => x.id == convoMessages.currentConvoId)?.recruiter ?? ''
})

onMounted(() => {
    getAllConversations()
})

async function getAllConversations() {
    // convoMessages.data = []
    try {
        const resp = await api.getAllConversations()
        const conversations = resp.data?.body?.conversations ?? []
        convos.data = conversations.data
        convos.links = conversations.links
        convos.meta = conversations.meta
        // console.log(convos.data);
    } catch (error) {
        // console.log(error);
    }
}

function deleteConversation() {
    useFxn.confirmDelete('Delete this Conversation?', 'Yes, Delete')
        .then(async (response) => {
            if (response.value == true) {
                try {
                    await api.deleteConversationOrMessage(convoMessages.currentConvoId, 'conversation')
                    convoMessages.data = []
                    await getAllConversations()
                    useFxn.toast('Conversation deleted', 'success')
                } catch (error) {
                    // console.log(error);
                }
            }
        })
}

function deleteMessage(msg_id: string | number) {
    useFxn.confirmDelete('Delete this Message?', 'Yes, Delete')
        .then(async (response) => {
            if (response.value == true) {
                try {
                    await api.deleteConversationOrMessage(msg_id, 'message')
                    await getAllConversations()
                    await loadMessages()
                    useFxn.toast('Message deleted', 'success')
                } catch (error) {
                    // console.log(error);
                }
            }
        })
}

async function showMessages(convo_id: string | number) {
    if (convoMessages.currentConvoId != convo_id) {
        convoMessages.isLoading = true
        convoMessages.currentConvoId = convo_id
        await loadMessages()
        convoMessages.isLoading = false
    }
}


async function loadMessages() {
    try {
        const resp = await api.getConversation(convoMessages.currentConvoId)
        convoMessages.data = resp.data?.body?.conversation?.messages ?? [];
    } catch (error) {
        // console.log(error);
    }
}


// sending message
const inputText = ref('')

function onChangeText(new_text: string | undefined) {
    inputText.value = new_text || ''
}
async function sendMessage() {
    if (inputText.value) {
        convoMessages.isSendingMessage = true
        const obj = new FormData();
        obj.append('message', inputText.value)
        obj.append('recipient_id', currentRecruiter.value.id)
        obj.append('conversation_id', JSON.stringify(convoMessages.currentConvoId))

        try {
            await api.createMessage(obj)
            await getAllConversations()
            await loadMessages()
            inputText.value = ''
            convoMessages.isSendingMessage = false
        } catch (error) {
            console.log(error);
        }
    }
}

</script>

<style lang="css" scoped>
.img-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--theme-color-soft);
    border: 1px solid #e8e5e5;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}

.img-circle-large {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background-color: var(--theme-color-soft);
    border: 1px solid #e8e5e5;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
}




/* body {
    background: #651fff;
}

::-webkit-scrollbar {
    width: 10px
}

::-webkit-scrollbar-track {
    background: #eee
}

::-webkit-scrollbar-thumb {
    background: #888
}

::-webkit-scrollbar-thumb:hover {
    background: #555
} */

/* .wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #651FFF
} */


.chat-container {
    height: 300px;
    scroll-behavior: smooth;
    overflow-y: scroll;
    display: flex;
    flex-direction: column-reverse;
}


.img1 {
    border-radius: 50%;
    background-color: #66BB6A
}

.name {
    font-size: 8px
}

.msg {
    background-color: #fff;
    /* font-size: 11px; */
    padding: 5px;
    border-radius: 5px;
    font-weight: 500;
    color: #3e3c3c
}

.between {
    font-size: 8px;
    font-weight: 500;
    color: #a09e9e
}

.dropdown-item.active,
.dropdown-item:active {
    color: var(--bs-dropdown-link-active-color);
    text-decoration: none;
    background-color: transparent !important;
}
</style>

<style>
.v3-input-emoji-picker .v3-input-picker-root .v3-emoji-picker-input {
    border: 1px solid #dee2e6;
}
</style>
