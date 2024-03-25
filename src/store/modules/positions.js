import service from "../modules/services/Dasboard";
const state = {
    positionData: []
}

const actions = {
    getPositionsFromApi({ commit }, payload) {
        commit('setPositionData', [])
        try {
            service.getPositionsFromApi(payload).then(resp => {
                if (resp.data.message.data.positions != 'Positions Not Exists') {
                    commit('setPositionData', resp.data.message.data.positions)
                } else {
                }
            })
        } catch (error) {

        }
    }
};

const mutations = {
    setPositionData(state, payload) {
        state.positionData = payload
    }
};

const getters = {
    getPositionData: state => state.positionData,
};

const positions = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default positions

