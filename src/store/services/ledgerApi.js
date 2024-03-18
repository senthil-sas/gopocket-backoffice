import axios from "axios";

export const apiledgerservice = () => {


    const getLedgerData=async (payload) => {
  
        const fromDate=new Date(payload.from_date).toLocaleDateString();;
        const toDate=new Date(payload.to_date).toLocaleDateString();
        
        const[fmonth,fday,fyear]=fromDate.split("/");
        const[tmonth,tday,tyear]=toDate.split("/"); 
        const tokenStr = '6169733001924b3:c333657eafe5d3e' 
        const webApiUrl = `https://erp-uat.gopocket.in/api/method/cs_bo.custom_api.customer_ledger.get_customer_ledger_records?ucc=${payload.ucc}&from_date=${fday}-${fmonth}-${fyear}&to_date=${tday}-${tmonth}-${tyear}`

       const response=await axios.get(webApiUrl, { headers: { "Authorization": `token ${tokenStr}` } })

       return response;
        
    }

    return { getLedgerData }

}