import axios from "axios";
import { authHeader, baseUrl } from '../services/env';
import { AUTH_HEADER, BASE_URL } from '../../services/env'


export default {
    async getPositionsFromApi(userId: any) {
        return axios.post(`${BASE_URL}portfolio/getPosition`, userId, AUTH_HEADER());
    },
}