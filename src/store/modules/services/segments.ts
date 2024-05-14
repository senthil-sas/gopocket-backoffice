import axios from "axios";
import { authHeader, kycURI } from '../services/env';

export default {
    async saveSegmentDetails(payload: any) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.post(`${kycURI}reEkycSegment/saveSegment`, payload, requestOptions).then();
    },

    async getsegmentDetails(userId: any) {
        const requestOptions = {
            headers: authHeader(),
        };

        return axios.get(`${kycURI}/reEkycSegment/getSegment?uccCode=${userId}`, requestOptions).then();
    },

    async reKYCsegment(userId: any) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${kycURI}/reEkycSegment/getReekycSegment?uccCode=AB0009${userId}`, requestOptions).then();
    },

}
