import service from "../services/boReports.js"
import errorHandle from "../../handleError/errorHandling.ts"

const getDefaultState = () => {
    return {
        profileData: [],
        DPData: '',
        userId: '',
        tradeLogData: [],
        tradeBookData: [],
        dataPoints: {},
        loader: true,
        startDate: '',
        endDate: '',
        pnlData: [],
        ledgerData: [],
        debitAmount: 0.00,
        creditAmount: 0.00,
        positionData: [],
        holdingsData: [],
        totalInvestment: 0,
        totalcurrentValue: 0,
        totalPnlChange: 0,
        daysPnlChange: 0,
        totalPnl: 0,
        daysPnl: 0,
    }
}
const state = getDefaultState();

const actions = {
    async getTradebookFromApi({ commit }, payload) {
        commit('setLoader', true, { root: true })
        service.getTradebook(payload).then(resp => {
            if (resp?.data?.result && resp?.data?.result?.length) {
                commit('setTradeBookData', resp?.data?.result)
                commit('setDataPoints', resp?.data?.result)
            } else {
                commit('setTradeBookData', [])
                commit('setDataPoints', [])
            }
        }).catch((error) => {
            errorHandle.handleError(error)
        }).finally(() => {
            commit('setLoader', false, { root: true })
        })
    },
    async getProfileDataFromApi({ commit }, userId) {
        commit('setLoader', true, { root: true })
        service.getProfileDetails(userId).then(resp => {
            if (resp?.data?.data) {
                commit('setProfileData', resp?.data?.data)
            } else {
                commit('setProfileData', [])
            }
        }, (error) => {
            errorHandle.handleError(error)
        }).finally(() => {
            commit('setLoader', false, { root: true })
        })
    },
    getPositionsFromApi({ commit }, payload) {
        commit('setLoader', true, { root: true })
        service.getPositions(payload).then(resp => {
            if (resp?.data?.result) {
                commit('setPositionData', resp?.data?.result)
            } else {
                commit('setPositionData', [])
            }
        }).catch((error) => {
            errorHandle.handleError(error)
        }).finally(() => {
            commit('setLoader', false, { root: true })
        })
    },
    async getDPData({ commit }, payload) {
        commit('setLoader', true, { root: true })
        service.getDPData(payload).then(resp => {

            if (resp?.data?.result[0].message?.data.length) {
                commit('setDPData', resp?.data?.result[0].message?.data[0])
            } else {
                commit('setDPData', [])
            }
        }, (error) => {
            errorHandle.handleError(error)
        }).finally(() => {
            commit('setLoader', false, { root: true })
        })
    },
    async getLedgerdata({ commit, state }, payload) {
        commit('setLoader', true, { root: true })
        service.getLedgerData(payload).then((resp) => {
            if (resp && resp.data.result && resp.data.result?.length) {
                commit('setLedgerData', resp.data.result);
                state.debitAmount = resp.data.result.reduce((total, data) => {
                    return total + data.damount;
                }, 0.00)
                state.creditAmount = resp.data.result.reduce((total, data) => {
                    return total + data.camount;
                }, 0.00)
            } else {
                commit('setLedgerData', []);
            }
        }
        ).catch((error) => {
            errorHandle.handleError(error)
        }).finally(() => {
            commit('setLoader', false, { root: true })
        })
    },

};

const mutations = {
    setDataPoints(state, payload) {
        let dataPoints = {}
        let dates = []
        const mergedRecords = {};
        payload.forEach((record) => {
            const date = record.tradeDate;
            const number = record.qty;

            if (!mergedRecords[date]) {
                mergedRecords[date] = { date: date, qty: 0 };
            }

            mergedRecords[date].qty += number;
        });
        const result = Object.values(mergedRecords);
        result?.forEach((el) => {
            dates.push(new Date(el.date))
            dataPoints[getTimeStamp(el.date)] = (el.qty)
        });

        state.startDate = new Date(Math.min.apply(null, dates));
        state.endDate = new Date(Math.max.apply(null, dates));
        state.dataPoints = dataPoints
    },
    setTradeBookData(state, payload) {
        state.tradeBookData = payload
        if(state.tradeBookData?.length)
        state.tradeBookData.sort(function (a, b) {
            return new Date(a.trade_date) - new Date(b.trade_date);
        });
    },
    setLedgerData(state, payload) {
        state.ledgerData = payload
        if (state.ledgerData?.length != 0) {
            state.ledgerData.sort(function (a, b) {
                return new Date(a.dtoftran) - new Date(b.dtoftran);
            });
        }
    },
    resetState(state) {
        Object.assign(state, getDefaultState())
    },
};

const getters = {
    getTradeBookData: state => state.tradeBookData,
    getLedgersData: state => state.ledgerData,
    getDataPoints: state => state.dataPoints,
};

const boReports = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default boReports

function getTimeStamp(date) {
    const myDate = new Date(date);
    const unixTimestamp = myDate.getTime();
    return unixTimestamp / 1000;
}