import service from "../httpService";
import { apigettradebook } from "../services/tradebookApi";

const apiservice = apigettradebook()
const state = {
    tradeBookData: [],
    dataPoints: {}
}

const actions = {
    async getTradeBookFromApi({ commit }, payload) {
        // console.log(payload,"vvv");
        try {

            apiservice.getTradebookData(payload).then(resp => {

                console.log(resp.data.message.tradebook_summary, "resp");

                if (resp?.data?.message?.tradebook_summary) {

                    commit('setTradeBookData', resp?.data?.message?.tradebook_summary)
                    commit('setDataPoints', resp?.data?.message?.tradebook_summary) 
                  
                } else {
                    commit('setTradeBookData', [])
                   
                }
            })
        } catch (error) {

        }
    }
};

const mutations = {
    setTradeBookData(state, payload) {
        state.tradeBookData = payload
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
    getTradeBookData: state => state.tradeBookData,
};

const tradebook = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default tradebook


function getTimeStamp(date) {
    const myDate = new Date(date);
    const unixTimestamp = myDate.getTime();
    return unixTimestamp;
}

