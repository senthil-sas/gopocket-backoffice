import axios from "axios";
import { authHeader, baseUrl } from '../services/env';
import { AUTH_HEADER, holding_URL } from '../../services/env'


export default {
    async getPositionsFromApi(userId: any) {
        return axios.post(`${holding_URL}portfolio/getPosition`, userId, AUTH_HEADER());
    },
}