import service from "../httpService";
import { apiledgerservice } from "../services/ledgerApi";

const apiservice = apiledgerservice();

const state = {
    ledgerData: [],
    dataPoints: {},
    loader: false,

}

const actions = {
    async getledgerApi({ commit }, payload) {
        commit('setLoader', true, { root: true });

        try {
            const resp = await apiservice.getLedgerData(payload);

            if (resp?.data?.message?.customer_ledger) {
                commit('setledgerData', resp.data.message.customer_ledger);
            } else {
                commit('setTradeBookData', []);
            }

        } catch (error) {
        }
        commit('setLoader', false, { root: true });

    }

};

const mutations = {

    setledgerData(state, payload) {
        state.ledgerData = payload;
    },

    setDataPoints(state, payload) {

        let dataPoints = {}
        let dates = []

        payload?.forEach(el => {
            dates.push(new Date(el.trade_date))
            dataPoints[getTimeStamp(el.trade_date)] = (el.qty)
        });
        state.dataPoints = dataPoints
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

