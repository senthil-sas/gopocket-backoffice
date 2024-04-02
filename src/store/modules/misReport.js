import service from "../httpService";
import commonjs from "../../mixins/common"
const state = {
    misreportData: [],
}

const actions = {

async getfilterData({commit},payload){
    const data= payload.sort((a, b) => {
        const dateA = new Date(a.date.split("-").reverse().join("-"));
        const dateB = new Date(b.date.split("-").reverse().join("-"));
        return dateB - dateA;
    });

},

    
   async getmisReportFromApi({commit},payload) {
        try {
           await service.getmisreport(payload).then(res => {
            
             const sortData= res.data.result.sort((a, b) => {
                    const dateA = new Date(a.date.split("-").reverse().join("-"));
                    const dateB = new Date(b.date.split("-").reverse().join("-"));
                    return dateB - dateA;
                });
               
                commit('setmisReportData',sortData)

            })
        } catch (error) {
            
        }
    }

};

const mutations = {
    
    setmisReportData(state, payload) {    
        state.misreportData = payload;  
    }

};

const getters = {
    getmisReportData: state => state.misreportData,
    getTotalInvestment: state => state.totalInvestment,
    getTotalcurrentValue: state => state.totalcurrentValue,
    getTotalPnlChange: state => state.totalPnlChange,
    getDaysPnlChange: state => state.daysPnlChange,
    getTotalPnl: state => state.totalPnl,
    getDaysPnl:state => state.daysPnl
};

const misreport = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default misreport

