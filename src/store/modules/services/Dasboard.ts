import axios from "axios";
import { authHeader, baseUrl } from '../services/env';


export default {
    async getPositionsFromApi(userId: any) {
        const requestOptions = {
            headers: authHeader(),
        }
        return axios.get(`${baseUrl}boupdate/positionsDetails?ucc=${userId}`, requestOptions);
    },

}