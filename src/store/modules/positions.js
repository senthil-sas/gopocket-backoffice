import service from "../modules/services/Dasboard";
const state = {
    positionData: []
}

const actions = {
    getPositionsFromApi({ commit }) {
        commit('setPositionData', [])

        try {
            service.getPositionsFromApi().then(resp => {
                console.log(resp.data.message.data.positions)
                if (resp.data.message.data.positions) {
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

