<template>
    <div class="row g-3 mt-2 px-3">
        <div class="col-12 mb-5">
            <h4 class="fw-bold text-center">Upgrade to the plan that will best meets your needs</h4>
            <div class="small text-center text-muted">
                Upgrade to stand out and land your dream job.
            </div>
        </div>
        <div class="col-md-6">
            <div class="card h-100 border-0 shadow">
                <div class="card-body">
                    <div class="card-title">
                        <span class="theme-color fw-bold">Free</span>
                        <span v-if="profileStore.data?.is_subscribed != 2"
                            class="float-end xsmall alert alert-warning p-0 px-2 border-0">
                            You are on <strong>FREE</strong> PLAN
                        </span>
                        <div class="text-muted small mt-3">
                            Create your profile, apply for jobs, and explore opportunities without any charges.
                        </div>
                    </div>

                    <hr>

                    <ul v-if="freePlan?.subcription_data" class="list-group list-group-flush small">
                        <li class="list-group-item d-flex border-0" v-for="(item, index) in freePlan.subcription_data"
                            :key="index">
                            <div class="col-1">
                                <i class="bi bi-check2-all"></i>
                            </div>
                            <div class="fw-bold">
                                {{ item.information }}
                            </div>
                        </li>
                    </ul>

                    <div v-else>
                        <componentLoading />
                    </div>

                    <hr>
                    <!-- <primaryButton :className="'w-100'">
                        Continue with Free Subscription
                    </primaryButton> -->
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card h-100 border-0 shadow">
                <div class="card-body">
                    <div class="card-title">
                        <span class="theme-color fw-bold">Premium</span>
                        <span v-if="profileStore.data?.is_subscribed == 2"
                            class="float-end xsmall alert alert-warning p-0 px-2 border-0">
                            You are on <strong>PREMIUM</strong> PLAN
                        </span>
                        <primaryButton v-else @click="subscriptionStore.launchModal('options', premiumPlan.amount)"
                            :className="'btn-sm float-end'">
                            Upgrade
                        </primaryButton>
                        <div class="text-muted small mt-3">
                            Unlock access to a premium CV database and search for top candidates to streamline your
                            hiring process and find the best talent quickly.


                        </div>
                        <div v-if="premiumPlan?.subcription_data" class="fw-bold mt-3" style="font-size: 1.47rem;">
                            &#8358;{{ useFxn.addCommas(premiumPlan?.amount ?? 0) }} <sub>/month</sub>
                        </div>
                    </div>

                    <hr>

                    <ul v-if="premiumPlan?.subcription_data" class="list-group list-group-flush small">
                        <li class="list-group-item d-flex border-0"
                            v-for="(item, index) in premiumPlan.subcription_data" :key="index">
                            <div class="col-1">
                                <i class="bi bi-check2-all"></i>
                            </div>
                            <div class="fw-bold">
                                {{ item.information }}
                            </div>
                        </li>
                    </ul>

                    <div v-else>
                        <componentLoading />
                    </div>

                    <hr>
                    <primaryButton v-if="profileStore.data?.is_subscribed != 2"
                        @click="subscriptionStore.launchModal('options', premiumPlan.amount)" :className="'w-100'">
                        Upgrade to Premium
                    </primaryButton>
                </div>
            </div>
        </div>
    </div>
    <optionsModal />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import useFxn from '@/stores/Helpers/useFunctions';
import { useSubscriptionStore } from '@/components/subscriptions/subscriptionStore';
import optionsModal from '@/components/subscriptions/optionsModal.vue';
import { useProfileStore } from '@/stores/profileStore';

const subscriptionStore = useSubscriptionStore()
const profileStore = useProfileStore()

const freePlan = ref<any>(null)
const premiumPlan = ref<any>(null)

onMounted(() => {
    loadSubscriptionsData()
})

async function loadSubscriptionsData() {
    await subscriptionStore.getSubscriptions()
    freePlan.value = subscriptionStore.userPlanDetails('Free')
    premiumPlan.value = subscriptionStore.userPlanDetails('Premium')
}

</script>

<style lang="css" scoped></style>
