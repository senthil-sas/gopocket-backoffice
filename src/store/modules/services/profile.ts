import axios from "axios";
import { authHeader, baseUrl } from '../services/env';
import { AUTH_HEADER, BASE_URL } from '../../services/env'

export default {
    async getProfileDataFromApi(userId: any) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${baseUrl}boupdate/getCustomerDls?ucc=${userId}`, requestOptions);
    },

    async getHoldingsFromApi(userId: any) {
        return axios.post(`${BASE_URL}portfolio/getHoldings`, userId, AUTH_HEADER());

    },

    async getNomineeDetails(userId: any) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${baseUrl}boupdate/UpdateNomineeDetails?ucc=${userId}`, requestOptions);

    }
}
