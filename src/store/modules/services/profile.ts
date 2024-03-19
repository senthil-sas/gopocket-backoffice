import axios from "axios";
import { authHeader, baseUrlTemp } from '../services/env';


export default {
    async getProfileDataFromApi() {
        const requestOptions = {
            headers: authHeader(),
        };
        return axios.get(`${baseUrlTemp}resource/Customer/SKY41810`, requestOptions);

    }
}
