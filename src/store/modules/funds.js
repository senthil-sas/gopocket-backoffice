
import service from '../httpService'
const state = {
    withdrawData: []
}

const actions = {
    async createWithdrawFromApi({ commit }) {
        try {
            service.createWithdraw().then(resp => {
                
            })
        } catch (error) {
            
        }
    },

    async getWithdrawFromApi({ commit }) {
        try {
            service.getWithdraw().then(resp => {
                if(resp?.data?.data) {
                    commit('setWithdrawData', resp?.data?.data)
                } else {
                    commit('setWithdrawData', [])
                }
            })
        } catch (error) {
            
        }
    }
};

const mutations = {
    setWithdrawData(state, payload) {
        state.withdrawData = payload
    }
};

const getters = {
    getWithdrawData: state => state.withdrawData
};

const funds = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default funds

