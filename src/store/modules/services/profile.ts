import axios from "axios";
import { authHeader, baseUrlTemp } from '../services/env';

export default {
    async getProfileDataFromApi(userId: any) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${baseUrlTemp}resource/Customer/${userId}`, requestOptions);
    },

    async getHoldingsFromApi(userId: any) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${baseUrlTemp}method/cs_bo.custom_api.holding.get_holdings?ucc=${userId}`, requestOptions);

    },

    async getNomineeDetails(userId: any) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${baseUrlTemp}method/cs_bo.custom_api.cus_nominee_details.get_customer_nominee_details?ucc_code=${userId}`, requestOptions);

    }
}
