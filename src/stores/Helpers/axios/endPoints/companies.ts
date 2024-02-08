import { $instance } from '../instances'

export default {
    companiesList(search = 'Alice') {
        return $instance.get(`/company?search=${search}`)
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