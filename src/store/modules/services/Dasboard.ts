import axios from "axios";
import { AUTH_HEADER, BASE_URL, WEB_BASE_URL } from '../../services/env'


export default {
    async getPositionsFromApi(userId: any) {
        return axios.post(`${BASE_URL}portfolio/getPosition`, userId, AUTH_HEADER());
    },
    async getFundsDetails(userId: any) {
        return axios.get(`${WEB_BASE_URL}funds-rest/funds/limits`, AUTH_HEADER());
    },
}