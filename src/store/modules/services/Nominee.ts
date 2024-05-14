import axios from "axios";
import { authHeader, kycURI } from '../services/env';

export default {
    async saveNomineeDetails(payload: any) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.post(`${kycURI}ReEkycnominee/uploadNominee`, payload, requestOptions).then();
    },
    async deleteNominee(payload: any) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${kycURI}ReEkycnominee/deleteNom/?uccCode=${payload.uccCode}&id=${payload.id}`, requestOptions).then();
    },
    async NomineeDetails(userId: any) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${kycURI}ReEkycnominee/getNominee/?uccCode=${userId}`, requestOptions).then();
    },

    async saveSharePercent(payload: any) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.post(`${kycURI}/ReEkycnominee/updateNomAlloc`, payload, requestOptions).then();
    },
    async deleteOldNominee(nomineeID: any) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${kycURI}/ReEkycnominee/deleteOldNominee?uccCode=${nomineeID.uccCode}&nomineeID=${nomineeID.id}`, requestOptions).then();
    },
    async getOldDeleteNominee(userId: any) {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${kycURI}ReEkycnominee/getOldDeleteNominee?uccCode=${userId}`, requestOptions).then();
    }

}
