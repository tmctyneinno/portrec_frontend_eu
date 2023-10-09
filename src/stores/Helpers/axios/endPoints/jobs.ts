import { $instance } from '../instances'

export default {

    allJobs() {
        return $instance.get(`job/all`)
    },

    latestJobs() {
        return $instance.get(`job/all/latest`)
    },

    jobDetails(id: any) {
        return $instance.get(`job/${id}`)
    },

    jobCategories() {
        return $instance.get(`job/categories`)
    },

    jobTypes() {
        return $instance.get(`job/types`)
    },

    jobFunctions() {
        return $instance.get(`job/functions`)
    },
}