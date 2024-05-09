import axios from "axios";
import { authHeader, kycURI } from '../services/env';

export default {
    async saveNomineeDetails(payload) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.post(`${kycURI}ReEkycnominee/uploadNominee`, payload, requestOptions).then();
    },
    async deleteNom() {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${kycURI}ReEkycnominee/deleteNom/?uccCode=AB0009&id=2`, requestOptions).then();
    },
    async NomineeDetails(userId) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${kycURI}ReEkycnominee/getNominee/?uccCode=${userId}`, requestOptions).then();
    }


}
