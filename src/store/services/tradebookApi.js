import axios from "axios";

export const apigettradebook = () => {


    const getTradebookData = (payload) => {

        const[fmonth,fday,fyear]=payload.fromDate.split("/");
        const[tmonth,tday,tyear]=payload.toDate.split("/");
        // {ucc: 'j171', segment: 'NSE', fromDate: '04/01/2023', toDate: '03/15/2024'}

        const tokenStr = '6169733001924b3:c333657eafe5d3e'
        const webApiUrl = `https://erp-uat.gopocket.in/api/method/cs_bo.custom_api.pp_tradebook_details.get_tradebook_details?from_date=${fday}-${fmonth}-${fyear}&to_date=${tday}-${tmonth}-${tyear}&ucc=${'j171'}&exchange=${payload.segment}`

       const response= axios.get(webApiUrl, { headers: { "Authorization": `token ${tokenStr}` } })

       return response;
        
    }

    return { getTradebookData }

}