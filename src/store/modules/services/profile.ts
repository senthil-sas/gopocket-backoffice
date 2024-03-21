import axios from "axios";
import { authHeader, baseUrlTemp } from '../services/env';

export default {
    async getProfileDataFromApi() {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${baseUrlTemp}resource/Customer/SKY41810`, requestOptions);
    },

    async getHoldingsFromApi() {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${baseUrlTemp}method/cs_bo.custom_api.holding.get_holdings?ucc=AB0009`, requestOptions);

    }
}
