import { $instance, $instanceJobs } from '../instances'

export default {

    allJobs(queryStr?: string) {
        return $instance.get(`job/all${queryStr}`)
    },

    latestJobs() {
        return $instance.get(`job/all/latest`)
    },

    jobDetails(id: any) {
        return $instanceJobs.get(`job/${id}`)
    },

    similarJobs(id: any) {
        return $instanceJobs.get(`job/all/similar/${id}`)
    },

    jobCategories() {
        return $instanceJobs.get(`job/categories`)
    },

    jobTypes() {
        return $instanceJobs.get(`job/types`)
    },

    jobLevels() {
        return $instanceJobs.get(`job/levels`)
    },

    jobFunctions() {
        return $instanceJobs.get(`job/functions`)
    },

    skills() {
        return $instanceJobs.get(`skills`)
    },

    searchByLocation(title: string, location: string) {
        // return $instance.get(`/job/search?location=fIe790x166&title=JuPAEBt7nY`)
        return $instance.get(`/job/search?location=${location}&title=${title}`)
    }
}