import service from "../httpService";
const state = {
    tradeBookData : [],
    dataPoints: {}
}

const actions = {
    async getTradeBookFromApi({ commit }) {
        try {
            service.getTradeBook().then(resp => {   
                debugger
                console.log(resp);
                if(resp?.data?.data) {
                    commit('setTradeBookData', resp?.data?.data)
                    commit('setDataPoints', resp?.data?.data)
                } else {
                    commit('setTradeBookData', [])
                    commit('setDataPoints', {})
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
        state.dataPoints = {}
        payload.forEach(el => {
            console.log(getTimeStamp(el.trade_date));
        });
        state.dataPoints = payload
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

