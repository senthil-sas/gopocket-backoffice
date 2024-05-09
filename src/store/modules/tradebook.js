import { apigettradebook } from "../services/tradebookApi";

const apiservice = apigettradebook()
const state = {
    tradeBookData: [],
    dataPoints: {},
    activeReportTab: 0,
    loader: false,

}

const actions = {
    async getTradeBookFromApi({ commit }, payload) {
        commit('setLoader', true, { root: true });
        try {
            let response = await apiservice.getTradebookData(payload);
            if (response?.data?.message?.tradebook_summary) {
                commit('setTradeBookData', response.data.message.tradebook_summary);
                commit('setDataPoints', response.data.message.tradebook_summary);
            } else {
                commit('setTradeBookData', []);
            }
        } catch (error) {
            // Handle error if needed
        }
        commit('setLoader', false, { root: true });
    }

};

const mutations = {
    setTradeBookData(state, payload) {
        state.tradeBookData = payload
    },
    setActiveReportTab(state, payload) {
        state.activeReportTab = payload
    },
    setDataPoints(state, payload) {
        console.log("payload", payload)
        let dataPoints = {}
        let dates = []

        payload?.forEach(el => {
            dates.push(new Date(el.trade_date))
            dataPoints[getTimeStamp(el.trade_date)] = (el.qty)
        });

        // state.startDate = new Date(Math.min.apply(null, dates));
        // state.endDate = new Date(Math.max.apply(null, dates));
        state.dataPoints = dataPoints
        console.log("v3", dataPoints);
    },
};

const getters = {
    getTradeBookData: state => state.tradeBookData,
    getActiveReportTab: (state) => state.activeReportTab

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

