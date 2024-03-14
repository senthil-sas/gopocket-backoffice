import service from "../httpService"
const state = {
    isAddSubAcc: false,
    familyDetails: []
}

const actions = {
    getFamilyAccountFromApi({commit}) {
        try {
            service.getFamilyAccount().then(resp => {
                if(resp.data?.message?.data?.fsl_family_details) {
                    commit('setFamilyDetails', resp.data?.message?.data?.fsl_family_details)
                } else {
                    commit('setFamilyDetails', [])
                }
            })
        } catch (error) {
            
        }
    }
};

const mutations = {
    setIsAddSubAcc(state, payload) {
        state.isAddSubAcc = payload
    },
    setFamilyDetails(state, payload) {
        state.familyDetails = payload
    }
};

const getters = {
    getIsAddSubAcc: state => state.isAddSubAcc,
    getFamilyDetails: state => state.familyDetails
};

const subAcc = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default subAcc

