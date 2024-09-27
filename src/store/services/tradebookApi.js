import axios from "axios";
import { authHeaderWeb } from './headers'

export const apigettradebook = () => {


    const getTradebookData = (payload) => {
        // const [fmonth, fday, fyear] = payload.fromDate.split("/");
        // const [tmonth, tday, tyear] = payload.toDate.split("/");
        // {ucc: 'j171', segment: 'NSE', fromDate: '04/01/2023', toDate: '03/15/2024'}
        const webApiUrl = `https://ekyc.gopocket.in/cosmos-rest/cosmos/getTradeBook`
        const response = axios.post(webApiUrl, payload, { headers: authHeaderWeb() })
        return response;
    }
    return { getTradebookData }
}