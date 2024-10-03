import axios from "axios";
import { AUTH_HEADER, BASE_URL } from "./env";

export default {
    async getTradebook(payload) {
        return axios.post(`${BASE_URL}getTradeBook`, payload, AUTH_HEADER())
    },
    async getLedgerData(payload) {
        return axios.post(`${BASE_URL}getLedger`, payload, AUTH_HEADER())
    },
    async getProfileDetails() {
        return axios.get(`${BASE_URL}getprofile`, AUTH_HEADER())
    },
    async getBankDetails() {
        return axios.get(`${BASE_URL}getBankDetails`, AUTH_HEADER())
    },
    async getNomineeDetails() {
        return axios.get(`${BASE_URL}getNominee`, AUTH_HEADER())
    },
};
