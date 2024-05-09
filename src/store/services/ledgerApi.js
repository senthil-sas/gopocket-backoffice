import axios from "axios";

export const apiledgerservice = () => {


    const getLedgerData = async (payload) => {


        const [fmonth, fday, fyear] = payload.fromDate.split("/");
        const [tmonth, tday, tyear] = payload.toDate.split("/");
        const tokenStr = '6169733001924b3:c333657eafe5d3e'
        const webApiUrl = `https://kyc.skybroking.com/ekyc-skyadmin/boupdate/getCustomerLeg?ucc=${payload.ucc}&from_date=${fyear}-${fmonth}-${fday}&to_date=${tyear}-${tmonth}-${tday}`

        const response = await axios.get(webApiUrl, { headers: { "Authorization": `token ${tokenStr}` } })

        return response;

    }

    return { getLedgerData }

}