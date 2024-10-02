import axios from 'axios'
import { type ProgressFinisher, useProgress } from '@marcoschulte/vue3-progress';
// import useFxn from "@/stores/Helpers/useFunctions";
// @ts-ignore
import Cookies from 'js-cookie';

const progresses = [] as ProgressFinisher[];

const hostURL = import.meta.env.VITE_API_URL;
// const hostURL = 'https://api.portrec.ng';
const apiURL = `${hostURL}/api/`;

const contentHeaders = (type: 'form' | 'json') => {
    return {
        Accept: 'application/json',
        withCredentials: true,
        'Content-Type': type == 'json' ? 'application/json' : 'multipart/form-data',
    }
}


// create instances #######################################################
const $instance = axios.create({
    baseURL: apiURL,
    headers: contentHeaders('json')
})

const $instancePublic = axios.create({
    baseURL: apiURL,
    headers: contentHeaders('json'),
})
const $instanceForm = axios.create({
    baseURL: apiURL,
    headers: contentHeaders('form'),
})



// create interceptor for renewing token ##########################################3
const setAuthorizationAndAddProgress = (config: any) => {
    const token = Cookies.get('PortrecTkn');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    progresses.push(useProgress().start());

    // if (!useFxn.isOnline()) {
    //     useFxn.toast('You are offline', 'error')
    //     return
    // }

    return config;
};

const finishProgressAndReturnResponse = (resp: any) => {
    progresses.pop()?.finish();

    return resp;
}

$instance.interceptors.request.use(setAuthorizationAndAddProgress);
$instanceForm.interceptors.request.use(setAuthorizationAndAddProgress);

$instance.interceptors.response.use(finishProgressAndReturnResponse, error => {
    progresses.pop()?.finish();
    return Promise.reject(error);
});

$instanceForm.interceptors.response.use(finishProgressAndReturnResponse, error => {
    progresses.pop()?.finish();
    return Promise.reject(error);
});

export {
    $instance, $instancePublic, $instanceForm
}