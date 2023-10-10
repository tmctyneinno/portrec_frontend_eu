import { $instance, $instanceJobs } from '../instances'

export default {

    allJobs() {
        return $instanceJobs.get(`job/all`)
    },

    latestJobs() {
        return $instance.get(`job/all/latest`)
    },

    jobDetails(id: any) {
        return $instanceJobs.get(`job/${id}`)
    },

    jobCategories() {
        return $instanceJobs.get(`job/categories`)
    },

    jobTypes() {
        return $instanceJobs.get(`job/types`)
    },

    jobFunctions() {
        return $instanceJobs.get(`job/functions`)
    },
}