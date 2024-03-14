import service from "../httpService";
const state = {
    tradeBookData: [],
    dataPoints: {},
    loader: true,
    startDate: '',
    endDate: '',
}

const actions = {
    async getTradeBookFromApi({state,commit }) {
        state.loader = true
        try {
            service.getTradeBook().then(resp => {
                if (resp?.data?.data) {
                    commit('setTradeBookData', resp?.data?.data)
                    commit('setDataPoints', resp?.data?.data)
                } else {
                    commit('setTradeBookData', [])
                    commit('setDataPoints', {})
                }
            }).finally(()=>{
                state.loader = false
            })
        } catch (error) {
            state.loader = false
        }
    }
};

const mutations = {
    setTradeBookData(state, payload) {
        state.tradeBookData = payload
    },
    setDataPoints(state, payload) {
        let dataPoints = {}
        let dates = []
        
        payload.forEach(el => {
            dates.push(new Date(el.trade_date))
            dataPoints[getTimeStamp(el.trade_date)] = el.qty
        });

        state.startDate = new Date(Math.min.apply(null, dates));
        state.endDate = new Date(Math.max.apply(null, dates));

        state.dataPoints = dataPoints
    },
};

const getters = {
    getTradeBookData: state => state.tradeBookData,
    getDataPoints: state => state.dataPoints,
    getLoader: state => state.loader,
    getStartDate: state => state.startDate,
    getEndDate: state => state.endDate,
};

const reports = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default reports

function getTimeStamp(date) {
    const myDate = new Date(date);
    const unixTimestamp = myDate.getTime();
    return unixTimestamp / 1000;
}

