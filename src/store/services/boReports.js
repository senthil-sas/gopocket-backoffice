import axios from "axios";
import { AUTH_HEADER, BASE_URL } from "./env";

export default {
    async getTradebook(payload) {
        const requestOptions = {
            headers: AUTH_HEADER(),
        };
        return axios.post(`${BASE_URL}getTradeBook`, payload, requestOptions).then();
    },
    async getLedgerData(payload) {
        const requestOptions = {
            headers: AUTH_HEADER(),
        }
        return axios.post(`${BASE_URL}getLedger`, payload, requestOptions).then();
    },
};
