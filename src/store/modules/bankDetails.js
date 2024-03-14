import service from '../httpService'
const state = {
    bankDetails : [],
    isAddBank: false
}

const actions = {
    async getBankDataFromApi({ commit }) {
        try {
            service.getBankDetails().then(resp => {
                if(resp.data?.message?.data?.fsl_bank_details) {
                    commit('setBankDetails',resp.data.message.data?.fsl_bank_details)
                } else {
                    commit('setBankDetails', [])
                }
            })
        } catch (error) {
            
        }
    }
};

const mutations = {
    setIsAddBank(state, payload) {
        state.isAddBank = payload
    },
    setBankDetails(state, payload) {
        state.bankDetails = payload
    }
};

const getters = {
    getBankDetails: state => state.bankDetails,
    getIsAddBank: state => state.isAddBank
};

const bankDetails = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default bankDetails

