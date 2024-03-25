// let domain = "live"
// export const baseUrl = domain == "live" ? "https://trade.cholasecurities.com/" : domain == "uat" ? "https://uattrade.cholasecurities.com/" : domain == "cuguat" ? "https://cuguattrade.cholasecurities.com/" : ''
// export const baseUrlTemp = domain == "live" || domain == "uat" ?`https://trade.cholasecurities.com/backofficerest/` : domain == "cuglive" || domain == "cuguat" ? `https://cugtrade.cholasecurities.com/backofficerest/` : ''


export const baseUrlTemp = 'https://erp-uat.gopocket.in/api/';


export function authHeader() {
    let headers = {
        Authorization: 'token 6169733001924b3:c333657eafe5d3e',
    };
    return headers;
}




