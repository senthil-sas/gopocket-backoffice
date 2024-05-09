import axios from "axios";
import { mapGetters } from 'vuex'

const headers = {
    "Content-Type": "application/json",
};
const baseUrl = 'https://web.gopocket.in/';
const baseUrlTemp = 'https://orbit.gopocket.in/api/'
const userId = "SKY34914"
export default {
    data: () => ({
        //
    }),
    computed: {
        ...mapGetters('auth', ['getUserId'])
    },

    authHeader() {
        let headers = {
            Authorization: "token 317cda071c50cc8:f5905fd50a7b4e3",
        };
        return headers;
    },

    authHeaderWeb() {
        let token = localStorage.getItem('sessionId') ? localStorage.getItem('sessionId') : ''
        let headers = {
            'Authorization': `Bearer ${token}`,
        };
        return headers;
    },

    async ssoLogin(payload) {
        return await axios.post(`${baseUrl}am/sso/vendor/auth/getUserDetails`, payload)
    },

    // async getProfileDetails() {
    //     const requestOptions = {
    //         headers: this.authHeader(),
    //     };
    //     return axios.get(`${baseUrlTemp}method/ninjafox.custom_api.get_customer_profile?customer=${userId}`, requestOptions).then();
    // },

    async getBankDetails() {
        const requestOptions = {
            headers: this.authHeader(),
        };
        return axios.get(`${baseUrlTemp}method/ninjafox.custom_api.get_customer_Bank_details?customer=${userId}`, requestOptions).then();
    },

    // async getNomineeDetails() {
    //     const requestOptions = {
    //         headers: this.authHeader(),
    //     };
    //     return axios.get(`${baseUrlTemp}method/ninjafox.custom_api.get_customer_nominee_details?customer=${userId}`, requestOptions).then();
    // },

    // async addNomineeDetails(payload) {
    //     const requestOptions = {
    //         headers: this.authHeader(),
    //     };
    //     return axios.put(`${baseUrlTemp}resource/Customer/${userId}`, payload, requestOptions).then();
    // },
    async getSegments() {
        let fields = `["fsl_nse","fsl_bse","fsl_nfo","fsl_bfo","fsl_cds","fsl_bcd","fsl_mcx"]`
        let filters = `[["fsl_ucc_code","=","SKY34914"]]`
        const requestOptions = {
            headers: this.authHeader(),
        };
        return axios.get(`${baseUrlTemp}resource/Customer?fields=${fields}&filters=${filters}`, requestOptions).then();
    },

    async getFamilyAccount() {
        const requestOptions = {
            headers: this.authHeader(),
        };
        return axios.get(`${baseUrlTemp}method/ninjafox.custom_api.get_customer_family_details?customer=${userId}`, requestOptions).then();
    },

    async getTradeBook() {
        let fields = `["ucc","trade_date","trade_segment","qty"]`
        let filters = `[["ucc","=","SKY34914"],["trade_segment","=","NFO"]]`
        const requestOptions = {
            headers: this.authHeader(),
        };
        return axios.get(`${baseUrlTemp}resource/Trade Log?fields=${fields}&filters=${filters}&timespan=current_year`, requestOptions).then();
    },

    async getPositions() {
        // const requestOptions = {
        //     headers: this.authHeader(),
        // };
        // return axios.post(`${baseUrlTemp}method/ninjafox.custom_api.get_position?customer=${userId}`,'', requestOptions).then();
        const requestOptions = {
            headers: this.authHeaderWeb(),
        };
        return axios.get(`${baseUrl}po-rest/positions`, requestOptions).then();
    },

    async getHoldings() {
        // const requestOptions = {
        //     headers: this.authHeader(),
        // };
        // return axios.post(`${baseUrlTemp}method/ninjafox.custom_api.get_holdings?customer=${userId}`,'', requestOptions).then();
        const requestOptions = {
            headers: this.authHeaderWeb(),
        };
        return axios.get(`${baseUrl}ho-rest/holdings`, requestOptions).then();
    },

    async createWithdraw(payload) {
        const requestOptions = {
            headers: this.authHeader(),
        };
        return axios.post(`${baseUrlTemp}resource/Withdraw`, payload, requestOptions).then();
    },

    async getWithdraw() {
        let fields = `["date","ucc","withdraw_amount","time"]`
        let filters = `[["ucc","=","SKY34914"]]`
        const requestOptions = {
            headers: this.authHeader(),
        };
        return axios.get(`${baseUrlTemp}resource/Withdraw?fields=${fields}&filters=${filters}`, requestOptions).then();
    },

    // async getProfileDataFromApi() {
    //     const requestOptions = {
    //         headers: this.authHeader(),
    //     };
    //     return axios.get(`${baseUrl}api/resource/Customer/SKY40491`, requestOptions)
    //         .then();
    // }


}
