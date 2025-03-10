<template>
    <div class="bg-white py-4">
        <div class="container ">
            <carousel class="px-4 px-lg-0" :items-to-show="itemsToShow" snapAlign="start" :autoplay="5000"
                :wrapAround="true">
                <slide class="col-6" v-for="slide in whatOurClientsSay" :key="slide.name">
                    <div class="card border-0">
                        <div class="card-body">
                            <div class="d-flex justify-content-center text-muted">
                                <!-- <img :src="`/images/${slide.image}`" width="50" alt=""> -->
                                <i class="bi bi-person-circle text-muted2 fs-2"></i>
                            </div>
                            <div class="text-center fw-bold">
                                {{ slide.name }}
                            </div>
                            <div class="text-center text-muted small">
                                {{ slide.role }}
                            </div>
                            <div class="text-center small fst-italic">
                                "{{ slide.text }}."
                            </div>
                        </div>
                    </div>
                </slide>

                <template #addons>
                    <!-- <navigation /> -->
                    <!-- <pagination /> -->
                </template>
            </carousel>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core';
import { computed } from 'vue';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

interface ClientInterface {
    image: string, name: string, role?: string, text: string
}

const whatOurClientsSay: ClientInterface[] = [
    {
        name: `Ms. Adebola Olamide`,
        role: `Senior Admin Executive @KINDELL LTD`,
        text: `With Portrec Resourcing handling our recruitment, it has been so easy and seamless to get the right talents for our preferred roles`,
        image: ``,
    },
    {

        name: `Mrs Abdullahi`,
        role: `CEO @CRAFTIES LTD`,
        text: `when it comes to talent outsourcing and getting the right candidates to get the job done; just trust Portrec Resourcing to deliver anytime and any day`,
        image: ``,
    },
    {

        name: `Mr Olufemi Oluwole`,
        role: `CEO @REHOBOTH LTD`,
        text: `You need the best and most reliable Outsourcing company to relieve you of the stress of your organizational HR and recruitment activities, Portrec Resourcing is always at your disposal`,
        image: ``,
    },
    {

        name: `Mr Rafiu Kolapo`,
        role: `Head Of Operations @ABLLAT NIG LTD`,
        text: `We have never struggled for once when it comes to recruitment because Portrec Resourcing has always been there for us, the more reason we have been together on this recruitment journey for almost 4 years now`,
        image: ``,
    },
    {

        name: `Mr Adedokun`,
        role: `Head Of Savings @NEPTUNE MFB`,
        text: `When HR, outsourcing begins to give us headache; boom! We call on our life saver Portrec Resourcing team to get the job done and do you know what? They deliver!`,
        image: ``,
    },
    {

        name: `Nonye Emem`,
        role: `HR Manager @HEADWAY MFB`,
        text: `Just to ascertain our level of trust, commitment and professionalism in Portrec Services; we don’t go through final stages of interviews with our candidates from Portrec because they provide the best and most reliable talents for our organization.`,
        image: ``,
    },
    {

        name: `Taller Rhoda`,
        role: `Account Officer @ABLLAT NIG LTD`,
        text: `Early year 2022 when I was in search of an accounting role after I graduated from the university, it has really been so difficult landing my dream job as an intern in the accounting field; not until I was introduced to Portrec Resourcing, a hub where talents meet business and I landed my first internship experience as an accountant and ever since then my career story has changed`,
        image: ``,
    },
    {

        name: `Mr Dimeji Olajide`,
        role: `Head Of Operations @NUKREATIONZ `,
        text: `The team at Portrec are really amazing and always delivering and as a result of this, they have been are only most trusted and reliable recruitment partner`,
        image: ``,
    },
    {

        name: `Mr Sunilkumar Cheringal`,
        role: `Operations Manager @NIGERCHIN Electrical Devt Company`,
        text: `I can remember vividly very well when our organization was in dire need of talents who have special technical abilities to resume with us; after searching fruitlessly for months and then Portrec Resourcing came with the magic hands and expertise and got us the right talents who are still currently working with us now.`,
        image: ``,
    },

]

const screenWidth = useWindowSize()
const itemsToShow = computed(() => { return screenWidth.width.value > 988 ? 3 : 1; })


</script>
<style scoped></style>