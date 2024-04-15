import axios from "axios";
import { authHeader, kycURI } from '../services/env';

export default {
    async loginEmailAndMobile(requestData) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.post(`${kycURI}reEkyc/logIn`, requestData, requestOptions);
    },
    async verifylogin(requestData) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.post(`${kycURI}reEkyc/verifyLogin`, requestData, requestOptions);
    },
}
