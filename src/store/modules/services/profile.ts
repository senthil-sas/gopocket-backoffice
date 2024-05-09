import axios from "axios";
import { authHeader, baseUrl } from '../services/env';

export default {
    async getProfileDataFromApi(userId: any) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${baseUrl}boupdate/getCustomerDls?ucc=${userId}`, requestOptions);
    },

    async getHoldingsFromApi(userId: any) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${baseUrl}boupdate/holdingsDetails?ucc=${userId}`, requestOptions);

    },

    async getNomineeDetails(userId: any) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${baseUrl}boupdate/UpdateNomineeDetails?ucc=${userId}`, requestOptions);

    }
}
