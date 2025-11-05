import service from "../httpService.js";
import errorHandle from '../../handleError/errorHandling'
import getService from "../services/boReports.js";

const state = {
    nomineeStage: 'initialList',
    nomineeList: [],
    isMinor: false,
}

const actions = {
    async getNomineeDetails({ commit }) {
        commit('setNomineeList', []);
        commit('setLoader', true, { root: true });
        getService.getNomineeDetails().then(resp => {
            if (resp.status == 200 && resp.data?.message == 'Success' && resp.data?.status == 'Ok') {
                commit('setNomineeList', resp.data.result);
                if (resp.data.result.length) {
                    commit('setNomineeStage', 'nomineeSummary');
                } else {
                    commit('setNomineeStage', 'initialList');
                }
            }
        },(err) => {
            errorHandle.handleError(err)
        }).finally(() => {
            commit('setLoader', false, { root: true });
        });
    },

    async addNomineeDetails({ commit }, payload) {
        try {
            service.addNomineeDetails(payload).then(resp => {
                if (resp.status == 200) {
                    commit('setNomineeStage', 'nomineeSummary')
                } else {
                }
            })
        } catch (error) {

        }
    }
};

const mutations = {
    setNomineeStage(state, payload) {
        state.nomineeStage = payload
    },

    setNomineeList(state, payload) {
        state.nomineeList = payload
    },

    setNomineeDetails(state, payload) {
        state.nomineeList = payload
        sessionStorage.setItem('nomineeList', JSON.stringify(state.nomineeList))
        if (state.nomineeList.length > 0) {
            this.commit('nominee/setNomineeStage', 'nomineeSummary')
        }
    },

    deleteNominee(state, id) {
        state.nomineeList.splice(id, 1);
        if (state.nomineeList?.length == 0) {
            this.commit('nominee/setNomineeStage', 'initialList')
        }
        this.commit('nominee/setNomineeDetails', state.nomineeList)
    },

    setIsMinor(state, payload) {
        state.isMinor = payload
    },
};

const getters = {
    getNomineeStage: state => state.nomineeStage,
    getNomineeList: state => state.nomineeList,
    getIsMinor: state => state.isMinor

};

const nominee = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default nominee

