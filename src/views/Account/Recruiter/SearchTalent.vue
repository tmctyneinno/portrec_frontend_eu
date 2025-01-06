<template>
    <div class="row g-3 m-0 pb-5 justify-content-cente align-items-cente">
        <div class="col-12 mb-3">
            <div class="fw-bold text-capitalize fs-5">Find the Right Talent for Your Project</div>
            <div class="text-muted small">Find the perfect professional from our pool of experts. Browse by
                category, skill, or experience level to connect with the right fit for your needs.
            </div>
        </div>
        <div class="col-lg-6 px-0">
            <SearchUsersForm @done="loadTalents" />
        </div>
        <div class="dropdown col-md-3 d-none" @click="keepDropdownOpen">
            <button ref="filterDropdownToggler" class="btn btn-outline-dark rounded-5 dropdown-toggle w-100"
                type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="bi bi-filter"></i> Filter
            </button>
            <div class="dropdown-menu dropdown-menu-lg-end" aria-labelledby="triggerId">
                <ul class="list-group list-group-flush">
                    <li @click="updateFilteredList(category.id)" v-for="category in categoriesDropdown"
                        :key="category.id" class="list-group-item text-wrap cursor-pointer xsmall border-0">
                        <div class="row g-3">
                            <div class="col-1">
                                <i v-if="isAddedTofilteredList(category.id)"
                                    class="bi bi-check-circle-fill theme-color"></i>
                                <i v-else class="bi bi-circle"></i>

                            </div>
                            <div class="col">
                                <div class="fw-bolder">
                                    {{ category.name }}
                                </div>
                                <div class="small">{{ category.desc }}</div>
                            </div>
                        </div>


                    </li>
                </ul>

                <div class="apply-filter float-end mx-2 mt-2">
                    <primaryButton @click="filterItems" className="btn-sm">
                        Apply filter
                    </primaryButton>
                </div>
            </div>

        </div>
        <div class="col-12 bg-light min-vh-100 p-2 px-lg-4 rounded-4">
            <div class="fs-4 mb-3" style="font-weight: 500;">Featured Talent</div>
            <div class="row g-3">
                <div v-if="!talents.length" class="min-vh-50 d-flex justify-content-center align-items-center">
                    <emptyDataComponent :text="'No result to Show.'" />
                </div>

                <div v-else class="row g-3">
                    <userProfileCard v-for="talent in talents" :key="talent.id" :user-profile="talent" />
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import userProfileCard from '@/components/userProfileCard.vue';
import type { UserProfileCardInterface } from '@/stores/interfaces';
import SearchUsersForm from '@/components/searchUsersForm.vue';

const talents = ref<UserProfileCardInterface[]>([])


function loadTalents(data: UserProfileCardInterface[]) {
    // console.log(data);
    talents.value = data
}


// dropdown #######################################
const filteredList = ref<number[]>([])
const filterDropdownToggler = ref<any>(null)

const categoriesDropdown = ref([
    { id: 1, name: 'Developers', desc: 'Frontend, Backend, Full Stack, Mobile App...' },
    { id: 2, name: 'Designers', desc: 'UI/UX, Graphic Design, Product Design...' },
    { id: 3, name: 'Writers', desc: 'Copywriters, Content creators, Technical writers...' },
    { id: 4, name: 'Marketers', desc: 'SEO Experts, Social Media Managers, PPC Specialists...' },
    { id: 5, name: 'Project Managers', desc: 'Digital Project Manager, IT Project Manager, Scrum Master...' },
    { id: 6, name: 'Finance Expert', desc: 'Financial Modeler, Fundraising Advisor, Accountant...' },
])

function updateFilteredList(id: number) {
    if (!filteredList.value.includes(id)) filteredList.value.push(id)
    else filteredList.value = filteredList.value.filter((x: number) => x !== id)
    // filterDropdownToggler.value?.click()
}

const isAddedTofilteredList = (id: number) => {
    return filteredList.value.find((x: number) => x == id)
}

const keepDropdownOpen = (event: any) => {
    event.stopPropagation();
};

function filterItems() {
    filterDropdownToggler.value?.click()
}


</script>

<style lang="css" scoped>
.dropdown-toggle::after {
    content: none !important;
}

.list-group-flush {
    height: 50vh;
    overflow-y: auto;

}

.dropdown-menu {
    width: 100%;
}

.dropdown-item:hover {
    color: var(--theme-color);
    background: transparent;
}
</style>
