import jobsEndPoints from "./endPoints/jobs"
import authEndPoints from "./endPoints/auth"

export default {
    ...jobsEndPoints,
    ...authEndPoints,
}