import axios from "axios";
import { AUTH_HEADER, BASE_URL } from "./env";

export default {
    async getTradebook(payload) {
        return axios.post(`${BASE_URL}cosmos/getTradeBook`, payload, AUTH_HEADER())
    },
    async getLedgerData(payload) {
        return axios.post(`${BASE_URL}cosmos/getLedger`, payload, AUTH_HEADER())
    },
    async getProfileDetails() {
        return axios.get(`${BASE_URL}cosmos/getprofile`, AUTH_HEADER())
    },
    async getBankDetails() {
        return axios.get(`${BASE_URL}cosmos/getBankDetails`, AUTH_HEADER())
    },
    async getNomineeDetails() {
        return axios.get(`${BASE_URL}cosmos/getNominee`, AUTH_HEADER())
    },
    async getDematData(payload) {
        return axios.post(`${BASE_URL}portfolio/getDematId`, payload, AUTH_HEADER())
    }
};
