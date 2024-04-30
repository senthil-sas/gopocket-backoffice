import axios from "axios";
import { authHeader, kycURI } from '../services/env';


export default {
    // async getBranchdeatails(userId: any) {
    //     const requestOptions = {
    //         headers: authHeader(),
    //     }
    //     return axios.get(`${kycURI}/reEkycBank/getBank?uccCode=${userId}`, requestOptions);
    // },
    async getIFSCDetails(userId, ifscCode) {
        const requestOptions = {
            headers: authHeader(),
        }
        return axios.get(`${kycURI}reEkycBank/getBankAdd?uccCode=${userId}&ifsc=${ifscCode}`, requestOptions);
    },

    async saveBankDetails(payload) {
        const requestOptions = {
            headers: authHeader(),
        }
        return axios.post(`${kycURI}reEkycBank/saveBank`, payload, requestOptions);
    },
    async getBankDetails(userId) {
        const requestOptions = {
            headers: authHeader(),
        }
        return axios.get(`${kycURI}reEkycBank/getBank?uccCode=${userId}`, requestOptions);
    },
}