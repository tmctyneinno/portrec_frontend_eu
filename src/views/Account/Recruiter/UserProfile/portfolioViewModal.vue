<template>
    <div>

        <button ref="openPortfolioModal" class="btn d-none" data-bs-toggle="modal" data-bs-target="#portfolioViewModal">
        </button>

        <div class="modal  fade" id="portfolioViewModal" tabindex="-1" data-bs-backdrop="stati" data-bs-keyboard="false"
            role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header border-0">

                        <h5 class="modal-title fw-bold text-center">
                            {{ user.portfolio?.title ?? 'Portfolio' }}
                        </h5>
                        <button ref="closePortfolioModal" type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body" ref="modalTop">
                        <div class="row g-3">
                            <div class="col-lg-6">
                                <div class="mb-3">
                                    <div class="card border-0">
                                        <div class="card-title fw-bolder">Portfolio description</div>
                                        <div class="card-text">
                                            {{ user.portfolio?.description }}
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="card border-0">
                                        <div class="card-title fw-bolder">Skills</div>
                                        <div class="card-text">
                                            <span v-for="(skill, i) in userSkills" :key="i"
                                                class="category-tag text-nowrap d-inline-block mb-2">
                                                {{ skill }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="card border-0">
                                        <div class="card-title fw-bolder">Technology used</div>
                                        <div class="card-text">
                                            <ul>
                                                <li>Laravel</li>
                                                <li>Vue js</li>
                                                <li>MySql</li>
                                                <li>Restful APIs</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <div class="card border-0">
                                        <div class="card-title fw-bolder">Portfolio URL</div>
                                        <div class="card-text">
                                            <a v-if="user.portfolio?.project_url"
                                                :href="'https://' + user.portfolio.project_url" target="_blank">
                                                {{ user.portfolio.project_url }}
                                            </a>
                                            <span class="text-muted small" v-else>No URL provided</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="mb-3">
                                    <div class="card border-0">
                                        <div class="portfolio-container">
                                            <div v-for="(image, index) in user.portfolio?.images ?? ''" :key="index"
                                                class="portfolio-item text-wrap card hover-tiltY">
                                                <img class="portfolio-image" :src="image" alt="image">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="card border-0">
                                        <div class="card-title fw-bolder">Key Achivements</div>
                                        <div v-if="user.portfolio?.achievements" v-html="user.portfolio?.achievements"
                                            class="card-text">
                                        </div>
                                        <div class="text-muted small" v-else>No Achivements added.</div>

                                    </div>
                                </div>
                            </div>
                            <hr class="faint">
                            <div class="col-12">
                                <div class="fw-bold">More projects by {{ user.profile?.name ?? 'this User' }}</div>
                                <div class="portfolio-container">
                                    <div @click="updatePortfolioToThis(item)" v-for="(item, index) in otherPortfolios"
                                        :key="index" class="portfolio-item text-wrap card hover-tiltY">
                                        <img class="portfolio-image" :src="item.images[0]" alt="image">
                                        <div class="portfolio-content">
                                            <div class="portfolio-title">{{ item.title ?? 'Portfolio' }} </div>
                                            <div class="portfolio-desc">{{ useFxn.truncateStr(item.description, 25) }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-light " data-bs-dismiss="modal"
                            aria-label="Close">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { onBeforeRouteLeave, } from 'vue-router';
import { useRecruiterCommonStore } from '../RecruiterCommonStore'
import { storeToRefs } from 'pinia';
import useFxn from '@/stores/Helpers/useFunctions';

const recruiterCommonStore = useRecruiterCommonStore()

const { userProfile: user } = storeToRefs(recruiterCommonStore)

// modal
const openPortfolioModal = ref<any>(null)
const closePortfolioModal = ref<any>(null)


const userSkills = computed(() => {
    const userSkills = user.value?.profile?.skill || [];
    return userSkills.map((x: { skills: { name: any; }; }) => x.skills.name)
})

const otherPortfolios = computed(() => {
    return (user.value.profile?.portfolios ?? []).filter((x: { id: string }) => x.id !== user.value.portfolio?.id)
})


const modalTop = ref<any>(null)
function updatePortfolioToThis(item: any) {
    user.value.portfolio = item
    modalTop.value?.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}


watch(() => user.value.portfolioModal, () => {
    openPortfolioModal.value.click()
});

onBeforeRouteLeave(() => {
    closePortfolioModal.value.click()
})







</script>

<style scoped>
@import '@/assets/css/portfolioView.css';
</style>
