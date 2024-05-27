import axios from "axios";
import { authHeader, kycURI } from '../services/env';


export default {
    // async getBranchdeatails(userId: any) {
    //     const requestOptions = {
    //         headers: authHeader(),
    //     }
    //     return axios.get(`${kycURI}/reEkycBank/getBank?uccCode=${userId}`, requestOptions);
    // },
    async getIFSCDetails(userId: any, ifscCode: any) {
        const requestOptions = {
            headers: authHeader(),
        }
        return axios.get(`${kycURI}reEkycBank/getBankAdd?uccCode=${userId}&ifsc=${ifscCode}`, requestOptions);
    },

    async saveBankDetails(payload: any) {
        const requestOptions = {
            headers: authHeader(),
        }
        return axios.post(`${kycURI}reEkycBank/saveBank`, payload, requestOptions);
    },
    async getBankDetails(userId: any) {
        const requestOptions = {
            headers: authHeader(),
        }
        return axios.get(`${kycURI}reEkycBank/getBank?uccCode=${userId}`, requestOptions);
    },
    async deleteoldbank(userId: any, accountnum: any) {
        const requestOptions = {
            headers: authHeader(),
        }
        return axios.get(`${kycURI}/reEkycBank/deleteOldBank?uccCode=${userId}&bankAccNo=${accountnum}`, requestOptions);
    },
    async deletenewbank(Id: any,) {
        const requestOptions = {
            headers: authHeader(),
        }
        return axios.get(`${kycURI}/reEkycBank/deleteNewBank?id=${Id}`, requestOptions);
    },
}

