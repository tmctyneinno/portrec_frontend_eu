// @ts-nocheck

//bootstrap@5.3.2
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

//bootstrap-icons
import 'bootstrap-icons/font/bootstrap-icons.css'

// custom css
import './assets/css/custom.css'

// animate.css
import 'animate.css';

//https://michalsnik.github.io/aos/
import "aos/dist/aos.css";

// vue3-carousel
import 'vue3-carousel/dist/carousel.css'

// vue3-datepicker
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

//vue-select@beta
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

// vue-sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// vue3-easy-data-table 
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

//Vue3ProgressPlugin
import { Vue3ProgressPlugin } from '@marcoschulte/vue3-progress';
import '@marcoschulte/vue3-progress/dist/index.css';

//vue3-apexcharts
import VueApexCharts from "vue3-apexcharts";

// https://github.com/pratik227/vue3-json-excel
import JsonExcel from "vue-json-excel3";

// vue-writer
import VueWriter from "vue-writer";

// https://vue3-infinite-loading.netlify.app/guide/installation.html
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

// https://www.npmjs.com/package/vue3-emoji-picker
import 'vue3-emoji-picker/css'

//https://vcalendar.io/getting-started/installation.html
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

// https://vue3-google-signin.vercel.app/guide/
import GoogleSignInPlugin from "vue3-google-signin"

// https://vue-tel-input.iamstevendao.com/guide/getting-started.html
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';

// https://tomosterlund.github.io/qalendar/guide.html
import 'qalendar/dist/style.css'

// https://www.npmjs.com/package/@fullcalendar/vue3 #####################

// https://www.npmjs.com/package/country-state-city
// npm i country-state-city

import piniaPersist from 'pinia-plugin-persist'

import jobsDisplayVue from '@/components/templates/jobsDisplay.vue';
import overlayLoading from '@/components/templates/overlayLoading.vue';
import emptyDataComponent from '@/components/templates/emptyDataComponent.vue';
import componentLoading from '@/components/templates/componentLoading.vue';
import customPagination from '@/components/templates/customPagination.vue';

import primaryButton from '@/components/buttons/primaryButton.vue';
import primaryButtonOutline from '@/components/buttons/primaryButtonOutline.vue';
import primaryButtonLoading from '@/components/buttons/primaryButtonLoading.vue';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)

app.component('VueDatePicker', VueDatePicker);
app.component('vSelect', vSelect);
app.component('EasyDataTable', Vue3EasyDataTable);
app.component("downloadExcel", JsonExcel);
app.component("infinite-loading", InfiniteLoading);
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)
app.component('customPagination', customPagination)

// custom components
app.component('jobsDisplayVue', jobsDisplayVue)
app.component('overlayLoading', overlayLoading)
app.component('emptyDataComponent', emptyDataComponent)
app.component('componentLoading', componentLoading)
app.component('primaryButton', primaryButton)
app.component('primaryButtonOutline', primaryButtonOutline)
app.component('primaryButtonLoading', primaryButtonLoading)

app.use(GoogleSignInPlugin, {
    // clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    clientId: '',
});
app.use(pinia)
app.use(VueApexCharts);
app.use(VueSweetalert2);
app.use(Vue3ProgressPlugin);
app.use(VueWriter);
app.use(setupCalendar, {});
app.use(VueTelInput);
app.use(router);

app.mount('#app')
