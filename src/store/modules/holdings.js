import service from "../modules/services/profile.ts";
import errorHandle from '../../handleError/errorHandling'
const state = {
    holdingsData: [],
    totalInvestment: 0,
    totalcurrentValue: 0,
    totalPnlChange: 0,
    daysPnlChange: 0,
    totalPnl: 0,
    daysPnl: 0,
    totalHodingValue:0
}

const actions = {
    getHoldingsFromApi({ commit, rootGetters }, userId) {
        commit('setHoldingsData', []);
        commit('setLoader', true, { root: true });

        let json = {
            "userId":rootGetters['auth/getUserId']
        }
        service.getHoldingsFromApi(json)
            .then(resp => {
                if (resp.data.result.length > 0 && resp.data.status == 'Ok' && resp.data.result && resp.data) {
                    let holdingTotal = 0
                    resp.data.result?.forEach(element => {
                        element.buyAvg = Number(element.qty) * Number(element.buyPrice)
                        holdingTotal += element.buyAvg
                    });
                    commit('setTotalHodingValue', holdingTotal.toFixed(2))
                    commit('setHoldingsData', resp.data.result);
                } else {
                }
            },
                (err) => {
                    errorHandle.handleError(err)
                })
            .finally(() => {
                commit('setLoader', false, { root: true });
            });
    }

};

const mutations = {
    setHoldingsData(state, payload) {
        state.holdingsData = payload
    },
    setTotalHodingValue(state, payload){
        state.totalHodingValue = payload
    }
};

const getters = {
    getHoldingsData: state => state.holdingsData,
    getTotalInvestment: state => state.totalInvestment,
    getTotalcurrentValue: state => state.totalcurrentValue,
    getTotalPnlChange: state => state.totalPnlChange,
    getDaysPnlChange: state => state.daysPnlChange,
    getTotalPnl: state => state.totalPnl,
    getDaysPnl: state => state.daysPnl,
    getTotalHoldingValue: state => state.totalHodingValue
};

const holdings = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default holdings

