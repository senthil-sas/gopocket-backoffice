import axios from "axios";
import { authHeader, kycURI } from './env';


export default {
    async getDocuments(documentId, userId) {
        const requestOptions = {
            headers: authHeader(),
        }
        return axios.get(`${kycURI}reEkycdoc/sendDocMail?docType=${userId}&uccCode=${documentId}`, requestOptions);
    },

    async incomeupload(json) {
        const requestOptions = {
            headers: authHeader(),
        }
        return axios.post(`${kycURI}reEkycdoc/upload/`, json, requestOptions);
    },

}