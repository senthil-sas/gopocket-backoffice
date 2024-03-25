import service from "../modules/services/profile.ts";
const state = {
    holdingsData: [],
    totalInvestment: 0,
    totalcurrentValue: 0,
    totalPnlChange: 0,
    daysPnlChange: 0,
    totalPnl: 0,
    daysPnl: 0,
}

const actions = {
    getHoldingsFromApi({ commit }, userId) {
        commit('setHoldingsData', [])

        try {
            service.getHoldingsFromApi(userId).then(resp => {

                if (resp.data.message.data.length > 0 && resp.data.message.data) {
                    commit('setHoldingsData', resp.data.message.data)
                } else {
                }
            })
        } catch (error) {

        }
    }
};

const mutations = {
    setHoldingsData(state, payload) {
        // let totalPreviousDayClose = 0
        // state.totalInvestment = 0
        // payload?.forEach((data) => {
        //     let sellableQty = parseFloat(data["sellableQty"])
        //     let pdc = data.symbol[0]['pdc']
        //     let ltp = data.symbol[0]['ltp']
        //     data["netPnl"] = commonjs.methods.netPnlCalc(data);

        //     // calculate buy value
        //     data["buyValue"] = parseFloat(Number(data["buyPrice"]) * Number(data['netQty'])).toFixed(2)

        //     // total investment Calculation
        //     state.totalInvestment += Number(data["buyValue"])

        //     // total currentValue Calculation
        //     state.totalcurrentValue += parseFloat(ltp) * sellableQty;

        //     // total p&l calculation
        //     state.totalPnl = state.totalPnl + parseFloat(data["netPnl"])

        //     // total p&l change calculation
        //     state.totalPnlChange = state.totalInvestment == 0 ? 0 : ((state.totalcurrentValue - state.totalInvestment) / state.totalInvestment) * 100
        //     state.totalPnlChange = state.totalPnlChange == 'Infinity' ? 'NA' : state.totalPnlChange

        //     // find sum of Day's P&L
        //     if (pdc) {
        //         state.daysPnl += (parseFloat(ltp) - parseFloat(pdc)) * sellableQty;
        //         totalPreviousDayClose = totalPreviousDayClose + (parseFloat(pdc) * sellableQty);
        //         state.totalPdc += parseFloat(pdc) * Number(data['netQty'])
        //         // find Day's P&L Change
        //         state.daysPnlChange = totalPreviousDayClose == 0 ? 0 : ((state.totalcurrentValue - totalPreviousDayClose) / totalPreviousDayClose) * 100
        //     }
        // });

        state.holdingsData = payload
    }
};

const getters = {
    getHoldingsData: state => state.holdingsData,
    getTotalInvestment: state => state.totalInvestment,
    getTotalcurrentValue: state => state.totalcurrentValue,
    getTotalPnlChange: state => state.totalPnlChange,
    getDaysPnlChange: state => state.daysPnlChange,
    getTotalPnl: state => state.totalPnl,
    getDaysPnl: state => state.daysPnl
};

const holdings = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default holdings

