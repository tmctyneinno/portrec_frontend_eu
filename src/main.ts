//bootstrap@5.3.2
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

//bootstrap-icons
import 'bootstrap-icons/font/bootstrap-icons.css'

// custom css
import './assets/css/main.css'

// animate.css
import 'animate.css';

// vue3-carousel
import 'vue3-carousel/dist/carousel.css'

// vue3-datepicker
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

// @ts-ignore
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

//vue3-apexcharts
import VueApexCharts from "vue3-apexcharts";

// @ts-ignore
// https://github.com/pratik227/vue3-json-excel
import JsonExcel from "vue-json-excel3";

// @ts-ignore
import VueWriter from "vue-writer";

// https://vue3-infinite-loading.netlify.app/guide/installation.html
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

// https://beholdr.github.io/maska/#/?id=install

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('VueDatePicker', VueDatePicker);
app.component('vSelect', vSelect);
app.component('EasyDataTable', Vue3EasyDataTable);
app.component("downloadExcel", JsonExcel);
app.component("infinite-loading", InfiniteLoading);

app.use(createPinia())
app.use(VueApexCharts);
app.use(VueSweetalert2);
app.use(Vue3ProgressPlugin);
app.use(VueWriter);
app.use(router);

app.mount('#app')
