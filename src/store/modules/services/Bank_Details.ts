import axios from "axios";
import { authHeader, kycURI } from '../services/env';


export default {
    async getBranchdeatails(userId: any) {
        const requestOptions = {
            headers: authHeader(),
        }
        return axios.get(`${kycURI}/reEkycBank/getBank?uccCode=${userId}`, requestOptions);
    },

}