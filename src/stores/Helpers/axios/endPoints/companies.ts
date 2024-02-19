import { $instance } from '../instances'

export default {
    companiesList(search = '', page: number) {
        return $instance.get(`/company?page=${page}&search=${search}`)
    },

    companiesSort() {
        return $instance.get(`/company?sort=latest`)
    },

    companiesFilter(industry_id: string | number) {
        return $instance.get(`/company?filter=${industry_id}`)
    },

    companyDetails(company_id: string | number) {
        return $instance.get(`/company/details/${company_id}`)
    },
}