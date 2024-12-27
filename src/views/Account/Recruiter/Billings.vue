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
                        <primaryButton @click="subscriptionStore.launchModal('options')"
                            :className="'btn-sm float-end'">
                            Subscribe
                        </primaryButton>
                        <div class="text-muted small mt-3">
                            Create your profile, apply for jobs, and explore opportunities without any charges.
                        </div>
                    </div>

                    <hr>

                    <ul class="list-group list-group-flush small">
                        <li class="list-group-item d-flex border-0" v-for="(item, index) in subscriptionStore.freePlan"
                            :key="index">
                            <div class="col-1">
                                <i class="bi bi-check2-all"></i>
                            </div>
                            <div :class="['col', !item.lineThrough ? 'fw-bold' : 'text-decoration-line-through']">
                                {{ item.desc }}
                            </div>
                        </li>
                    </ul>

                    <hr>
                    <primaryButton :className="'w-100'">
                        Continue with Free Subscription
                    </primaryButton>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card h-100 border-0 shadow">
                <div class="card-body">
                    <div class="card-title">
                        <span class="theme-color fw-bold">Premium</span>
                        <primaryButton @click="subscriptionStore.launchModal('options')"
                            :className="'btn-sm float-end'">
                            Upgrade
                        </primaryButton>
                        <div class="text-muted small mt-3">
                            Unlock access to a premium CV database and search for top candidates to streamline your
                            hiring process and find the best talent quickly.
                        </div>
                        <div class="fw-bold mt-3" style="font-size: 1.47rem;">
                            &#8358;{{ useFxn.addCommas(subscriptionStore.premiumPrice) }} <sub>/month</sub>
                        </div>
                    </div>

                    <hr>

                    <ul class="list-group list-group-flush small">
                        <li class="list-group-item d-flex border-0"
                            v-for="(item, index) in subscriptionStore.premiumPlan" :key="index">
                            <div class="col-1">
                                <i class="bi bi-check2-all"></i>
                            </div>
                            <div :class="['col', !item.lineThrough ? 'fw-bold' : 'text-decoration-line-through']">
                                {{ item.desc }}
                            </div>
                        </li>
                    </ul>

                    <hr>
                    <primaryButtonOutline :className="'w-100 mb-2'">
                        Try 1 month FREE
                    </primaryButtonOutline>
                    <primaryButton :className="'w-100'">
                        Upgrade to Premium
                    </primaryButton>
                </div>
            </div>
        </div>
    </div>
    <optionsModal />
</template>
<script lang="ts" setup>
import useFxn from '@/stores/Helpers/useFunctions';
import { useSubscriptionStore } from '@/components/subscriptions/subscriptionStore';
import optionsModal from '@/components/subscriptions/optionsModal.vue';

const subscriptionStore = useSubscriptionStore()

</script>

<style lang="css" scoped></style>
