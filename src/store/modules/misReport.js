import service from "../httpService";
import commonjs from "../../mixins/common"
const state = {
    misreportData: [],
   
}

const actions = {
    
   async getmisReportFromApi({commit},payload) {
        try {
           await service.getmisreport(payload).then(res => {
                // console.log(res.data.result,"ww");
                commit('setmisReportData',res.data.result)
                
            })
        } catch (error) {
            
        }
    }

};

const mutations = {
    
    setmisReportData(state, payload) {
        state.misreportData = payload ;  
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

