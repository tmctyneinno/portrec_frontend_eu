<template>
    <modal_template>

        <template #title>
            <div class="fw-bold text-muted fs-5">Quiz</div>
            <div class="small text-muted lh-1 mb-2">
                The following is required to be invited for interview
            </div>
        </template>

        <template #form>
            <div class="col-12" v-for="qst in store.currentJob.questions" :key="qst.id">
                <label class="fw-bold small">
                    {{ qst.questions }}
                </label>
                <input v-model="qst.answer_text" :id="'question_' + qst.id" type="text" class="form-control rounded-0"
                    placeholder="type answer here..">
            </div>

        </template>

        <template #buttons>
            <div class="row">
                <div class="col-6">
                    <button @click="store.switchModal(-1)" type="button"
                        class="btn btn-outline-dark rounded-0 w-100">Back</button>
                </div>
                <div class="col-6">
                    <button :disabled="hasNotFullyAnswered" @click="store.switchModal(+1)" type="button"
                        class="btn btn-primary rounded-0 w-100">Next</button>
                </div>
            </div>
        </template>

    </modal_template>

</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useJobApplicationStore } from '@/stores/jobApplicationStore';
import modal_template from './modal_template.vue';

const store = useJobApplicationStore()

onMounted(() => {
    // if (!store.currentJob.questions.length) store.switchModal(+1)
})

const hasNotFullyAnswered = computed(() => {
    const quiz = store.currentJob.questions
    // eslint-disable-next-line no-prototype-builtins
    return quiz.some((obj: any) => !obj.hasOwnProperty('answer_text') || obj.answer_text === "");
})

</script>
