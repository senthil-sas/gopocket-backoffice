import service from "../services/boReports.js"
import errorHandle from "../../handleError/errorHandling.ts"

const getDefaultState = () => {
    return {
        profileData: {},
        DPData: '',
        tradeBookData: [],
        dataPoints: {},
        loader: true,
        startDate: '',
        endDate: '',
        ledgerData: [],
        debitAmount: 0.00,
        creditAmount: 0.00,

        bankDetails: []
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

    async getDematData({ commit }, payload) {
        commit('setLoader', true, { root: true })
        service.getDematData(payload).then(resp => {
            if (resp?.data?.result[0].dematId) {
                commit('setDPData', resp?.data?.result[0].dematId)
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

    async getProfileDataFromApi({ commit, dispatch, rootGetters }) {
        commit('setLoader', true, { root: true })
        service.getProfileDetails().then(resp => {
            if (resp.status == 200 &&  resp?.data?.message == 'Success' &&  resp?.data?.status == 'Ok') {
                commit('setProfileData', resp?.data?.result[0])
                let json = {
                    "userId": rootGetters["auth/getUserId"]
                }
                dispatch("getDematData", json)
            } else {
                commit('setProfileData', {})
            }
        }, (error) => {
            errorHandle.handleError(error)
        }).finally(() => {
            commit('setLoader', false, { root: true })
        })
    },

    async getBankDetails({ commit }) {
        commit('setLoader', true, { root: true })
        service.getBankDetails().then(resp => {
            if (resp.status == 200 &&  resp?.data?.message == 'Success' &&  resp?.data?.status == 'Ok') {
                commit('setBankDetails', resp?.data?.result)
            } else {
                commit('setBankDetails', {})
            }
        }, (error) => {
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
    setProfileData(state, payload) {
        state.profileData = payload
    },
    setBankDetails(state, payload) {
        state.bankDetails = payload
    },
    setDPData(state, payload) {
        state.DPData = payload
    },
};

const getters = {
    getTradeBookData: state => state.tradeBookData,
    getLedgersData: state => state.ledgerData,
    getDataPoints: state => state.dataPoints,
    getProfileData: state => state.profileData,
    getBankDetails: state => state.bankDetails,
    getDPData: state => state.DPData
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