import service from "../modules/services/profile.ts";
const state = {
    nomineeStage: 'nomineeSummary',
    nomineeList: [],
    isMinor: false
}

const actions = {
    async getNomineeDetails({ commit }) {
        try {
            service.getNomineeDetails().then(resp => {
                if (resp.data?.message?.data?.fsl_nominee_details) {
                    commit('setNomineeList', resp.data.message.data?.fsl_nominee_details)
                    if (resp.data.message.data?.fsl_nominee_details.length) {
                        commit('setNomineeStage', 'nomineeSummary')
                    } else {
                        commit('setNomineeStage', 'initialList')
                    }
                } else {
                    commit('setNomineeList', [])
                }
            })
        } catch (error) {

        }
    },
    async addNomineeDetails({ commit }, payload) {
        try {
            service.addNomineeDetails(payload).then(resp => {
                if (resp.status == 200) {
                    commit('setNomineeStage', 'nomineeSummary')
                } else {
                    //  commit('setNomineeList', [])
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
        // state.nomineeList.push(payload)
        // if(state.nomineeList.length == 1) {
        //    state.nomineeList[0].nomineeShare = 100
        // }
        // if(state.nomineeList.length == 2) {
        //    state.nomineeList[0].nomineeShare = 50
        //    state.nomineeList[1].nomineeShare = 50
        // }
        // if(state.nomineeList.length == 3) {
        //    state.nomineeList[0].nomineeShare = 50
        //    state.nomineeList[1].nomineeShare = 25
        //    state.nomineeList[2].nomineeShare = 25
        // }
        // this.commit('nominee/setNomineeDetails', state.nomineeList)
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
    }
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

