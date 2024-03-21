import axios from "axios";
import { authHeader, baseUrlTemp } from '../services/env';


export default {
    async getPositionsFromApi() {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${baseUrlTemp}method/cs_bo.custom_api.positions.get_positions?ucc_code=SKY40962`, requestOptions);
    },

}