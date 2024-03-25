import service from "../httpService";
import { apiledgerservice } from "../services/ledgerApi";

const apiservice = apiledgerservice();

const state = {
    ledgerData: [],
    dataPoints: {}
}

const actions = {
    async getledgerApi({ commit }, payload) { 
        // console.log(payload,"vvv");
        try {
            apiservice.getLedgerData(payload).then(resp => {
             
                console.log(resp.data.message.customer_ledger, "resp");

                if (resp?.data?.message?.customer_ledger) {

                    commit('setledgerData', resp.data.message.customer_ledger);

                } else {
                 
                    commit('setTradeBookData', [])
                   
                }
            })
        } catch (error) {

        }
    }
};

const mutations = {

    setledgerData(state, payload) {

        state.ledgerData = payload; 
        // console.log("vvv",state.ledgerData);
    },  

    setDataPoints(state, payload) {

        console.log("payload",payload)
        let dataPoints = {}
        let dates = []

        payload?.forEach(el => {
            dates.push(new Date(el.trade_date))
            dataPoints[getTimeStamp(el.trade_date)] = (el.qty)
        });

        // state.startDate = new Date(Math.min.apply(null, dates));
        // state.endDate = new Date(Math.max.apply(null, dates));
        state.dataPoints = dataPoints
        console.log("v3",dataPoints);
    },
};

const getters = {
    getLedgerData: state => state.ledgerData,
};

const ledger = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default ledger

function getTimeStamp(date) {
    const myDate = new Date(date);
    const unixTimestamp = myDate.getTime();
    return unixTimestamp;
}

