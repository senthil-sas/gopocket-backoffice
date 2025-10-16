import axios from "axios";
import { authHeaderWeb } from './headers'

export const apigettradebook = () => {


    const getTradebookData = (payload) => {
        const webApiUrl = `https://ekyc.gopocket.in/cosmos-rest/cosmos/getTradeBook`
        const response = axios.post(webApiUrl, payload, { headers: authHeaderWeb() })
        return response;
    }
    return { getTradebookData }
}