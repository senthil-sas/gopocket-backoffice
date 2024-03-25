import axios from "axios";
import { authHeader, baseUrlTemp } from '../services/env';


export default {
    async getPositionsFromApi(payload:any) {
        const requestOptions = {
            headers: authHeader(),
        }
        return axios.get(`${baseUrlTemp}method/cs_bo.custom_api.positions.get_positions?${new URLSearchParams(payload)}`, requestOptions);
    },

}